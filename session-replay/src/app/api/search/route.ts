import { type NextRequest, NextResponse } from 'next/server';
import { Firestore } from '@google-cloud/firestore';

const firestore = new Firestore({
  projectId: process.env.GOOGLE_CLOUD_PROJECT_ID,
});

export async function POST(req: NextRequest) {
  const { userId, startDate, endDate } = await req.json();

  try {
    const snapshot = await firestore.collection('operations')
      .where('userId', '==', userId)
      .where('timestamp', '>=', new Date(startDate))
      .where('timestamp', '<=', new Date(endDate))
      .get();

    if (snapshot.empty) {
      return NextResponse.json([]);
    }

    const results = snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        ...data,
        date: new Date(data.timestamp.toDate()).toISOString().split('T')[0]
      };
    });
    return NextResponse.json(results);
  } catch (error) {
    console.error('Error querying Firestore:', error);
    return NextResponse.json({ error: 'Error querying Firestore' }, { status: 500 });
  }
}