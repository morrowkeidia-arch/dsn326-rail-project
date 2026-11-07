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
