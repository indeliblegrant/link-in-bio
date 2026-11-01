# Link in Bio

A small "link in bio" page builder with click analytics, built with React as a learning project. You edit your profile and links in an admin view, see a live phone-shaped preview, and share a public page that counts link clicks.

> **Status:** work in progress. All data is stored in the browser's `localStorage`, so there is no backend or real login yet. See [Limitations](#limitations).

## Features

- **Profile editor:** username, display name, bio and avatar image URL, with a live preview as you type.
- **Link manager:** add, edit, delete and reorder (move up/down) links.
- **URL validation:** links must start with `http://` or `https://`, which blocks `javascript:` and similar URLs. Errors show inline.
- **Public page:** each profile has a public page at `/u/:username`, shown full width on mobile and as a phone card on larger screens.
- **Click analytics:** clicks on the public page are recorded with a timestamp. The admin view shows a table of clicks per link, a total, and a Reset button.
- **Persistence:** profile, links and clicks survive a page refresh.
- **Responsive layout:** editor and preview sit side by side on desktop and stack on mobile.

## Tech stack

- [React](https://react.dev/) (JavaScript) with [Vite](https://vite.dev/)
- [React Router](https://reactrouter.com/) for `/admin` and `/u/:username`
- [Tailwind CSS](https://tailwindcss.com/) for styling (no UI kits)
- `localStorage` through a custom `useLocalStorage` hook

## Getting started

You need [Node.js](https://nodejs.org/) and npm installed.

```bash
git clone https://github.com/indeliblegrant/link-in-bio.git
cd link-in-bio
npm install
npm run dev
```

Then open the local URL Vite prints, usually http://localhost:5173.

### Other scripts

```bash
npm run build     # production build into dist/
npm run preview   # serve the production build locally
```

## Routes

| Path | What it shows |
|---|---|
| `/` | Redirects to `/admin` |
| `/admin` | Editor, analytics and live phone preview |
| `/u/:username` | Public page for the saved username |
| anything else | "Page not found" |

## Project structure

```
src/
  components/   Small, single-purpose UI components
  hooks/        useLocalStorage.js
  pages/        Route-level pages: AdminPage, PublicPage, NotFoundPage
  utils/        defaultData.js, isValidUrl.js
  App.jsx       Owns app state and defines the routes
  main.jsx      Entry point, wraps the app in BrowserRouter
```

### Components

- `AdminPanel`: groups the profile form, link form and link list
- `ProfileForm`: controlled inputs for the profile
- `LinkForm`: add/edit form with validation, reused for both
- `LinkList` and `LinkItem`: the editable list of links
- `PhonePreview`: the phone-shaped page, used in the editor and the public view
- `LinkButton`: one link rendered as a button
- `AnalyticsPanel`: click table, total and Reset

## How data is stored

Three `localStorage` keys are used:

| Key | Contents |
|---|---|
| `linkinbio-profile` | `{ username, name, bio, avatar }` |
| `linkinbio-links` | `[{ id, title, url }]` |
| `linkinbio-clicks` | `[{ linkId, timestamp }]` with ISO timestamps |

To start fresh, clear these keys in your browser's DevTools (Application, then Local Storage) and refresh.

## Limitations

- **Per-browser data.** `localStorage` is not shared between browsers or devices, so a public link sent to someone else will show "Page not found" on their device.
- **No authentication.** Anyone who opens `/admin` in their own browser edits their own local copy.
- **Clicks only update on refresh** if `/admin` and the public page are open in different tabs.
- **Deployment note.** When hosting, configure the server to send all paths to `index.html`, otherwise refreshing on `/u/:username` returns a 404.

## License

Add a license of your choice (for example MIT) before publishing.