# Portfolio Website

A modern, responsive portfolio website with a Next.js frontend and FastAPI backend.

## Architecture

- **Frontend**: Next.js 14 + TypeScript + Tailwind CSS (deployed to GitHub Pages)
- **Backend**: FastAPI + Python (deployed to Vercel)

## Repository Structure

```
portfolio-website/
├── src/                 # Next.js frontend
├── backend/            # FastAPI backend
├── docs/              # GitHub Pages build output
└── public/            # Static assets
```

## Getting Started

### Frontend Development

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Backend Development

To run the FastAPI backend locally:

```bash
cd backend
pip install -r requirements.txt
python dev.py
```

The API will be available at [http://localhost:8000](http://localhost:8000) with interactive docs at [http://localhost:8000/docs](http://localhost:8000/docs).

## Deployment

- **Frontend**: Automatically deployed to GitHub Pages via GitHub Actions
- **Backend**: Deploy to Vercel by connecting the repository and setting root directory to `backend/`

## Contact Form Integration

The contact form in the frontend sends requests to the FastAPI backend:

- **Production**: `https://api.parthivnair.com/api/contact`
- **Development**: `http://localhost:8000/api/contact`

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
