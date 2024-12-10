import { type NextRequest, NextResponse } from "next/server";
import { Storage } from '@google-cloud/storage'

const storage = new Storage()

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const eventId = searchParams.get('eventId')
  const userId = searchParams.get('userId')
  const date = searchParams.get('date')

  try {
    const bucketName = process.env.RECORDING_DATA_BUCKET as string
    const bucket = storage.bucket(bucketName)
    const file = bucket.file(`records/${userId}/${date}/${eventId}.json`)
    const [contents] = await file.download()

    return new NextResponse(contents, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
  } catch (error) {
    console.error('Error fetching GCS data:', error)
    return NextResponse.json(
      { error: 'Error fetching GCS data' },
      { status: 500 }
    )
  }
}