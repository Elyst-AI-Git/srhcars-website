# Monthly Google review check

Source: https://www.google.com/search?q=srh+cars+ltd+nottingham#lrd=0x4879c3f90dcfa9b7:0xeaaeba849ccc620b,1,,,,

- Site reads `src/data/reviews.json` (`reviews`, `totalReviews`, `averageRating`).
- `src/data/reviews-seen.json` logs every review already processed. id = lowercase(`name|first 40 chars of text`), whitespace collapsed.
- New 4-5 star review: append to `reviews.json` (fields id, name, date, rating, text, initial = first letter of name) and to the seen log as `published`; update `totalReviews`.
- New 1-3 star review: log as `skipped`, do not publish; list it in the PR description for the owner to decide.
- Set `lastChecked` in the seen log to the run date.
