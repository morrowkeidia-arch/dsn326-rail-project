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
