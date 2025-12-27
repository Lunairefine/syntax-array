 function withValidProperties(properties: Record<string, undefined | string | string[]>) {
return Object.fromEntries(
    Object.entries(properties).filter(([_, value]) => (Array.isArray(value) ? value.length > 0 : !!value))
);
}

export async function GET() {
const URL = process.env.NEXT_PUBLIC_URL as string;
return Response.json({
  "frame": {
    "name": "Syntax Array",
    "version": "1",
    "iconUrl": "https://syntax-array.vercel.app/media/icon.png",
    "homeUrl": "https://syntax-array.vercel.app/",
    "imageUrl": "https://syntax-array.vercel.app/media/icon.png",
    "buttonTitle": "Create your magic",
    "splashImageUrl": "https://syntax-array.vercel.app/media/icon.png",
    "splashBackgroundColor": "#000000",
    "webhookUrl": "https://syntax-array.vercel.app/api/webhook",
    "subtitle": "syntax array baseapp",
    "description": "Your magic is real",
    "primaryCategory": "art-creativity",
    "heroImageUrl": "https://syntax-array.vercel.app/media/icon.png",
    "tags": ["webased", "baseapp"],
    "noindex": false,
    "tagline": "Play instantly",
    "ogTitle": "Syntax Array"
  },
  "accountAssociation": {
    "header": "eyJmaWQiOjU0ODczNSwidHlwZSI6ImF1dGgiLCJrZXkiOiIweDk1MDU2QUM2QUY2YjMzNjg2MTY2MkQ4N0YyNzRBODgyNzEzZmUxNkUifQ",
    "payload": "eyJkb21haW4iOiJzeW50YXgtYXJyYXkudmVyY2VsLmFwcCJ9",
    "signature": "WXLsUhAMP2cgzynBp8+mZTUWS388nYVm21PtOlU1i4x8Wp4FB79VDcQT7Cp9nT5xw+JgzYNZClhcm+8/QqzzuRs="
  },
  "BaseBuilder": {
    "ownerAddress": "0x66D89085a083d18a5F0FbdDc4AC2DBe57D3B8031"
  }
}
);
}