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

## Pages CMS visual content editor (November 2026)

The Switch interface remains the front-end. Pages CMS edits data/media files in this repository; it does not redesign the layout.

**Start:** Visit https://app.pagescms.org/, sign in with the GitHub account that owns this repository, authorize the Pages CMS GitHub App for this repository, select `betheladekogbe/betheladekogbe.github.io`, and edit the `main` branch once this feature is merged. The editor reads the root `.pages.yml` configuration.

### Editor sections

- **Projects tab (cards and detail pages)** → `_data/projects.json`. Edit titles, cover photos, project categories, links, role, highlights, visibility, video URL, gallery, and optional full case-study HTML. New entries need a unique lowercase hyphenated `id`; this creates `#project/<id>` and `#project/<id>/full` routes automatically. For a brand-new project, write the full article in **Full case study** instead of creating a separate Markdown file.
- **Project case studies** → `_projects/*.md`. Existing older case studies continue to use their Markdown and embedded HTML. The rich-text editor may not preserve complex iframe or grid HTML when switching modes; use Source mode and compare before saving existing HTML-heavy entries. For a migrated case study, put new content in `fullCaseHtml` of the project directory entry to override the legacy Markdown display.
- **Photography gallery** → `_data/photography.json`. Add and remove gallery entries, upload images to `assets/images/photography/`, update captions, set categories including `behind-the-scenes`, and mark `edit_only`. Deleting an entry removes it from the gallery, not necessarily from GitHub media storage; delete the underlying media file separately if desired.
- **Home, About, Resume and Contact** → `_data/site_content.json`. Includes Home tiles, profile, experience/education panels, editable résumé entries and bullets, PDF resume file path, contact details, footer and social profile links.

**Do not edit `assets/js/switch-data.js` or `assets/js/portfolio-projects.js` to update project metadata.** Existing project directory entries were migrated to `_data/projects.json`; the live Switch interface now prefers that data and sorts projects newest-first. Legacy scripts remain as fallbacks to avoid disrupting the original design. The editable page content is hydrated by `assets/js/cms-site-content.js`.

### Editing guidance

1. Upload an image in the appropriate media library and select it in the project or photo field. Provide descriptive alt text for the gallery.
2. Use project filters that already exist in the Switch UI. The photo gallery uses existing tags; `edit_only` is independent of photo categories.
3. For a new project, add its card/detail entry in **Projects tab** with `fullCaseHtml` for the full article. You can embed YouTube/Vimeo through the video URL field; for complex embedded layouts, switch to the rich-text Source editor.
4. For the resume, edit experience records directly and upload PDF files through the résumé file manager. **Updating the website resume does not regenerate the PDF**; replace the PDF separately if the downloadable version should match.
5. Save, then verify the live site at https://betheladekogbe.github.io/. Pages CMS edits create Git commits and GitHub Pages rebuilds the site. Use Git history to restore earlier content if necessary.

### Important limitations

Pages CMS is a content and media editor, not pixel-level page design. It cannot change layouts or add new project filter controls without code changes. Embedded custom HTML in historic Markdown case studies needs careful testing in the rich-text editor. The hosted Pages CMS login/authorization is an owner-only step; the GitHub connector cannot perform that third-party authorization on your behalf.
