# Editorial Portfolio Website

This is a modern personal portfolio website with a dark premium, editorial storefront feel. It is built with:

- Next.js
- Tailwind CSS
- Framer Motion
- Sanity CMS
- Vercel-ready deployment

The visible portfolio content is editable in Sanity: hero text, about copy, services, skills, projects, experience, contact links, footer text, images, and buttons.

## What You Can Edit Without Coding

After Sanity is connected, visit `/studio` and edit these content types:

- `Portfolio Page`: the main homepage sections, navigation, CTAs, contact details, and footer.
- `Project`: project cards, images, categories, years, tags, and links.
- `Experience`: roles, companies, summaries, tags, timeframes, and optional links.

The site includes polished placeholder content and one original generated image at `public/portfolio-market.png` so the page still looks complete before Sanity is configured.

## Local Setup

1. Install Node.js 20 or newer.

2. Install the project dependencies.

```bash
npm install
```

3. Create your local environment file.

```bash
cp .env.local.example .env.local
```

4. Create a free Sanity project at [sanity.io](https://www.sanity.io/).

5. Put your Sanity values into `.env.local`.

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2026-05-06
```

6. In Sanity, add these CORS origins:

- `http://localhost:3000`
- Your future Vercel domain, after it exists

7. Start the website.

```bash
npm run dev
```

8. Open the site and CMS.

- Website: [http://localhost:3000](http://localhost:3000)
- CMS: [http://localhost:3000/studio](http://localhost:3000/studio)

## Add Your Content

1. Open `/studio`.
2. Open the `Portfolio Page` document.
3. Fill in each section: Hero, About, Services, Projects, Experience, Contact, and Footer.
4. Create `Project` documents and upload project images.
5. Create `Experience` documents.
6. In the `Portfolio Page`, choose the projects and experience entries you want to feature. If you leave those lists empty, the site will show featured projects and all experience entries by sort order.
7. Publish your changes.

## Update Images

Images are uploaded in Sanity. Use original images, screenshots, or approved brand assets. Do not copy images from another portfolio or inspiration site.

For best results:

- Hero image: wide horizontal image.
- Project images: 4:3 or 16:10 screenshots/mockups.
- About image: portrait, desk, studio, product, or process image.

## Deploy on Vercel

1. Push this project to GitHub.
2. Go to [vercel.com](https://vercel.com/).
3. Import the GitHub repository.
4. Add these environment variables in Vercel:

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2026-05-06
```

5. Deploy. Vercel will use the default Next.js settings.

## Optional Instant Content Refresh

The site automatically checks for fresh Sanity content every 60 seconds. For instant refresh after publishing:

1. Add a secret in Vercel:

```bash
SANITY_REVALIDATE_SECRET=make-a-long-random-secret
```

2. In Sanity, create a webhook that sends a `POST` request to:

```text
https://your-domain.com/api/revalidate
```

3. Add this header to the webhook:

```text
x-sanity-secret: make-a-long-random-secret
```

## Useful Commands

```bash
npm run dev
npm run build
npm run start
npm run typecheck
```

## Project Structure

```text
app/                    Next.js routes, homepage, Studio route, revalidation API
components/             Animated portfolio UI
lib/content/            TypeScript content types and fallback content
lib/sanity/             Sanity client, queries, and image helpers
sanity/schemaTypes/     Editable CMS schemas
public/                 Static fallback assets
```
