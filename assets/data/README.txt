TESTIMONIAL DATABASE

Primary editable file:
- assets/data/testimonials.js

Backup/reference file:
- assets/data/testimonials.json

The website now loads testimonials from testimonials.js first, so the carousel works on GitHub Pages and also during local file previews. The JSON file is kept as a readable backup/reference copy.

To hide a testimonial without deleting it, set:
  active: false

To make it eligible for random display, set:
  active: true

The carousel uses every active testimonial. It shuffles them on page load, shows three at a time on desktop, two on tablet, and one wide card on mobile. The left/right buttons scroll through the full shuffled list.

The gallery featured testimonial and homepage quote also choose randomly from the same active database.
