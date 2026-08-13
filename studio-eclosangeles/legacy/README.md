# Legacy content

Snapshots of content the live site no longer uses, kept so retiring a feature
never means destroying work.

## `home-page-amharic-2026-05.json`

All three `homePage` documents as they stood on 2026-08-12, exported before the
site moved to English-only.

| `_id`                                  | `language` | Notes                                                       |
| -------------------------------------- | ---------- | ----------------------------------------------------------- |
| `62ee09a5-5243-4d26-965a-e39e379b566e` | `am`       | The real Amharic page. Hero translated, rest still English. |
| `homePage-am`                          | `am`       | Seeded stub, essentially untranslated.                      |
| `homePage-en`                          | `en`       | The English page, included for reference.                   |

The Amharic translation is partial — about 135 Ethiopic characters, covering the
hero CTAs and lead paragraph.

**These documents still exist in the `production` dataset.** Nothing was
deleted. They are inert because the website queries the fixed `homePage` id
rather than `*[_type == "homePage"][0]`, so a stray can never be picked up by
accident. This file is insurance against someone tidying the dataset later.

To restore one, use the Sanity CLI from the Studio directory:

```bash
npx sanity documents create legacy/home-page-amharic-2026-05.json --replace
```
