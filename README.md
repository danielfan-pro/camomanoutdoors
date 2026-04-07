# Camo Man Outdoors

Vercel-ready React + Node.js website for Camo Man Outdoors.

## Stack

- React 19 + Vite frontend
- Node.js serverless API for Vercel in `api/site.js`
- Static image assets in `public/`

## Local development

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
```

## Notes

- Frontend entry: `src/main.jsx`
- Main page layout: `App.jsx`
- Vercel config: `vercel.json`
- API endpoint used by the frontend: `/api/site`
