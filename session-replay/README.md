To install dependencies:
```sh
bun install
```

To set environment variables:
- GOOGLE_CLOUD_PROJECT_ID
  - Target Google Cloud Project
- RECORDING_DATA_BUCKET
  - Bucket name for saving recording data

SDK authentication:
```sh
gcloud auth application-default login
```

To run:
```sh
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
