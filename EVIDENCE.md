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

Date: October 30, 2026
Environment: Chrome on macOS
Page: Rail Starter GitHub Pages website
Selected element: div#app.density-comfortable.env-standard

| Token | Computed Value | Expected Value | Result |
|---|---|---|---|
| --target-min | 44px | 44px | Match |
| --type-body-size | 16px | 16px | Match |

Both values matched the Rail documentation and Figma library.

## 4. Usability Testing Script

Backlog item: HEARD-204 – Guests Don't Know What They'll Pay Until the Last Screen

Surface: Heard Guest
Flow: Current Guest ordering experience
Testing rounds: Week 2 and Week 6
Status: Written, not yet tested

### Task 1 — Choose a Meal
You're ordering takeout for yourself. Choose a meal you would enjoy and find out approximately how much it will cost.

### Task 2 — Change Your Order
You've changed your mind about part of your meal. Make the change while keeping the rest of your order.

### Task 3 — Understand the Total
Before committing to your purchase, figure out how much you're expected to pay, including any additional charges.

### Task 4 — Understand Additional Charges
You want to know where your money is going. Find out what charges are included beyond the food itself.

### Task 5 — Complete Your Purchase
You're satisfied with your order and want to pick it up as soon as possible. Complete the purchase using an available payment method.

### Why I Chose These Tasks
I chose these five tasks because they cover the ordering process from choosing food through checkout. They also focus on the points where customers need to understand prices and make decisions about spending.

### Testing Rules
- Use the same five task prompts in Week 2 and Week 6.
- Do not change the task wording between rounds.
- Record what participants actually do and say.
- Do not record invented results.
- No testing sessions were conducted during Week 1.
