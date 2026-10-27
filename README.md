# Jessica Cheng's portfolio

A Next.js App Router portfolio with local case studies, a blog UI for future writing, and a portfolio guide. Pages are prerendered; `/api/chat` is the only custom API route. There is no CMS connection or account system.

## Local development

Use the versions in `.node-version` (Node 24) and `.bun-version` (Bun 1.4). Dependencies are pinned in `package.json` and `bun.lock`.

The version files do not switch your shell automatically. Confirm `node --version` and `bun --version` match them before using the commands below. This review used scoped Node 24.22.1 and Bun 1.4.4; it did not update the machine's global Bun installation. For example, on a machine with a patched Node/npm bootstrap, run `npm exec --yes --package=bun@1.4.4 --package=node@24.22.1 -- bun run check` to select the verified toolchain explicitly.

`bunfig.toml` also disables dependency lifecycle scripts and automatic installation on import, and saves new dependencies as exact versions. Deliberate dependency changes still require review and verification.

```sh
bun install --frozen-lockfile --ignore-scripts
bun run dev
```

No environment variables are needed for the site or the four curated guide prompts. Live AI is disabled by default, even if an API key already exists. Optional settings are documented in `.env.example` and [SECURITY.md](SECURITY.md).

## Content

- Case studies and the existing design-token article live in `src/app/`.
- The blog filters and cards remain available. `src/lib/articles.ts` contains an empty, reviewed local article catalog; add plain text paragraphs there when publishing new writing. Unknown article slugs return 404.
- The guide's public portfolio context lives in `src/app/api/chat/system-message.json`. Never put confidential information or credentials in model context.
- Images and video are local assets. Remote image optimization is disabled.
- Fonts are self-hosted in `src/app/fonts/`, with their licenses. Third-party session tracking has been removed.

Changes to career or project facts must also follow the user's Icca maintenance instructions.

## Verification

```sh
bun run audit
bun run check
bunx --no-install playwright install chromium
bun run test:e2e
```

`check` runs ESLint, lint-plugin compatibility fixtures, a disposable install-script policy check, type generation/checking, request-protection tests, and a production build. Browser tests start that production build on loopback port 3100 and check desktop/mobile pages, navigation, chat, security headers, and image restrictions. They disable live AI and need no API secrets.

The optional Redis integration test uses a disposable local Redis database 15. See [SECURITY.md](SECURITY.md) before running it.

## Maintenance and deployment

GitHub Actions repeats verification on pushes, pull requests, and a weekly schedule. A separate daily advisory check reads the lockfile without installing application dependencies. Dependabot proposes weekly Bun and GitHub Actions updates. These workflows become active after they reach the repository's default branch; they do not merge or deploy updates automatically. Verification installs the exact lockfile with dependency lifecycle scripts disabled and a read-only GitHub token.

`vercel.json` pins the Bun executable for install and build, and enforces the frozen lockfile and disabled lifecycle scripts on Vercel. The `node` engine selects the Node 24 runtime; Vercel controls its exact patch version, so confirm it in deployment logs.

Next.js and its ESLint config should be updated together. React stays on the patched 19.2 line while Gridland requires `react-reconciler@0.33.0`. TypeScript 6 is the current compatible line for the lint parser; TypeScript 7 requires a separate tooling migration. ESLint 10 uses the official `@eslint/compat` bridge for the legacy plugin APIs in Next's configuration; all rules remain enabled and representative rules are tested.

The production project was intentionally paused by its owner. Publishing a branch or passing local checks does not confirm a production release. Follow the deployment checklist in [SECURITY.md](SECURITY.md) before resuming it.
