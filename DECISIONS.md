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

