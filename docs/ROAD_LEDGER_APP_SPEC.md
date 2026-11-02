# Road Ledger — app specification and delivery requirements

Updated: November 2, 2026

## Purpose and status

Road Ledger is a local-first, driver-owned freight operations app for organizing runs, stops, mileage, time, detention, paperwork, equipment, expenses, and estimated pay. It serves semi-truck drivers, owner-operators, hotshot drivers, cargo-van operators, and other freight professionals.

Publisher: **Ain’t Cloud Software**. Recorded branding: **Every Mile. Every Record.** The current website also uses “Own the Road. Know the Numbers.”

This is a consolidated product specification based on the owner's requests and prior project discussions. Requirements and previously reported features are not proof that the current APK implements them. The repository inspected on this date contains the public website and documentation, not the Android source or a verified Android build. No current app version, passing test count, or production readiness is asserted here.

Keep the visible product name exactly **Road Ledger**. Preserve the established UI and existing behavior while fixing defects; do not replace it with an unrelated redesign.

## Product boundaries

- Core records and workflows must work offline without a mandatory account or cloud subscription.
- Driver records remain under driver control. External navigation, email, exports, and AI sharing are driver-initiated.
- Road Ledger owns freight loads, stops, GPS/mileage, delays, evidence, pay estimates, and ETA presentation.
- Road Hours Companion owns HOS planning/state. Any integration must preserve that boundary; Road Ledger is not an ELD.
- Preserve existing user data and active runs across updates. Verify backups and migrations before changing storage.
- Never seed production with the owner's personal loads, contacts, equipment, documents, or location history. Never invent mileage or extraction results.

## Navigation and screen layout

Primary tabs: **Run, Timeline, Pay, Records, Settings**. Preserve Run Plan, Notes, Tools/More, and the established stop workflow where present. Settings belong in Settings.

The Run screen should show active-run identity/status, GPS quality/current state, loaded/deadhead/total mileage, upcoming stop distance, assigned truck/trailer, work order, facility, appointment/timezone, ETA, stop status, notes, and available actions without clipping.

Required corrections:
- Shrink the empty area around the detention timer to roughly 6–8 dp vertical margins/padding.
- Remove unnecessary fixed heights, expanding spacers, or weights.
- Keep the timer readable and tappable.
- Fully show **Confirm Delivered**, including its centered label and at least a 48 dp touch target.
- Keep **End Run** compact and reachable.
- Respect system insets and bottom navigation; scroll on smaller screens or with larger fonts.
- Fix night-theme contrast, unreadable blue-on-black text, incorrect white cards, invisible tab text, and clipped form fields throughout the app.
- Use date/time selectors on date/time fields.
- Remove the unwanted timeline popup.
- Avoid input cursor jumps while editing detention.
- Preserve readable full facility and timezone information.
- Where appropriate show “Deadhead completed” once on site and “Loaded GPS miles” only after pickup checkout.

## Runs, loads, and multi-stop workflow

Support manual load creation and reviewed import of dispatch screenshots, rate confirmations, photographs, scanned pages, and PDFs.

Store work-order/load/reference identifiers, broker, shipper/receiver, facility addresses, contacts, appointments/windows/timezones, stop sequence/type, commodity and other paperwork details when supplied. Unknown imported values remain unknown.

Support multiple pickups and deliveries, including two pickups/three deliveries. Preserve ordering and distinguish repeated visits to the same facility.

Typical sequence:
1. Create/import and review a load and its stops.
2. Travel to pickup with deadhead tracking.
3. Record arrival, check-in, notes, evidence, and detention.
4. Confirm pickup checkout and transition appropriate travel to loaded mileage.
5. Repeat intermediate stops in order.
6. Confirm final delivery/checkout, complete the run, and preserve its records.

Requested behavior:
- Pre-check-in and pre-check-out information belongs inside the stop menu, not as extra main-screen controls.
- Allow notes/information before committing the official timestamp.
- Final delivery checkout should end the run; intermediate stop checkout must not end it prematurely.
- Prevent accidental duplicate check-in, checkout, or completion actions.
- Keep completed/inactive runs readable; copying their addresses must work.
- Add broker entry and contact import.
- Add special notes with an obvious icon on the Run screen and a dedicated area within the stop card. Persist notes against the correct run/stop.
- Preserve history when loads, stops, or equipment assignments change.

## Arrival, check-in, detention, and breakdown

Record **arrival**, **check-in**, and **check-out** independently. Corrections must preserve the original recorded event and identify the corrected effective value.

### Optional arrival-based check-in

Settings → Detention & Check-In:
**Use arrival time for check-in**

Help text: “When enabled, your recorded arrival time becomes your check-in time, and detention free time starts from that arrival.”

- Default OFF; persist across restarts.
- When ON, use the recorded arrival for check-in even if the driver confirms later.
- Start the free-time countdown from the same effective arrival timestamp.
- Example: arrival 8:00 AM + 120 minutes free = detention begins at 10:00 AM.
- Let the driver review/correct the date/time before confirmation.
- Missing arrival: request entry or offer **Use current time**. Never guess.
- Apply to pickups and deliveries.
- Preserve the original arrival and separate check-in/check-out records.
- Changing the preference must not rewrite completed stops or already confirmed check-ins.
- Preserve established behavior when OFF. Audit the actual existing default rule before modifying it.

