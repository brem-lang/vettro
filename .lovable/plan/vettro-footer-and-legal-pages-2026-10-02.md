# Vettro footer and legal pages

## What will change
- Replace the minimal footer with a stronger, full-width Vettro footer containing brand context, navigation, legal links, contact access, and a prominent trading-risk notice.
- Add dedicated Italian pages for Privacy Policy, Terms and Conditions, Cookie Policy, and Risk Disclosure.
- Keep claims careful: Vettro remains informational support, not financial advice, and no returns are guaranteed.
- Add a direct email contact link using a clearly marked placeholder address until the official company contact is supplied.

## Presentation
- Preserve the existing white editorial design, dark typography, teal accents, and compact professional styling.
- Make all footer links functional on desktop and mobile, with the legal pages sharing a consistent readable layout and a route back to the homepage.

## Technical details
- Build the footer as a reusable shared component and use TanStack Router links.
- Create one content route per legal page, each with unique title, description, Open Graph metadata, and Twitter card metadata.
- Verify the current page, every footer destination, mobile layout, and build status.
