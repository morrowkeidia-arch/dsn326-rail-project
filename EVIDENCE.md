# EVIDENCE.md
## DSN 326 – Design Review 1
### Week 1: Rail Onboarding

## 1. Rail Token Parity Check

Date: October 30, 2026

I compared design tokens in the Rail Figma library with the values in the starter repository's tokens.css file. I started with five tokens from different groups and continued checking until I reached ten.

| Token | Figma Value | tokens.css Value | Match? |
|---|---|---|---|
| primary/600 | #C93D12 | #C93D12 | Yes |
| type/body/size (comfortable) | 16px | 16px | Yes |
| space/inset/md (comfortable) | 16px | 16px | Yes |
| radius/md (Guest) | 12px | 12px | Yes |
| target/min (standard) | 44px | 44px | Yes |
| neutral/700 | #524C46 | #524C46 | Yes |
| line-primary/500 | #5560B3 | #5560B3 | Yes |
| service/approaching | #F5C518 | #F5C518 | Yes |
| space/inset/md (compact) | 12px | 12px | Yes |
| target/min (high-glare) | 56px | 56px | Yes |

Result: Checked ten token values, and all ten matched.

Sources:
- Rail Figma Design System (personal copy)
- rail/tokens.css in the DSN 326 starter repository

## 2. Density Check

Rail uses three density settings: comfortable, compact, and service.

| Token | Comfortable | Compact | Service |
|---|---|---|---|
| type/body/size | 16px | 14px | 24px |
| space/inset/md | 16px | 12px | 24px |

These values were recorded from the Figma variables and checked against tokens.css.

## 3. Environment Check

Rail has two environment settings: standard and high-glare.

| Environment | target/min |
|---|---|
| Standard | 44px |
| High-glare | 56px |

### Target Minimum Across Densities

| Density | Standard | High-Glare |
|---|---|---|
| Comfortable | 44px | 56px |
| Compact | 44px | 56px |
| Service | 44px | 56px |

The Figma variables and tokens.css show that target/min changes with environment but not density.

### Browser Computed-Panel Verification

- Date: October 30, 2026
- Environment: Chrome on macOS
- Page: Rail Starter GitHub Pages website
- Selected element: div#app.density-comfortable.env-standard

| Token | Computed Value | Expected Value | Result |
|---|---|---|---|
| --target-min | 44px | 44px | Match |
| --type-body-size | 16px | 16px | Match |

Both values matched the Rail documentation and Figma library.

## 4. Usability Testing Script

- Backlog item: HEARD-204 — Guests Don't Know What They'll Pay Until the Last Screen
- Surface: Heard Guest
- Role card: Guest — first order
- Current flow: https://ryanlikesdesign.github.io/dsn326-starter/legacy/guest/
- Status: Written in Week 1; no testing conducted

### Task 1 — Choose Dinner
You're picking up dinner for yourself on your way home. Choose a meal you'd enjoy and find out approximately how much it costs.

### Task 2 — Change Your Mind
You realize you want something different about your order. Make a change without losing the rest of what you've chosen.

### Task 3 — Use a Discount
You received the promo code FARO5 for $5 off your order. Use the discount and find out how it affects the amount you'll pay.

### Task 4 — Understand the Total
Before paying, figure out how much the entire order will cost. Tell me when you feel confident you know what you'll pay.

### Task 5 — Finish Ordering
You want to pick up your food as soon as possible. Complete your purchase using an available payment method and test information.

### Why I Chose These Five Tasks

I chose these tasks because they follow the normal ordering experience, from choosing food to completing checkout. They also let me observe when a customer understands the total price, how additional charges affect their expectations, and whether they can recover after changing their mind. Task 4 is especially important for HEARD-204 because it directly tests the problem I'm investigating.

### Testing Rules

- Read the Guest — first order role card before starting.
- Read the exact consent statement from the Task Session Kit.
- Use these exact five tasks in Weeks 2 and 6.
- Do not give directions or hints during the tasks.
- Use test information only.
- Record each participant's completion, time, difficulties, and comments.
- Reset the flow between tasks if necessary, and record each reset.

