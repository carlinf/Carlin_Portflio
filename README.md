# Carlin Portfolio

A single-page portfolio for Carlin Fernandes that highlights key services, work history, and recent writing. The site is built with plain HTML, CSS, and vanilla JavaScript so it deploys easily on any static host (GitHub Pages, Netlify, Vercel, etc.).

## Features

- Sticky sidebar navigation with social links and mobile hamburger menu.
- Animated hero headline driven by a typing effect (`js/script.js`).
- Sections for About, Services, Resume, Portfolio, Blog, Testimonials, and Contact.
- Interactive portfolio cards that surface extra details on hover.
- Blog cards that open full articles in a modal-style detail view.

## Tech Stack

- HTML5 for structure (`index.html`)
- CSS3 with custom responsive layout (`css/style.css`)
- Vanilla JavaScript for interactivity (`js/script.js`)
- Font Awesome 6.4.0 for iconography

## Project Structure

```
Carlin_Portfolio/
├── index.html        # Main page
├── css/
│   └── style.css     # Styles and responsive rules
├── js/
│   └── script.js     # Typing effect, filters, modals, and sidebar logic
└── images/           # Portfolio, blog, and profile assets
```

## Getting Started

1. **Clone or download**
   ```bash
   git clone https://github.com/<your-user>/Carlin_Portfolio.git
   cd Carlin_Portfolio
   ```
2. **Install dependencies**  
   None are required—everything runs client-side.
3. **Preview locally**
   - Use an editor extension such as VS Code's *Live Server*, **or**
   - Serve the directory with any static server, e.g.:
     ```bash
     python -m http.server 8000
     ```
   Visit `http://localhost:8000` to view the site.

## Deployment

Because the site is static, you can upload the repository directly to:

- GitHub Pages (set the branch to `main` and root to `/`)
- Netlify / Vercel / Cloudflare Pages (deploy from repository or drag-and-drop the folder)
- Any traditional web host by copying the files to your web root

## Customization

- Update personal details, stats, and section content inside `index.html`.
- Replace placeholder images in `images/` with your own assets (keep the same filenames or update references).
- Adjust colors, typography, and layout tokens in `css/style.css`.
- Extend or tweak interactivity—typing speed, portfolio filters, modal behavior—in `js/script.js`.

## License

No license has been specified. Add one (e.g., MIT) if you plan to share or open-source the project.


