# Bethel Adekogbe · Portfolio

A lightweight Jekyll portfolio website built for GitHub Pages, with traditional project case studies and a journal. The homepage uses a desktop-computer-inspired visual language. No paid theme, backend, or account required beyond GitHub.

## Publish for free

1. Log in to GitHub and create a **public** repository named `YOURUSERNAME.github.io` (replace with your exact GitHub username, lowercased).
2. Click **Add file → Upload files** on the repository's **Code** tab.
3. **Open this ZIP on your computer first.** Upload the files and folders *inside* `portfolio_starter`, not the enclosing folder and not the ZIP itself.
4. In **Settings → Pages**, select **Deploy from a branch**, then choose **main** and **/(root)**. Click **Save**.
5. Visit `https://YOURUSERNAME.github.io` after GitHub finishes deploying (often several minutes).

If you already created the repository with a README, that's fine; upload the site files and let the provided README overwrite it.

## Edit the site's content

- **Brand/name and description:** `_config.yml`.
- **Homepage:** `index.html`.
- **Project pages:** files in `_projects/`. Duplicate one, change the top `---` metadata, and write the content in Markdown. Use `featured: true` to display it on the homepage.
- **Blog posts:** create a new Markdown file in `_posts/` with the filename `YYYY-MM-DD-title.md`. Start it with `---` front matter containing `title`, `date`, `summary`, and `---`; below, write your article in Markdown.
- **About:** `about.md`. **Contact:** `contact.md`. **Work directory:** `work.html`.
- **Design:** `assets/css/style.css`. **Site navigation:** `_includes/header.html`.
- **Photos/videos:** place image files in `assets/images/`, then set `image: /assets/images/yourfile.jpg` inside a project file. You can paste a YouTube iframe in a Markdown case study for video embeds.

## Add a journal post (template)

Filename: `_posts/2026-11-01-my-first-post.md`

```md
---
title: "What I Learned From a Production"
date: 2026-11-01
summary: "A short overview for the journal index."
---

Write your article here. Use ## for headings, **bold** for emphasis.
```

The homepage currently includes three **draft case studies** built from prior discussion, with clearly marked areas for replacement footage, images, and verified metrics. They should be reviewed for accuracy and confidentiality before sharing the site with recruiters.

The Journal is intentionally empty until you publish your first real article. The Contact page has an explicit placeholder rather than an invented email address.

## Preview

The included `preview/homepage.html` is a standalone homepage preview that opens in a browser without installing Jekyll. It is **not** the full compiled site. The live website uses the Jekyll files in the project root. This page is excluded from deployment.

## Optional local preview with Jekyll

If you have Ruby/Bundler installed, add a Gemfile, install the GitHub Pages gem or Jekyll, and run a Jekyll server. You do **not** need local Ruby to publish through GitHub.
