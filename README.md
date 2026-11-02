# Road Ledger

**Every Mile. Every Record.** — Ain’t Cloud Software

Road Ledger is a local-first freight operations app for drivers to organize loads, stops, loaded/deadhead mileage, detention, documents, equipment, expenses, and estimated pay. It is designed for semi-truck drivers, owner-operators, hotshot drivers, cargo-van operators, and other freight professionals.

## App documentation

- [Complete app specification and requirements](docs/ROAD_LEDGER_APP_SPEC.md) — workflows, GPS/state mileage, scanner and AI import, check-in/detention, pay periods, equipment, records, privacy, technical history, known fixes, and release acceptance gates.
- [Latest focused change requests](docs/app-change-requests.md) — compact Active Run timer layout, fully visible Confirm Delivered button, and optional arrival-based check-in/free time.

The specification distinguishes requested behavior from verified implementation. **Updating these documents does not update the Android app or produce an APK.**

## Repository scope

This repository currently contains the Road Ledger public website, privacy/support pages, and app requirements. The Android source was not present in the root inspected on November 2, 2026.

Historical Android source location: [Spike1976/road-remix](https://github.com/Spike1976/road-remix). Its current branch, build identity, version, and feature status require source inspection. Preserve its privacy and existing installed-app identity when implementing changes.

## Website files

- `index.html` — main Road Ledger website
- `privacy.html` — public privacy policy
- `support.html` — support and tester instructions
- `styles.css` — responsive design and theme
- `script.js` — mobile menu and footer year
- `favicon.svg` — browser icon
- `docs/` — app specifications and change requests

## GitHub Pages configuration

In repository **Settings → Pages**, select **Deploy from a branch**, then **main** and **/ (root)**.

Expected URLs after Pages is successfully configured and deployed:

- Website: https://spike1976.github.io/road-ledger/
- Privacy policy: https://spike1976.github.io/road-ledger/privacy.html
- Support: https://spike1976.github.io/road-ledger/support.html

Deployment status has not been verified by this documentation update.

## Testing and publishing

The website links to [Android internal testing](https://play.google.com/apps/internaltest/4700938526640166864). Access may require the tester's Google account email to be added by the administrator. The link's presence is not verification of a particular APK version or feature.

Before a release, match the privacy policy and Google Play Data safety declarations to the actual AAB, permissions, storage, and external processors. Exclude personal run data, credentials, and signing keys from repository content. See the complete specification for implementation and release checks.
