# Museum of Chart Crimes (MoCC)

MoCC is a "museum" of the web’s most misleading charts. Each exhibit comments on what went wrong and cites the original source.

- Live site: https://museum-chart-crimes.vercel.app/

> Want to contribute? Feel free to open a PR with your favorite chart crime.

## Adding an Exhibit

1. Place your assets under `public/assets/blog/<slug>/` (the chart image is usually `cover.jpeg`).
2. Create `_posts/<slug>.md` using the front matter template below.
3. Write the body in Markdown. Include links for sources—MoCC underlines them automatically.
4. Run `npm run build` to confirm the site still generates statically.

```yaml
---
title: "Graph Title"
excerpt: "One-line summary shown on the homepage."
coverImage: "/assets/blog/<slug>/cover.jpeg"
date: "2025-10-10"
author:
  name: Publisher of the original chart
curator:
  - name: Your Name
    url: "https://example.com/profile"
---
```

Notes:
- `coverImage` renders inside the exhibit and doubles as the social share image.
- Use the original chart title for `title` whenever possible.
- `curator` accepts one or many entries—each renders as “Curated by …”.
- Markdown supports tables, code fences, and inline HTML where needed.

## Scripts

- `npm run dev` – start the local development server.
- `npm run build` – generate the production build.
- `npm run start` – serve the production build locally.
