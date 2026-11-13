# Bethel Adekogbe — Nintendo Switch-style Portfolio

**Canonical live portfolio:** https://betheladekogbe.com/

**Authoritative design:** The Nintendo Switch-inspired interface in the root `index.html`. This replaced the earlier desktop-computer/Jekyll homepage in October 2026. **Do not use legacy standalone `/work/<slug>/` pages as the primary portfolio experience or send them as project links.**

## Source of truth

- **`index.html`** — the active Switch-style homepage, eShop-like projects directory, project detail screen, inline full-case-study panel, photography, résumé, About, and contact.
- **`_data/projects.json`** — **single source of truth** for project cards, galleries, full case-study HTML, media embeds, role, dates, categories, and visibility. Edit this from **Projects (all content)** in Pages CMS.
- **`_projects/<project-slug>.md`** — preserved historical source articles for backup and Jekyll-compatible static project URLs; **not an editing source** for the Switch site. The legacy project pages now show the matching project content from `_data/projects.json`.
- **`assets/js/switch-data.js` and `assets/js/portfolio-projects.js`** — legacy UI/project fallbacks. Do not edit project copy or metadata here.
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
2. For a project, edit its **one** entry in `_data/projects.json` through **Projects (all content)** in Pages CMS. This includes both its media metadata and `fullCaseHtml` article. Do not independently edit `_projects/*.md`.
3. Use original project imagery: set the `cover`, `media`, and `mediaNote` properties appropriately. Never silently replace project media with unrelated portfolio photos.
4. If audio/video is central, include a project-specific listening or viewing link and, if appropriate, an embedded player in the project's `fullCaseHtml`.
5. Confirm that the project is not erroneously marked as `draft`. Keep the established newest-to-oldest sorting and filter categories.
6. After writing, verify the main-branch commit, successful GitHub Pages deployment, real asset paths, working Switch navigation, in-page full-case-study content, and shareable `#project/<id>/full` link. Preserve the other site sections.

## Historic implementation notes

The repository began as a desktop/Jekyll template, and older files and instructions remain for archival compatibility. Those are **not** the design currently selected by the user. GitHub Pages still uses Jekyll for legacy standalone project pages; the Switch homepage now renders all project case-study HTML from `_data/projects.json` directly.

## Pages CMS visual content editor (November 2026)

The Switch interface remains the front-end. Pages CMS edits data/media files in this repository; it does not redesign the layout.

**Start:** Visit https://app.pagescms.org/, sign in with the GitHub account that owns this repository, authorize the Pages CMS GitHub App for this repository, select `betheladekogbe/betheladekogbe.github.io`, and edit the `main` branch once this feature is merged. The editor reads the root `.pages.yml` configuration.

### Editor sections

- **Projects (all content)** → `_data/projects.json`. **The only project editor.** Edit titles, covers, galleries, categories, links, role, highlights, draft visibility, video URL, image framing, and the full case study for each project in one record. All prior case studies were migrated to `fullCaseHtml` without overwriting later CMS edits. For complex embeds and custom layouts, use **Source** in the rich-text field and check the saved result.
- The old **Project case studies** sidebar section has been removed to avoid mismatched editing. Its `_projects/*.md` files remain in GitHub as historical backups and static page metadata, but all visible article content comes from the CMS project record.
- **Photography gallery** → `_data/photography.json`. Add and remove gallery entries, upload images to `assets/images/photography/`, update captions, set categories including `behind-the-scenes`, and mark `edit_only`. Deleting an entry removes it from the gallery, not necessarily from GitHub media storage; delete the underlying media file separately if desired.
- **Home, About, Resume and Contact** → `_data/site_content.json`. Includes Home tiles, profile, experience/education panels, editable résumé entries and bullets, PDF resume file path, contact details, footer and social profile links.

