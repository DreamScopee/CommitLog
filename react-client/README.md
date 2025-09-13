# DevsCentral React Client

React conversion of the static site using Vite + React Router.

## Scripts

- dev: start local server
- build: production build
- preview: preview the production build

## Run locally

1. Install deps
   npm install
2. Start
   npm run dev
3. Open
   http://localhost:5173

## Structure

- public/data/*.json data files (AI, Agents, Developers, Programming Languages, Startups)
- src/ui/Layout.jsx shared header, footer, floating dock
- src/views/HomePage.jsx home content
- src/views/AboutPage.jsx about content
- src/views/CategoryPage.jsx dynamic category page

## Notes

- Uses Tailwind CDN and custom CSS in public/style.css for styling parity.
- Data is fetched from /data/*.json and sorted by date, with search matching title/date.
