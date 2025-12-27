import { NextResponse } from 'next/server';

export async function GET() {
  const appUrl = "https://syntax-array.vercel.app";

  const manifest = {
    "accountAssociation": {
      "header": "eyJmaWQiOjU0ODczNSwidHlwZSI6ImF1dGgiLCJrZXkiOiIweDk1MDU2QUM2QUY2YjMzNjg2MTY2MkQ4N0YyNzRBODgyNzEzZmUxNkUifQ",
      "payload": "eyJkb21haW4iOiJzeW50YXgtYXJyYXkudmVyY2VsLmFwcCJ9",
      "signature": "WXLsUhAMP2cgzynBp8+mZTUWS388nYVm21PtOlU1i4x8Wp4FB79VDcQT7Cp9nT5xw+JgzYNZClhcm+8/QqzzuRs="
    },
    "miniapp": {
      "name": "Syntax Array",
      "version": "1",
      "iconUrl": "https://syntax-array.vercel.app/media/icon.png",
      "homeUrl": "https://syntax-array.vercel.app/",
      "splashImageUrl": "https://syntax-array.vercel.app/media/icon.png",
      "splashBackgroundColor": "#000000",
      "webhookUrl": "https://syntax-array.vercel.app/api/webhook",
      "subtitle": "syntax array baseapp",
      "description": "Your magic is real",
      "primaryCategory": "art-creativity",
      "heroImageUrl": "https://syntax-array.vercel.app/media/icon.png",
      "tags": ["art", "generative"],
      "noindex": false,
      "tagline": "Play instantly",
      "ogTitle": "Syntax Array"
    }
  };

  return NextResponse.json(manifest, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,HEAD,OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Cache-Control': 'public, max-age=60',
    },
  });
}