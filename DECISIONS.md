# Decisions
## DSN 326 – Design Review 1
Date: October 30, 2026
Backlog Item: HEARD-204 – Guests Don't Know What They'll Pay Until the Last Screen

## 1. Backlog Selection

**What I decided:** I chose HEARD-204, which focuses on customers not knowing their total cost until the last screen.

**Why:** I picked this because I know how frustrating it can be to order food and discover additional fees when you're almost finished checking out. I want to understand whether customers are confused by the fees themselves or by how late they're shown.

**What I gave up:** I considered the other Guest issues, but I wanted to focus on one problem that I could observe throughout the ordering process.

**What would change this:** If testing shows that customers understand their totals and are leaving checkout for another reason, I would reconsider the problem.

## 2. Rail Token Parity

I checked ten tokens across different groups and densities. All ten matched between Figma and tokens.css.

According to the Source of Truth section in RAIL.md, Figma is the authority for design values such as color, typography, spacing, and token names. The browser and code are the authority for resolved values and actual component behavior.

I did not change any tokens during this review.

## 3. Density and Environment

Service text is much larger than comfortable text because restaurant employees need to read the information quickly, sometimes from several feet away in a busy kitchen. The minimum touch target does not shrink in compact mode because reducing spacing should not make buttons harder for people to tap.

Density controls text size and spacing, while environment controls touch targets and accessibility requirements. These settings stay separate so that a denser layout does not reduce usability.

## 4. Component Review: Card

**What it does:** The Card component organizes information such as menu items, descriptions, prices, and actions into a single section.

**Variants:** Basic, image-top, image-leading, with metadata, and with actions. These differ in content and the placement of images or controls.

**States handled:** Default, hover, focus-within, active, disabled, and loading.

**States not handled:** There is no built-in selected or error state.

**Rail tokens used:** --surface-raised, --border-default, --border-strong, --radius-md, --radius-sm, --elevation-1, --elevation-2, --card-padding, --card-gap, --card-image-height, --card-image-width, --type-label-size, --type-caption-size, --text-primary, --text-secondary, --text-tertiary, --space-inline-md, --space-gap-sm, --space-inset-sm, --space-inset-md, --text-link, --interactive-subtle, --focus-ring-width, --focus-ring-offset, and --border-focus.

**What surprised me:** A disabled Card uses pointer-events: none, which blocks pointer interaction with its contents. I would want to make sure customers can still understand why an item is unavailable.

Source: rail/components/Card.css

## 5. Component Review: Input

**What it does:** The Input component allows customers to enter information such as names, phone numbers, and special requests.

**Variants:** Single-line input and multiline textarea. It can include helper text and a character counter.

**States handled:** Default, hover, focus, filled, error, success, and disabled.

**States not handled:** There is no built-in loading state, and the CSS does not perform validation.

**Rail tokens used:** --space-stack-sm, --type-label-size, --type-label-line, --type-label-weight, --text-primary, --input-height, --space-inset-md, --space-inset-sm, --type-body-size, --type-body-line, --type-body-weight, --surface-raised, --border-default, --radius-sm, --text-tertiary, --border-strong, --focus-ring-width, --focus-ring-offset, --border-focus, --text-disabled, --surface-subtle, --border-subtle, --border-error, --feedback-success, --type-caption-size, --type-caption-line, --type-caption-weight, --text-secondary, --text-error, and --text-success.

**What surprised me:** The CSS includes styling for a character counter, but the counter does not automatically update itself. That behavior would have to be implemented separately.

Source: rail/components/Input.css

## 6. Testing Script Decision

I chose five goal-based tasks covering menu selection, changing an order, understanding the price, reviewing additional charges, and completing checkout.

These tasks examine the current ordering flow and the moments when customers make decisions about money. I will keep the tasks unchanged for the Week 2 and Week 6 testing sessions.

## 7. AI Assistance Disclosure

