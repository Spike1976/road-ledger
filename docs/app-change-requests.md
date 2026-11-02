# Road Ledger app change requests

Updated: November 2, 2026

Status: Requested. This document records requirements; it does not mean the Android app has been changed or tested.

## 1. Compact Active Run layout

Problem: Excess vertical space around the detention timer pushes the delivery confirmation down, and the Confirm Delivered button label is clipped.

Requirements:
- Reduce unnecessary top/bottom padding and margins around the timer to approximately 6–8 dp.
- Remove fixed heights, expanding spacers, or layout weights that create the large empty area.
- Preserve a readable, tappable detention timer and its current behavior.
- Show the full Confirm Delivered button and centered label, with a minimum 48 dp touch target.
- Keep End Run compact, with a minimum accessible touch target.
- Respect bottom navigation and system insets. Allow scrolling when necessary so both actions remain reachable.
- Preserve existing run data, delivery actions, and detention calculations.

Acceptance checks:
- Confirm Delivered is fully visible at the reported phone layout.
- Smaller screens and larger font settings do not clip text or hide actions.
- Timer tapping, delivery confirmation, and End Run retain their behavior.

## 2. Optional arrival-based check-in and free time

Add a persistent toggle under Settings → Detention & Check-In:

**Use arrival time for check-in**

Help text: "When enabled, your recorded arrival time becomes your check-in time, and detention free time starts from that arrival."

Requirements:
- Default OFF, preserving existing behavior.
- When ON, use the stop's recorded arrival timestamp for check-in, even when the driver confirms check-in later.
- Start free time from that same arrival timestamp. Example: arrival 8:00 AM + 120 minutes free time = detention begins at 10:00 AM.
- Let the driver review and correct the arrival date/time used for check-in before confirming.
- If no arrival was recorded, ask for a date/time or offer Use current time; do not invent an arrival.
- Keep arrival, check-in, and check-out as separate records. Retain the original recorded arrival when correcting the effective check-in time.
- Apply to pickups and deliveries.
- Do not rewrite completed stops or silently recalculate already confirmed check-ins when the preference changes.
- Save the preference across app restarts.
- Show stop-local times consistently and calculate elapsed time using timezone-aware timestamps.
- Explain that this is the driver's tracking preference and payment eligibility depends on the applicable detention terms.

Acceptance checks:
- Toggle OFF preserves existing check-in/free-time behavior.
- Toggle ON uses arrival for a delayed check-in and calculates the correct free-time deadline.
- Corrected arrival, missing arrival, midnight crossings, time zones, and daylight-saving transitions are handled.
- Restart preserves both the preference and the recorded timestamps.
- Completed stops and existing data remain unchanged.

## Source delivery and verification

The Android source project must be available on GitHub for implementation and review. This repository currently documents the Road Ledger website; these requests alone do not supply the Android project.

After implementation:
- Commit the complete buildable source with assets, build configuration, Gradle wrapper, and build instructions.
- Exclude credentials, signing keys, local configuration, and personal driver/run data.
- Report the repository, branch, commit hash, actual test/build results, and screenshots demonstrating the layout fix.
- Clearly identify checks that require a physical device and were not performed.
