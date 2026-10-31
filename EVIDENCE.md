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

Browser Computed-panel verification: Pending.

## 4. Usability Testing Script

The five-task script will be added after the Guest backlog item is selected.

No usability testing sessions have been conducted yet. Testing begins in Week 2.

## 5. Session Results

No participants tested during Week 1.

Week 2 testing results will be recorded here without changing the five original tasks.
