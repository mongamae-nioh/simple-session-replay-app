import { Hono } from "hono";
import { serve } from "bun";
import { Firestore } from "@google-cloud/firestore";
import { Storage } from "@google-cloud/storage";

const firestore = new Firestore({
  projectId: process.env.GOOGLE_CLOUD_PROJECT_ID,
});

const storage = new Storage();

const app = new Hono();

// 注意：特定オリジンのみ許可するなどセキュリティ対策が必要
app.use("*", async (c, next) => {
  c.res.headers.append("Access-Control-Allow-Origin", "*");
  c.res.headers.append("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  c.res.headers.append("Access-Control-Allow-Headers", "Content-Type");
  if (c.req.method === "OPTIONS") {
    return c.text("", 204);
  }
  await next();
});

app.post("/record", async (c) => {
  try {
    const body = await c.req.json();
    const { userId, eventId, events } = body;
    const TTL_DAYS = Number.parseInt(process.env.TTL_DAYS || "30", 10);

    // Firestoreへメタデータを保存
    const metaData = firestore.collection("operations").doc(eventId);
    await metaData.set({
      userId,
      eventId,
      timestamp: new Date(),
      // FirestoreのTime-to-live (TTL)でポリシーを作成してttlフィールドを指定
      ttl: new Date(Date.now() + TTL_DAYS * 24 * 60 * 60 * 1000),
    });

    // GCSへ記録データを保存
    const bucketName = process.env.RECORDING_DATA_BUCKET;
    if (!bucketName) {
      throw new Error("RECORDING_DATA_BUCKET environment variable is not set");
    }
    const bucket = storage.bucket(bucketName);
    const file = bucket.file(
      `records/${userId}/${
        new Date().toISOString().split("T")[0]
      }/${eventId}.json`
    );
    await file.save(JSON.stringify(events));

    return c.json({ message: "Data uploaded successfully" });
  } catch (error) {
    return c.json({ error: "Error uploading recording data" }, { status: 500 });
  }
});

serve({ fetch: app.fetch, port: 3001, idleTimeout: 255 });