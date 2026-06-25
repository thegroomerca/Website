# Website Audit Notes

## Completed in this revision
- Removed runtime header/footer fetching from `index.html` to stop GitHub Pages 404 failures.
- Restored static header/footer markup so CSS and menu behavior load without partial dependency.
- Standardized the updated footer across all pages.
- Kept the text-only header logo.
- Kept the graphical circular logo in the footer brand block.
- Removed the unclear footer dot links.
- Removed the Facebook link from the footer.
- Added the Instagram icon beside the Instagram footer text link.
- Added favicon references to the subpages.
- Added small mobile CSS improvements for the footer and mobile menu.

## Future revision candidates
- Convert header/footer to a build-time include system instead of runtime `fetch()`. This would keep one source file while still producing static HTML that works on GitHub Pages and by local preview.
- Consolidate page-level inline CSS blocks into `assets/css/styles.css` once content/layout revisions are stable.
- Expand the gallery page to all 12 reserved `photo1.jpg` through `photo12.jpg` image slots.
- Replace placeholder images in `assets/img/photos/` with final client photos using the existing filenames.
- Add consistent active-state handling for Terms and Privacy if those pages need primary nav highlighting.
- Review external Unsplash references if any remain after final image replacement.
