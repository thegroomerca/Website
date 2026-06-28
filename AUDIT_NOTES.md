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
- Gallery now uses all 12 reserved `photo1.webp` through `photo12.webp` image slots.
- Production client photos from the supplied photo bundle have replaced the temporary images in `assets/img/photos/`.
- Add consistent active-state handling for Terms and Privacy if those pages need primary nav highlighting.
- Review external Unsplash references if any remain after final image replacement.


Content update pass:
- Updated homepage hero, philosophy, service cards, services page, contact/FAQ copy, footer brand copy, and contact details.
- About page body copy intentionally left for a later pass, except shared footer content.
- Gallery page intentionally left for a later pass, except shared footer content.
- Terms/privacy updated only where the new contact and policy wording made existing text inconsistent.

## Photo distribution pass
- Production dog photos were distributed into the existing local image slots under `assets/img/photos/`.
- `photo1.webp` through `photo12.webp` are the stable sequential gallery filenames.
- Named hero/section image files remain stable and can be replaced directly later.
- Matched testimonial photos live under `assets/img/photos/testimonials/`.
- Gallery labels, alt text, and image dimensions now reflect the supplied photo bundle where possible.



## Content update v2
- About page, Terms of Service, and Contact FAQ wording updated from supplied copy.
- Cancellation wording standardized to 48 hours where visible.

## Google Links
- Footer Google Maps link now uses the owner-provided Google short listing URL.
- Footer review link now uses the owner-provided direct Google review URL.



## Testimonials
- Testimonials are stored in `assets/data/testimonials.json`.
- The current database combines the client-supplied testimonial copy and complete Google review excerpts pasted by the site owner.
- Truncated Google snippets ending in `View full review` were not added as full testimonials.
