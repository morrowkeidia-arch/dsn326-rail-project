# Week 5 – AI Context Pack

## Project Information

Project: Riverbend Grill
Ticket: HEARD-204
Environment: Guest
AI Tool: Bolt.new

## Problem Statement

Guests do not know exactly what they will pay until the final screen. The purpose of my design is to improve pricing transparency by displaying an itemized breakdown before payment.

## User Research and Strategy

During my previous usability testing, neither participant successfully located the fee breakdown. One participant also expressed difficulty reading the smaller text. These findings influenced my decision to prioritize readable pricing information and a recognizable ordering experience without creating unnecessary steps.

## Design System Sources

I imported my existing GitHub repository directly into Bolt rather than creating a blank project. I instructed Bolt to use the following resources:
- RAIL.md
- rail/components/
- rail/tokens.css
- Existing Rail component variants and states
- Named design tokens
- My Figma design screenshot
The AI was instructed not to invent new tokens or modify the Rail library.

## Device Specifications
- Phone: Guest environment, comfortable density, single-column layout.
- Desktop: Guest environment, compact density, multi-column layout.
These were the requested density settings. Exact implementation values still require code verification.

## Component Specifications
- Button: Primary for checkout and secondary for supporting actions. Default, disabled and loading states.
- Menu card: Food image, item name, description, price and Add button.
- Quantity control: Increase and decrease item quantities.
- Input field: Discount code entry with default, success and error states.
- Category navigation: Entrees, Sides and Drinks with selected and unselected states.
- Account navigation: Open and closed states.
- Pricing summary: Itemized subtotal, discount, service fee and estimated total.
- Status feedback: Loading, error, offline and empty states.
## Content Requirements
- Restaurant name: Riverbend Grill
- Menu categories: Entrees, Sides and Drinks
- Food names, descriptions and prices
- FARO5 promotional code for a $5 discount
- 10% service fee
- Itemized pricing breakdown
- Saved-card and cash-at-pickup payment options
## User Flow

1. Browse the restaurant menu.

2. Select food and add items to the cart.

3. Adjust quantities or remove items.

4. Apply a discount code.

5. Review the itemized pricing breakdown.

6. Continue to checkout.

7. Attempt simulated payment.

## Required States
- Default ordering experience
- Empty cart
- Loading
- Error
- Offline
- Valid and invalid discount
- Order confirmation
## AI Build Strategy

I first used a one-shot prompt to generate the complete ordering flow. I then used piecework prompts to correct individual problems involving discount functionality, menu imagery and account navigation. I manually tested the results and corrected the publishing configuration when Bolt failed to generate a publishable output directory.

## Design Reference

**Figma: https://www.figma.com/design/WTYow9iuwaWMl4ZZPFHahT**

A screenshot of my Figma design was attached to the original Bolt prompt.

## Published Prototype

**https://morrowkeidia-arch-ds-ot2a.bolt.host**

## Implementation Limitations

The daily AI token limit prevented further refinements. Placeholder illustrations remain in the menu, account details are incomplete, and simulated payment does not complete the order. However, the primary pricing transparency feature works successfully, allowing guests to understand their estimated total before payment.