I used ChatGPT to help organize the requirements, compare the Figma screenshots with tokens.css, review the Card and Input source files, and put my findings into a clear format. I also used it to help draft the explanations and testing tasks.

I reviewed the information against the course materials and screenshots. The Figma work, GitHub setup, browser inspection, and project decisions were completed by me. No AI-generated design changes were made to the Rail system.

## Design Review 2A — Gap Closure

Keidia Morrow
Ticket: HEARD-204 — Guests Don't Know What They'll Pay Until the Last Screen

### Gap 1: The Missing Number

The gap: The ticket reports about 1,800 support tickets mentioning “hidden,” “surprise,” or “fees” last quarter, but does not say what share of all Guest orders or support tickets that represents. It also does not identify which checkout step guests abandon.

What I found: Guest checkout completion is currently 71%, down from 76% before the March change. Abandonment therefore increased from 24% to 29%, a five-percentage-point increase. The PM pack says there is no breakdown by checkout step. Because the March release changed both restaurant fee controls and the legally required price display, we cannot attribute the drop to one change. The 1,800 complaint count also has no stated denominator.

Source: HEARD-204 ticket, “What we know” and “Constraints”; Heard PM Context Pack, “What we measure” table and FAQ (“What's the actual checkout abandonment number?” and “Where in checkout do people drop?”).

What it changes: The decline justifies investigating checkout confusion, but I cannot assume the payment screen causes abandonment. I will compare what guests notice on the cart and payment screens, ask them to explain the charges, and watch for hesitation. I would recommend step-level abandonment tracking as a future measurement need.

### Gap 2: The Solution Disguised as a Problem

What the ticket asks for: Dev proposes adding a running breakdown to the cart.

The problem underneath it: First-time and occasional guests see a total but may not understand what makes it up or why it changes between restaurants.

How I know they're different: HEARD-204 says the total is already on the cart, but the itemized breakdown is three taps later on the payment screen. Fees vary from 0% to 18% by restaurant. The complaint wording suggests confusion, but Dev admits he does not know whether people leave because the fee is high or because it surprises them. A running breakdown is one possible solution, not the problem itself.

Does the proposed solution address the real problem? Partly. A visible breakdown could explain the total earlier, but a running display might clutter a small cart and still not address frustration with a high fee. I would test understanding and hesitation before deciding whether a persistent breakdown is necessary.

Source: HEARD-204 ticket, “Problem statement,” “What we don't know,” and “Constraints”; Heard PM Context Pack, FAQ (“What changed in March?” and “Can we just show the fee earlier?”).

### Gap 3: The Unstated Constraint

The constraint: No new checkout steps are allowed, and an itemized cost breakdown must appear before charging the guest. The restaurant's service fee can change at any time between 0% and 18%, so any explanation must reflect the current fee. Guest phone screens also use Rail's comfortable density, and color alone cannot carry meaning.

Where I found it: Heard PM Context Pack, “Constraints registry” (Business, Legal, and System); HEARD-204 ticket, “Constraints”; RAIL.md, “Three axes” and “Applying the axes.”

Why the ticket doesn't mention it: Dev includes the changing fee range in the ticket, but leaves the broader legal, checkout-step, and Rail rules in shared documentation.

What it rules out: I cannot add a confirmation page, rely on a fixed service-fee example, hide itemized charges until after payment, or distinguish charges only by color. Any clearer explanation has to fit the existing mobile checkout without an extra step.

Decision Before Studio B

I will frame HEARD-204 as a price-understanding problem, not just a late-total problem. My baseline sessions will check whether guests notice and understand the breakdown, whether the fee amount itself bothers them, and whether either issue affects their confidence in completing an order. I will not commit to a running breakdown before those observations.

---

# Week 3: Studio – Three Options
## DSN 326 – Design Review 3
Date: November 15, 2026
Backlog Item: HEARD-204 – Guests Don't Know What They'll Pay Until the Last Screen

## 1. Problem

Customers do not always understand their total cost because the fee breakdown appears late in checkout.

During my Week 2 testing, both participants completed their tasks, but neither found the fee breakdown. One participant also mentioned that the text was too small.

My goal is to make prices and fees easier to understand before customers place their orders.

## 2. Three Design Options

### Option A: Itemized Cart

This option shows the price breakdown directly in the shopping cart.

The customer can see the subtotal, service fee, taxes, and final total before continuing to checkout.

Example:
- Chicken burrito: $12.00
- Chips and salsa: $5.00
- Subtotal: $17.00
- Service fee: $1.70
- Tax: $1.36
- Total: $20.06

This is my cheapest option because it uses the existing cart and requires fewer changes.

### Option B: Menu Pricing

This option shows estimated prices and fees while customers are browsing the menu.

Example:
- Chicken burrito: $12.00
- Chips and salsa: $5.00
- Estimated subtotal: $17.00
- Estimated service fee: $1.70
- Estimated tax: $1.36
- Estimated total: $20.06

Customers can see an estimated total before adding the items to their cart.

This option helps prevent price surprises earlier in the ordering process.

### Option C: Checkout Review

This option combines the order details, fees, tip, and payment total on the existing checkout screen.

Example:
- Pickup: 6:30 PM
- Items: $17.00
- Service fee: $1.70
- Tax: $1.36
- Tip: $3.00
- Pay: $23.06

This option helps customers review everything together before placing their orders.

The example prices are illustrative. Actual fees must reflect the restaurant's current settings.

## 3. Tradeoff Table

| Tradeoff | Option A: Cart | Option B: Menu | Option C: Checkout |
|---|---|---|---|
| What it is and what it does best | Shows all fees in the cart. Best for making the price breakdown easy to find. | Shows estimated costs while browsing. Best for preventing surprises early. | Combines charges and payment details. Best for final order review. |
| What it costs the user | Takes up more space in the cart and may require scrolling. | Adds more information to the menu, which may feel crowded. | Requires customers to review more information on one screen. |
| What it costs the system | SMALL build. Reuses Rail Card, ListRow, and Button components. Existing spacing and text tokens can support the layout. Needs current fee calculations but no obvious new component. | LARGE build. Reuses Rail Card, ListRow, and Button components. Needs estimated-price calculations for items and modifiers. May require documenting a new price-estimate pattern. | MEDIUM build. Reuses Rail Card, ListRow, Input, and Button components. Needs checkout layout changes and an updated review-summary pattern. |
| What it assumes | Customers will notice and understand the breakdown when it appears in the cart. | Customers want to understand estimated fees before adding items. | Customers prefer reviewing all charges together before payment. |
| What would kill it | Test participants still cannot identify the service fee in the cart without help. | Test participants confuse estimated prices with guaranteed final prices. | Test participants overlook the final total or cannot locate the tip option. |

## 4. Rail Design System Considerations

According to RAIL.md, the existing design system includes components such as Card, ListRow, Button, Input, and Badge.

All three options are intended for the Guest phone experience using comfortable density and the standard environment.

The system requires a minimum touch target of 44px.

I would reuse existing components and tokens before considering new components.

Option A requires the smallest expected build and maintenance effort.

Option B requires more development, testing, and documentation because estimated prices must stay accurate as orders change.

Option C requires changes to the checkout layout and testing to make sure customers can still complete payment easily.

Any new reusable pattern would also need documentation and design system review before becoming a standard.

## 5. My Preferred Option

I would choose Option A: Itemized Cart.

I chose this option because it directly addresses the problem that appeared in my Week 2 usability testing.

Neither participant found the fee breakdown, so displaying it directly in the cart seems like a reasonable first solution.

It also has the smallest estimated development cost and does not require adding another checkout step.

However, Option B may be better at preventing surprises earlier, and Option C may help customers make their final payment decision.

I would not eliminate either option without testing.

## 6. What I Would Test Next

I would show participants all three designs and ask them to identify the service fee and final total.

I would also ask which design makes the pricing easiest to understand.

This would help determine whether my preferred option actually works better for customers.

The Week 3 preference test has not been completed yet, so I am not claiming that one option has tested better than the others.

## 7. Design Decision

My current recommendation is to explore Option A first because it addresses the clearest usability problem with the smallest estimated system change.

The next step is to compare all three options through a preference test before moving one design to full fidelity.
I am leaning toward Option A because it makes the fee breakdown visible earlier in the cart without requiring a major change to the Rail system. However, I know this is still an assumption because both participants completed checkout, even though neither found the fee breakdown. I want to test whether showing the fees earlier helps guests understand their total and prevents them from being surprised by additional charges.
Week 4 Studio A — HEARD-204 Direction and Constraint (November 20, 2026)
Decision: Choose Option A provisionally. Use an always-visible, compact fee summary in the existing cart totals area, with comfortable density on phone and compact density on desktop. Do not enlarge the cart or hide ordered item names, quantities, or prices.

Evidence: In Week 2, two of two participants completed checkout, but neither found the fee breakdown. This establishes a discoverability issue, not a demonstrated surprise payment or abandonment. One Week 3 classmate preference reply favored Option C because guests may review fees more closely at final checkout. Preference alone does not prove performance.

Unknown / falsifier: We still do not know whether an earlier fee display actually changes guest understanding or prevents unexpected-charge frustration. If a follow-up comparison shows guests overlook A's cart fee row but notice and correctly explain fees in C's final review, switch to C.

Other options / Cut: Option B — cut for now because dynamic price estimation as modifiers change increases build and maintenance cost. Option C — deferred, retained as a comparison in follow-up testing rather than discarded.

Heard setting: Restaurant service fee configurable from 0% to 18%. When set to 0%, omit the service-fee row, but keep subtotal, applicable tax, and total visible.

Marisol's actual Week 4 memo constraint: On phone, cart is comfortable; on desktop, cart column is compact. The fee display must fit without crowding out ordered items. Do not design for only one viewport.

Clarifying question: Does the cart totals area have to stay the same height, or can its internal content be reorganized while preserving the item list?

No-answer plan: Assume cart height cannot increase; place short subtotal / service fee / taxes / total rows in the existing totals area, remove extra explanatory copy and unnecessary headers, and check layouts at both densities. Verify existing Rail components during build.

Response: Accept and re-plan rather than adding a larger breakdown panel. Keep item names, quantities, and prices unchanged; put extra fee explanation behind an optional disclosure.

Tradeoff: Less explanation is visible immediately, so a curious guest needs one extra interaction to understand a fee.

Reversibility: Reversible cart presentation change, avoiding a new shared Rail component. Restore the old totals presentation if observed comprehension gets worse.

Next evidence: Test at phone and desktop widths whether guests can correctly state the fee amount and final total before continuing to checkout.
:::writing{variant="document" id="82641"}
# Week 5 – Studio: The Build

**Date:** November 27, 2026  
**Ticket:** HEARD-204  
**Project:** Riverbend Grill – Guest Ordering Experience

## Drift Audit

| What differed | Rail token or rule involved | Responsibility | Decision |
|---|---|---|---|
| FARO5 initially failed to apply the $5 discount. | Input success/error states and `--text-success` | AI tool. Discount functionality was explicitly requested. | Fixed and verified that the discount and total update correctly. |
| Menu cards initially contained no food images. | Card composition and `--radius-md` | My specification did not provide individual image assets or detailed image requirements. | Partially fixed. Illustrations were added instead of photographs. Accepted temporarily. |
| The hamburger navigation initially did not respond. | Interactive controls and `--target-min` | My initial specification did not describe the navigation behavior in enough detail. | Fixed. The account navigation now opens on mobile. |
| Account details displays an informational message instead of a complete account screen. | Feedback states and interaction behavior | My specification did not define the full account experience. | Deferred because account management is outside the main ticket scope. |
| Neither saved-card payment nor cash at pickup completes the order. | Button interaction and order confirmation state | AI tool. Simulated checkout was explicitly requested. | Deferred because the daily AI token allowance was exhausted. Checkout is reachable, but order completion remains unsuccessful. |
| The discount Apply button sits lower than its associated input field. | `--space-inset-md` and form alignment | My specification did not explicitly define the alignment. | Accepted temporarily because discount functionality is working. |
| The initial build did not generate a publishable output directory. | Preservation of the existing Rail project structure | AI-generated build configuration | Fixed manually by updating package.json and running npm run build to generate the dist directory without modifying Rail. |

The Rail tokens listed identify relevant design-system concerns. Exact computed token values and component compliance still require code inspection.

## State Testing

I tested the loading, error, offline and empty-cart preview states. The loading state displays skeleton placeholders, the error state provides a retry option, and the offline state informs the guest that a connection is required. Cart preservation during an actual network interruption has not been verified.

The empty-cart state displays a clear message, provides a Browse Menu button and disables checkout.

## One-Shot vs. Piecework

I found that the one-shot approach worked well for creating the overall structure of the restaurant ordering experience, but it missed several important functional and visual details. Piecework was more effective because I could focus on individual problems rather than asking the AI to rebuild everything at once. For example, I was able to correct the discount functionality and navigation by providing more specific instructions. This experience showed me how important it is to communicate interaction behavior, component states and design expectations instead of assuming the AI will understand everything from a screenshot.

## AI Disclosure

I used Bolt to generate the prototype from my existing Rail repository and Figma screenshot. I used ChatGPT to help develop prompts, troubleshoot publishing errors and organize my findings. I manually tested the website and reviewed the AI-generated changes.

My three main AI-directed corrections were:

1. Corrected the discount input and pricing feedback.
2. Restored the image area within the menu cards.
3. Corrected the account navigation interaction.

I also manually corrected the publishing configuration after Bolt failed to generate an output directory.

## Rail 1.0.1 Patch

I checked Canvas for the separate Rail 1.0.1 patch announcement but could not locate it before submission. I left the original Rail tokens unchanged rather than introducing an unauthorized system modification.

## Known Limitations

The prototype uses placeholder illustrations instead of actual food photographs. Account details remain incomplete, and simulated payment does not successfully complete an order. All five intended ordering tasks are reachable, although the final task cannot be completed successfully.

The primary HEARD-204 objective is functional because guests can review their subtotal, discount, service fee and estimated total before payment.

## Published Build

https://morrowkeidia-arch-ds-ot2a.bolt.host

## Repository

https://github.com/morrowkeidia-arch/dsn326-rail-project

## Figma

https://www.figma.com/design/WTYow9iuwaWMl4ZZPFHahT
:::I checked the official Rail documentation for the token names. It specifies comfortable density on Guest phones, compact density on Guest desktops, and a 44px minimum interaction target for both. We haven't measured those targets yet, so I'm not claiming that they passed.
## Rail Checker Results

I ran my prototype's HTML through the Rail checker, and it passed. The checker did not flag any violations in the submitted HTML. I accepted this result without making additional changes. This provides evidence of Rail compliance within the scope of the automated check, although it does not verify all interactive states or responsive layouts.
## Week 6 Usability Testing Plan

I plan to conduct two usability testing sessions using the published Riverbend Grill prototype. I will use the original Week 1 testing script to compare the redesigned experience against my previous usability findings.

The participants will attempt all five original tasks. My primary focus will be determining whether guests can successfully locate and understand the itemized pricing breakdown before payment. I will record task completion, time, difficulties and participant feedback.

I will also document the known checkout limitation so that unsuccessful payment completion is not mistaken for participant error.

Target testing dates: November 30–December 1, 2026. Participants and session times are pending confirmation.
