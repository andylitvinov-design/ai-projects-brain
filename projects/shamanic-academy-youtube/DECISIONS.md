# DECISIONS — shamanic-academy-youtube

## Public Data Only

The project stores only public YouTube channel data. It must not use or store cookies, OAuth tokens, YouTube Studio exports, private analytics, or any data requiring login.

## JSON As Structured Source

`videos.json` is the machine-readable catalog. Markdown files are human/agent views derived from the same collection.

## Conservative Classification

Classification is rule-based and should remain transparent. Unknown or ambiguous series/course mappings stay `unknown` or `needs verification`.