### Timing and calculations

- Support a configured free allowance and detention hourly rate.
- Use one consistent calculation for the countdown, billable start, elapsed detention, pay estimate, and generated message.
- Historical requests mention both appointment-related timing and check-in-based examples. Keep those historical statements separate from the explicit new arrival option; do not silently pick a new default rule.
- Show the effective timing basis to the driver.
- Use timezone-aware stored timestamps and stop-local displays; handle midnight, timezone changes, and daylight-saving transitions.
- Generate a detention message from recorded stop/timing facts.
- Track shop/breakdown time separately from detention.
- Tracking estimates do not establish broker payment eligibility.
- Arrival/proximity detection must not silently confirm check-in without the driver's required confirmation.

## GPS, mileage, and trip tracking

- Track loaded, deadhead, home, shop, personal-conveyance, and yard mileage as separate supported categories.
- When no work order is assigned, log travel as deadhead per the owner's request.
- Show total loaded + deadhead consistently; show other categories separately so inclusion is explicit.
- Support miles by state, state crossings, current GPS-based state, driving/on-site time, and speed where available.
- Preserve mileage across pause/resume, offline periods, process interruption, and supported service/reboot recovery.
- Foreground tracking must follow Android permission/service requirements; show actionable permission and GPS-quality states.
- Filter stale/inaccurate fixes, impossible speed, jumps, duplicates, and stationary jitter. Do not count missing fixes as fabricated travel.
- State boundaries should be usable offline; review ambiguous border points instead of blindly assigning a state.
- Support odometer reconciliation with an auditable correction.
- Keep geofence/proximity radius, dwell, accuracy, speed filtering, confirmation, notification, and diagnostics controls consistent with the actual engine.
- Test real background tracking, screen-off behavior, denied permissions, weak GPS, and recovery on a physical device.

## ETA, maps, and stop statistics

- Fix incorrect ETA calculations; use actual remaining route/stop information and clearly indicate uncertainty.
- Handle appointment timezones and stop delays consistently.
- Preserve external navigation/address sharing.
- Provide stop statistics for observed loading/unloading durations.
- Requested predictive loading/unloading estimates must use a suitable history database and identify insufficient data rather than invent predictions.
- Consume HOS planning from Road Hours Companion if integrated; avoid a competing HOS source of truth.
- Do not claim guaranteed arrival accuracy without evidence.

## Scanner, OCR, and AI import

The scanner has repeatedly failed in real use; an OCR result is never automatically confirmed truth.

### Reliable document capture

- Use one authoritative persistent scan session with stable page IDs.
- Capture, crop, and save transactionally.
- Apply EXIF orientation and preview-to-image crop transforms correctly.
- Auto-crop with manual adjustment, rotation, retake, delete, and page reorder.
- Ensure review, saved document, export, and OCR use the identical processed page set.
- Retaking/deleting one page must not modify another.
- Recover across navigation, lifecycle changes, process death, and interrupted saves.
- Fix misleading “photo deleted” feedback.
- Preserve originals and keep diagnostic logging free of document/personal content.
- Verify a physical multi-page capture/crop/reorder/retake/delete/save/reopen/export flow before claiming the scanner fixed.

### Use My AI workflow

1. Share all relevant dispatch pages to the driver's chosen image-capable AI.
2. Request one complete, valid JSON object in a copyable JSON code block.
3. Paste into **Use My AI → Import AI Results**.
4. Validate, review warnings, correct values, and approve.
5. Save as a new load and reopen to verify every stop.

- Historical schema name: `road-ledger-load-v1`; verify the exact current importer schema in source before editing it.
- Extract only information visible in the submitted pages. Never borrow earlier loads or invent facilities, addresses, dates, identifiers, stops, or commodities.
- Use `null` for unknown values where the current schema allows it.
- Validate types, dates/timezones, stop sequence, required fields, and duplicate imports before persistence.
- Preserve multi-page/multi-stop associations and link imported facts to source evidence where supported.
- Malformed/partial JSON must produce actionable errors without corrupting an existing run.

### Optional local intelligence

Prior discussions explored on-device OCR and optional local AI/Intelligence Hub. These are historical design work, not a verified shipped dependency.
- Core load storage and workflows remain in Road Ledger.
- Preserve external AI sharing and review if an optional Hub is removed.
- Require permission boundaries, signed-package authentication where applicable, explicit consent for correction learning, confidence/review states, model licensing, and benchmark/schema gates.
- Do not make public-network AI mandatory or ship an unvalidated model as a scanner repair.
- Historical device/model benchmarks are not current release test results.

## Pay, expenses, and pay periods

