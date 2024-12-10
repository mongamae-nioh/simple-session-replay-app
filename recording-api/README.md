To install dependencies:
```sh
bun install
```

To set environment variables:
- GOOGLE_CLOUD_PROJECT_ID
  - Target Google Cloud Project
- RECORDING_DATA_BUCKET
  - Bucket name for saving recording data
- TTL_DAYS
  - TTL for Firestore documents

SDK authentication:
```sh
gcloud auth application-default login
```

To run:
```sh
bun dev
```

Listening on port 3001