**Do not edit `assets/js/switch-data.js` or `assets/js/portfolio-projects.js` to update project metadata.** Existing project directory entries were migrated to `_data/projects.json`; the live Switch interface now prefers that data and sorts projects newest-first. Legacy scripts remain as fallbacks to avoid disrupting the original design. The editable page content is hydrated by `assets/js/cms-site-content.js`.

### Editing guidance

1. Upload an image in the appropriate media library and select it in the project or photo field. Provide descriptive alt text for the gallery.
2. Use project filters that already exist in the Switch UI. The photo gallery uses existing tags; `edit_only` is independent of photo categories.
3. For a new project, add its card/detail entry in **Projects (all content)** with `fullCaseHtml` for the full article. You can embed YouTube/Vimeo through the video URL field; for complex embedded layouts, switch to the rich-text Source editor.
4. For the resume, edit experience records directly and upload PDF files through the résumé file manager. **Updating the website resume does not regenerate the PDF**; replace the PDF separately if the downloadable version should match.
5. Save, then verify the live site at https://betheladekogbe.github.io/. Pages CMS edits create Git commits and GitHub Pages rebuilds the site. Use Git history to restore earlier content if necessary.

### Important limitations

Pages CMS is a content and media editor, not pixel-level page design. It cannot change layouts or add new project filter controls without code changes. Embedded custom HTML in migrated case studies needs careful testing in the rich-text editor; use Source mode when modifying embeds or specialized layouts. The hosted Pages CMS login/authorization is an owner-only step; the GitHub connector cannot perform that third-party authorization on your behalf.


### Project image framing controls (November 2026)

Pages CMS → **Projects (all content)** now exposes non-destructive image framing settings:

- **Project cover display**: choose **Fill frame (crop edges)** or **Show entire image**; change **Cover focus** horizontal and vertical percentages, 0–100. Set 50/50 to center.
- **Individual project gallery image framing**: add an item to `mediaFrames`, enter its **Gallery image number** from the **Project photo gallery** list (1 = first), then choose fill vs full image and horizontal/vertical focal points.
- These settings change the Switch-style **project card**, **media viewer**, and **thumbnail** presentation only. They do not cut, replace, or modify the underlying files.
- The existing `mediaContain` legacy option remains as a default; any per-image setting overrides it. Older projects without framing metadata retain their previous display and Some Sweet Day's original cover behavior.
- To adjust image positioning, save in Pages CMS and inspect the public project after GitHub Pages redeploys. This is a metadata-based editor, **not a drag-to-crop UI**. Images manually embedded in rich-text case-study HTML have their own layout and are not affected by these gallery controls.


### CMS video playback in project galleries and full case studies (November 2026)

In Pages CMS → **Projects (all content)**, use **Playable videos — top gallery and full case study** (`projectVideos`). Each entry has a title; either a YouTube, Vimeo, Google Drive sharing URL, or an uploaded MP4/WebM file; optional poster and caption; and two switches:

- **Play in top photo/video reel** (`showInGallery`, default on) adds a playable item ahead of photos in the project's horizontal gallery.
- **Embed below full case study** (`showInCaseStudy`, default on) adds an embedded player beneath the case-study article without hand-editing HTML.
- Both may be enabled simultaneously for the same video; moving between media stops playback. Full-case articles keep their existing images, text, and links.
- `video` remains a legacy watch URL and will now also be playable inside the top gallery for supported hosts; it is not automatically duplicated in the full case study, since many existing cases already embed their own players.
- The **Project videos** media folder is `assets/videos/projects`. Pages CMS accepts short MP4/WebM uploads. GitHub enforces a 100 MiB maximum per file, and large video files increase repository and Pages deployment size; **host full films on YouTube or Vimeo and paste the URL** instead.
- The rich-text **Full case study** field still supports more precise embed placement via Source mode if needed. The structured video list is recommended for general use because Pages CMS rich-text sanitization may strip raw iframe markup.
- YouTube and Vimeo videos use privacy-friendly iframe players; Google Drive video links use preview embeds if accessible to viewers; direct MP4/WebM use native video controls. Unsupported links appear as an external open-video link rather than a broken player.
