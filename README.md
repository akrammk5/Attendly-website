# Attendly marketing website

Static informational site for Attendly. This repository contains no functioning payment processor, email contact backend, or automatic delivery system.

## Review changes

- Repairs page navigation using URL-safe references to the existing files containing spaces.
- Adds meaningful SEO meta descriptions and mobile navigation.
- Removes unverifiable placeholder testimonials and customer logos.
- Removes unused Slick Carousel and jQuery imports.
- Disables misleading checkout and contact forms until verified integrations are available.
- Adds reduced-motion behavior and automated local-link/JavaScript checks.

## Local validation

Run with Node.js 20+:

    node --test tests/website.test.cjs

For manual testing use a local static web server and view desktop/mobile, verify navigation and all form notices, keyboard tab order and screen-reader labels.

## Launch blockers

Do not publish an active checkout until a verified payment provider (e.g. Stripe Checkout hosted link) is connected and its policy and customer support information have been reviewed. Do not present placeholder reviews as actual customer endorsements.

There is no canonical production domain supplied. Once your real domain is verified, add absolute canonical tags, Open Graph URLs, a sitemap.xml and a Search Console property for that exact hostname. Do not invent those URLs.

The privacy and terms pages are drafts requiring legal and product review before commercial launch. Replace claims about unavailable functionality or unverified business practices.
