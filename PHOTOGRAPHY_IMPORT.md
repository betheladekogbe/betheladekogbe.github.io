# Photography image import

The Gallery page automatically discovers JPG files under
`assets/images/photography/`, and uses `_data/photography.json`
to assign category filters and accessible photo descriptions.

To publish the curated and optimized photos, upload both of the files
`photography-upload-1.zip` and `photography-upload-2.zip` into the
repository ROOT in one GitHub commit. The workflow
`.github/workflows/import-photography.yml` will extract the images,
store them under `assets/images/photography/`, switch the Holy Week
project cover to the locally hosted file, remove the upload ZIPs, and
commit the imported images. GitHub Pages will then rebuild the site.

This is a one-time import. New images can later be added directly to
`assets/images/photography/`; add their categories to
`_data/photography.json` to make filter selections available.

Main genres: Portraits, Studio, Concerts, Outdoors, Events,
Behind the Scenes. Images may be assigned to several genres.
