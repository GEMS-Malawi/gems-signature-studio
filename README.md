# GEMS Signature Studio

Organization email signature generator for GEMS-Malawi. Staff enter their name, job title, email, phone and division, then copy a branded signature or download it for Word or Thunderbird.

## Features

- Division-specific logos and organization branding.
- Outlook-compatible table layout and copy button.
- Word RTF download with embedded images.
- HTML file download with hosted images for Thunderbird.
- Gentle horizontal preview motion with pause controls and reduced-motion support.
- Employee details remain in the browser; no server or database is required.

## Run locally

Serve the `dist` folder with any static web server. For example, from the repository root with Python installed:

```sh
python -m http.server 8000 --directory dist
```

Open http://localhost:8000. Clipboard access requires HTTPS or localhost. Downloaded HTML uses image URLs based on the generator's current address; use the published HTTPS site for signatures sent to other people.

## Hosting

Deploy the contents of `dist` to a static HTTPS host. Include the `assets` folder and all JavaScript and CSS files. No build step is required.

Existing Sites address: https://gems-signature-studio.kelcapiten.chatgpt.site/

`.openai/hosting.json` retains the existing Sites project identity. Uploading this repository to GitHub does not automatically update that website; Sites publication remains a separate step. The HTML export and preview motion are included in this source, but were awaiting Sites publication when imported.

## Thunderbird

Download the HTML signature, save it somewhere permanent, then open Thunderbird Account Settings, select the account, enable **Attach the signature from a file instead**, and choose the HTML file. Compose HTML messages and test before use. Recipients may need to permit remote images.

## Assets

Organization logos and Outlook guide screenshots are in `dist/assets`. Black social icons derive from Bootstrap Icons (MIT); see `THIRD_PARTY_NOTICES.md`.