- Record what participants actually do and say.
- Do not record invented results.
- No testing sessions were conducted during Week 1.
Week 2: Design Review 2B — Baseline Sessions for HEARD-204

Date: November 6, 2026
Surface: Heard Guest — current legacy checkout
Script: The five tasks in Section 4, “Usability Testing Script,” above were used without changes.
Participants: Two different adults outside DSN 326, identified here as P1 and P2.
Setup: Both received the Guest — first order role card, and I read the consent line to both.

Raw task results

Task from the Week 1 script

P1 completed?

P1 time

P2 completed?

P2 time

Observations

1. Choose Dinner

Yes

Not separately recorded

Yes

Not separately recorded

P1 read the menu carefully. P2 selected two orders of chips and salsa and a chicken tinga burrito.

2. Change Your Mind

Yes

Not separately recorded

Yes

Not separately recorded

Both made a change to their orders. Specific changes were not recorded.

3. Use a Discount

No

Not separately recorded

No

Not separately recorded

Both found where to enter FARO5, but the code did not work and no discount was applied. The reason for the error was not established.

4. Understand the Total

Yes*

Not separately recorded

Yes*

Not separately recorded

Both said they felt confident about the total, but neither located the itemized breakdown. P1 reviewed why the order cost so much; P2 said there were no hidden fees.

5. Finish Ordering

Yes

Not separately recorded

Yes

Not separately recorded

Both completed the test checkout. Both liked that payment cards saved on their phones appeared as payment options, which made this step feel quick.

Total session time: P1: 5:00; P2: 1:24. These are overall times, not sums of recorded task times. I did not time each task separately, which is a limitation of these baseline records. Task 4 is marked completed based on participants reporting confidence in their final total, not on their ability to find the breakdown.

Specific moments and observation notes

P1, menu and cart: P1 spent time reading menu details and then reviewed the cart to understand the higher-than-expected total. The overall session lasted five minutes. P1 commented that the text was too small and hard to read. This is a reported readability issue; I did not measure the text size during the session.

P1, tip decision: While reviewing the price, P1 stopped to consider whether to include a tip. I did not record the length of this pause separately.

P2, pricing: P2 ordered two portions of chips and salsa plus a chicken tinga burrito. The displayed total was $35.77. P2 said the ordering process was straightforward and that the price was high, but did not report hidden fees.

Both participants, breakdown: Neither participant found the itemized fee breakdown. They still said they knew the final total and completed checkout.

Both participants, promotion: Both located the promo entry and attempted FARO5, but the code did not work. This is a separate failure from the HEARD-204 fee-understanding issue.

Both participants, payment: Both reacted positively when cards already saved on their phones appeared as payment options. They said that made paying quick. This is an observation about the end-to-end checkout experience; the saved-card suggestions may be supplied by the phone or browser rather than by Heard Guest itself.

These notes describe observations and paraphrase feedback reported after the sessions; they are not verbatim transcripts. The original observation notes should be retained with the assignment records.

Pattern and framed problem

Observed pattern: Both participants completed checkout and felt confident in their totals, but 0 of 2 found the itemized fee breakdown. This is a small two-person baseline and does not establish how common the problem is among all Heard Guest customers.

Framed problem: First-time and occasional Heard Guest customers can finish checkout knowing the final price without being able to find out how that price is divided into fees, tax, and tip. In my two sessions, both adults completed checkout and said they knew the total, but neither found the itemized breakdown. One spent extra time checking the cart, while the other thought a $35.77 order was expensive but did not see hidden fees. This relates to Nielsen's visibility of system status heuristic because the explanation for the displayed total is not easy to find when guests review their cart.

One success measure for Week 6

Measure: When running the same five-task script on the redesign, 2 of 2 participants will locate the itemized fee breakdown before payment without hints (baseline: 0 of 2). This is a behavioral measure visible in two sessions, not a claim that conversion will improve. Its direction comes from the Heard PM Context Pack checkout-completion metric: 71%, down from 76% before the March fee change.

Known limits: No separate task times were recorded; the promo-code failure was not diagnosed; two participants are not representative of all guests. In Week 6, the exact Week 1 task wording must remain unchanged and times should be captured separately for every task.