- Support mileage pay and configured stop, tarp, detention, bonus, and other accessorial items.
- Requested pay modes include hourly and daily, alongside mileage-based pay.
- Use a shared calculation source for Run, Pay, Records, period totals, and exports.
- Avoid duplicate miles/accessorials and inconsistent rounding.
- Historical arithmetic check: 38.4 loaded + 109.3 deadhead = 147.7 miles; at $0.68/mile, rounded pay = $100.44. Treat this as a synthetic calculation example, not production data.
- Historically requested period behavior excludes unfinished loads until completed; verify and preserve configured behavior.
- Allow weekly and two-week periods with a driver-selected start day/date.
- Support archiving and starting a new period while preserving frozen archived totals.
- Keep expense/work records organized; expense categories and any fuel deductions require verification against source before presenting them as supported.
- Pay is an estimate unless reconciled to actual settlement information.

## Truck and trailer profiles

- Separate truck and trailer profiles.
- Add, edit, switch, archive, and delete equipment safely.
- Support frequent equipment changes, photos, notes, and relevant identifiers.
- Use stable vehicle IDs and preserve historical run/record associations when equipment changes or is archived/deleted.
- Detect duplicate VINs where VINs are used.
- Review OCR-derived VIN/odometer values before saving.
- Do not create fake default equipment.
- Persist default/active assignments correctly.
- Earlier expansion requests include fuel/MPG, service records, vehicle passport, and local vehicle exchange/import with MPG Tracker; implementation and schema compatibility remain to be verified.

## Timeline, records, evidence, and exports

- Persist meaningful run/stop/tracking/detention/equipment events.
- Retain originals and correction history.
- Organize paperwork, photographs, notes, load/seal evidence, expenses, completed runs, and equipment records.
- Earlier evidence-vault requests include incident/case organization, immutable originals, and integrity hashes; verify implementation before advertising those protections.
- Provide driver-controlled exports and sharing.
- Earlier requests include QR/local transfer and storage management; confirm exact formats and transport before implementation.
- Cleanup must not remove evidence still referenced by a run.
- Preserve records through upgrade, restart, archive, and optional-integration removal.

## Settings and privacy

Settings cover the active feature set, including detention/check-in, pay periods/rates, tracking/proximity, equipment, theme, storage, and sharing controls.

- Core offline operation and no mandatory account/cloud.
- Keep private records and test fixtures out of the public repository and marketing screenshots.
- Request permissions only for functions that use them, with useful denial/recovery behavior.
- Align the website privacy policy and Play Data safety declarations with the actual release's permissions, storage, processors, and optional sharing.
- Do not assume analytics, accounts, cloud sync, or advertising are present.
- Preserve the existing privacy/support pages unless separately updating their verified facts.

## Android technical history — verify against source

The historical source repository is **Spike1976/road-remix**; this public **Spike1976/road-ledger** repository was created for the website. Inspect the source repository and its own instructions before implementing app changes. Do not copy private source into a public repository without confirming the intended publication scope.

Previously recorded baseline:
- Kotlin and Jetpack Compose.
- Room persistence and DataStore settings.
- ML Kit OCR and Play Services Location.
- Later recorded application ID `com.roadledger.remix`; an earlier rebuild used `com.roadledger.rebuild`. Do not change the installed app identity or overwrite an unrelated project based only on historical notes.
- Historical min/target SDK 26/35, JVM 17, and build task `:app:assembleDebug`.
- Historical version `1.0.0-rm4` / code `10004` is not the current verified release version.
- Determine current package, branch, SDKs, dependencies, version, signing arrangement, and build instructions from the actual project.
- Preserve existing signing identity and data compatibility. Do not infer a release code from outdated notes.

## Priorities and acceptance gates

| Priority | Work | Evidence required |
| --- | --- | --- |
| P0 | Preserve data and locate authoritative Android source | Identified source/branch, backup and migration plan where needed |
| P1 | Confirm Delivered clipping / compact timer / safe bottom actions | Screenshots at affected screen size and large fonts |
| P1 | Arrival-based check-in setting | OFF/ON, delayed confirmation, correction, missing arrival, restart and timezone checks |
| P1 | Scanner and AI import reliability | Physical multi-page exercise; schema and multi-stop import checks |
| P1 | Correct mileage and pay | Shared calculation checks; tracking recovery and no duplication |
| P2 | Stop menus, pre-notes, final checkout completion | Pickup/intermediate/final-stop workflow checks |
| P2 | Night theme, settings, equipment, records and copy-address fixes | Relevant screen and persistence checks |
| P3 | Predictive statistics and optional integrations | Defined schema, boundaries, privacy and benchmark evidence |

Release verification must include:
- Source build with recorded command, branch, commit, version and result.
- Appropriate tests for calculations, import validation, persistence/migrations and workflow transitions.
- Device checks for camera/crop, GPS/background behavior, navigation insets, fonts, restart/recovery and offline operation.
- No fabricated passing tests, screenshots, features, source upload, or production-readiness percentage.
- Document hardware-dependent checks not performed.
- Deliver complete source, assets, wrapper/build configuration and build README to the intended source repository; omit credentials, signing keys and personal records.
- Keep website/docs changes distinct from app implementation, APK builds, signing and store publication.

## Related documents

- [Latest focused change requests](app-change-requests.md)
- [Repository overview](../README.md)
