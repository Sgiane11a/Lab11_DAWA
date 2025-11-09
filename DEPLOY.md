# Deploy to Vercel

This project is a Next.js 16 app (Turbopack). The repository is ready for Vercel deployment.

Steps to deploy:

1. Push your branch to GitHub (or GitLab/Bitbucket).
2. Go to https://vercel.com and import the repository.
   - Select the organization and repository.
   - Vercel usually detects Next.js automatically. If prompted, set the framework preset to "Next.js".
3. Build & Output settings:
   - Build Command: `npm run build`
   - Install Command: `npm install`
   - Output Directory: `.next`
4. Environment variables: none required for the default setup. If you add any (API keys, DB URLs), configure them in the Vercel dashboard under Project Settings -> Environment Variables.
5. Node version: this repo requests Node 18.x via `package.json` engines; Vercel will honor this.
6. After import, click "Deploy". Vercel will run the build and provide a deployment URL.

Notes & troubleshooting:
- If the build fails, open the Vercel build logs to see the error. Common fixes:
  - Ensure dependencies installed (`npm install`).
  - If using native OS libraries, ensure they are compatible with Vercel's environment.
- To use Edge runtime features or experimental flags, configure `vercel.json` or Next.js config accordingly.

Optional: Connect a custom domain via the Vercel dashboard.
