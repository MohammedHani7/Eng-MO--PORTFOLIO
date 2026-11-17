# Mohammed Hany: Portfolio

Plain HTML, CSS and JavaScript. No build step, no backend, no dependencies, no external fonts.

## Run locally
Open `index.html` in a browser, or serve the folder: `python3 -m http.server 8000` then visit http://localhost:8000

## Structure
- `index.html, about.html, projects.html, skills.html, certificates.html, contact.html, 404.html`
- `project-<id>.html`: one page per project (content rendered from `js/data.js`); `project.html` only redirects
- `js/data.js`: ALL content (projects, skills, training, certificates, contact links)
- `js/app.js`: header, footer, theme, cursor, transitions, preloader, rendering
- `css/style.css`: design tokens (palette for both themes) and all styles

## Update content
Edit `js/data.js` only.
- Add a project: add an object to `projects` with a unique `id`, `title`, `cat`, `sum`, then copy any `project-*.html` to `project-<id>.html` and change its `data-project`, title and description.
- Make a project page richer: add any of `problem`, `solution` (text), `objectives`, `features`, `tech` (arrays), `github`, `live` (URLs), `images` (`[{src:'img/x.png',alt:'...'}]`). Only fields you add are shown.
- Add `featured:true` to show a project on the homepage.
- Certificates, skills and training are arrays in the same file.

## Deploy
Upload the folder to any static host (GitHub Pages, Netlify, Vercel, Cloudflare Pages). Serve `404.html` as the not-found page (automatic on GitHub Pages and Netlify). If the site is hosted at the domain root and 404s appear under nested paths, add `<base href="/">` to `404.html`.

## Notes
- Typography: the reference font is not supplied, so headings use a local wide geometric stack (Century Gothic, Futura, Avenir Next, Trebuchet MS). This is a close character match, not an exact one. To use the real font, add the licensed file to `fonts/` and declare it with `@font-face` in `css/style.css`.
- Scrolling is native (no scroll hijacking); anchor and back-to-top scrolling are smoothed with CSS.
