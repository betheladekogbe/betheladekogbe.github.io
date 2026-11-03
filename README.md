# Bethel Adekogbe — Nintendo Switch-style Portfolio

**Canonical live portfolio:** https://betheladekogbe.github.io/

**Authoritative design:** The Nintendo Switch-inspired interface in the root `index.html`. This replaced the earlier desktop-computer/Jekyll homepage in October 2026. **Do not use legacy standalone `/work/<slug>/` pages as the primary portfolio experience or send them as project links.**

## Source of truth

- **`index.html`** — the active Switch-style homepage, eShop-like projects directory, project detail screen, inline full-case-study panel, photography, résumé, About, and contact.
- **`assets/js/switch-data.js`** — core project, media, and UI data.
- **`assets/js/portfolio-projects.js`** — additional project entries and overrides, including project images, roles, categories, audio/video links, and media carousels. Loaded after `switch-data.js`.
- **`_projects/<project-slug>.md`** — full case-study content. The Switch homepage compiles these Markdown files into hidden HTML templates and displays them **within** the Switch project's “Read full case study” section. These Markdown files are **content sources** even if a legacy `/work/` page also exists.
- **`assets/images/projects/`** — project-specific artwork and case-study photographs. Ensure the Switch data object's `cover` and `media` refer to the actual assets.
- **`_data/photography.json` and `assets/images/photography/`** — photography gallery data and assets.
- **`_layouts/`, `work.html`, `assets/css/style.css`** — largely legacy Jekyll layouts/pages. Do not use their appearance to evaluate the current Switch site.

## Project links and navigation

Use **Switch deep links**, not standalone articles:

- **Projects directory:** https://betheladekogbe.github.io/#projects
- **Dead Yard project:** https://betheladekogbe.github.io/#project/dead-yard
- **Dead Yard complete case study:** https://betheladekogbe.github.io/#project/dead-yard/full

The Switch homepage handles `#project/<id>` and `#project/<id>/full`; the latter opens the full case study directly. Project-card selection and the “Read full case study” button update the URL to match. The historical `/work/dead-yard/` address redirects to the Switch view.

## Editing workflow

1. Review the user's latest approval and project information. **Do not publish unapproved changes.**
2. For a project, update **both** its `_projects/<slug>.md` write-up and the Switch project entry in `assets/js/portfolio-projects.js` (or core data if the entry is defined there). Do not treat the standalone Jekyll page as the finished UI.
3. Use original project imagery: set the `cover`, `media`, and `mediaNote` properties appropriately. Never silently replace project media with unrelated portfolio photos.
4. If audio/video is central, include a working project-specific listening or viewing action. The case-study Markdown can contain an embedded player as well.
5. Confirm that the project is not erroneously marked as `draft`. Keep the established newest-to-oldest sorting and filter categories.
6. After writing, verify the main-branch commit, successful GitHub Pages deployment, real asset paths, working Switch navigation, in-page full-case-study content, and shareable `#project/<id>/full` link. Preserve the other site sections.

## Historic implementation notes

The repository began as a desktop/Jekyll template, and older files and instructions remain for archival compatibility. Those are **not** the design currently selected by the user. GitHub Pages still uses Jekyll to compile the collection content into the Switch homepage.
