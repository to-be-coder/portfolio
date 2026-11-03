# Portfolio security and release procedure

Security patches reduce known risk; an empty audit is not a guarantee against undiscovered vulnerabilities or account compromise. The repository is the authority for application controls. Hosting, billing, credentials, and domain settings need separate verification.

## Application boundaries

- All writing and images come from reviewed local source. The former Notion integration and its dependency chain are removed. The existing blog UI and static design-token article remain.
- The Labs page separately reads public GitHub star counts for two fixed repositories on the server, cached with hourly revalidation. No request input controls the destination; only numeric counts reach the page.
- Unknown dynamic article slugs return 404. No public upload, login, administrative action, or content-writing endpoint exists.
- Remote image optimization, SVG optimization, image redirects, and local-network image fetches are disabled. Sharp remains patched for local raster processing.
- Browser headers restrict resources to this origin, prevent framing and inline event handlers, block objects and base-URL injection, disable unnecessary device permissions, and set MIME-sniffing/referrer/HSTS policies. Hotjar is removed; fonts are local.
- The CSP permits inline script elements required by static Next.js hydration and inline styles used by the existing UI. It is an origin-restricting policy, not a complete inline-script XSS defense. A nonce policy would require dynamic page rendering; do not add a reusable/static nonce. Gridland uses the narrow `wasm-unsafe-eval` permission and reads its bundled Yoga bytes from a `data:` URL. Production never permits general `unsafe-eval` or external connections.

## Portfolio guide

The four suggested questions return curated answers with no paid model call. With `AI_CHAT_ENABLED` unset or `false`, other questions receive an honest curated-guide message. Keeping an old OpenAI key in the environment does not activate billing.

The API requires an exact allowed browser origin and JSON. It reads at most 128 KiB within five seconds, reconstructs text-only user/assistant messages, bounds each message/history, and rejects files, tools, and system-role input. Caller metadata is discarded. Origin checks constrain browsers; they are not caller authentication.

Saved browser conversations are also treated as untrusted input. Restoration caps serialized input before parsing, validates IDs, roles, text and history limits, and reconstructs text-only messages without provider metadata, reasoning, or source links. Invalid history is discarded. Denied or full browser storage does not prevent using or clearing the visible chat.

Live AI requires all of these settings:

- `AI_CHAT_ENABLED=true`
- `OPENAI_API_KEY` for a dedicated portfolio project
- `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` for a dedicated Redis database
- `CHAT_RATE_LIMIT_SECRET`, at least 32 random characters, used to hash IP-based limiter keys
- Vercel's platform-provided `VERCEL=1` and trusted `x-vercel-forwarded-for` header
- Optional `CHAT_ALLOWED_ORIGINS`, a comma-separated list of exact origins; apex and www portfolio domains are the defaults. Preview deployments require their own explicit origin.

Use separate provider and Redis credentials for preview and production. Do not set `VERCEL=1` on an untrusted, directly exposed server to imitate trusted headers. Moving hosts requires implementing that host's trusted client-IP boundary first.

One atomic Redis operation enforces six live calls per minute per IP, 30 per 24 hours per IP, 100 per 24 hours globally, and four concurrent live calls. IPv6 addresses share a /64 quota. Daily windows start with the first accepted call. Failed attempts after admission consume quota. These are request caps, not dollar budgets; input size, model pricing, and output tokens affect costs.

Unavailable/misconfigured Redis rejects paid generation. Leases expire, calls abort after 45 seconds or client cancellation, retries are disabled, and output is capped at 1,400 tokens. `vercel.json` opts this route into Vercel request cancellation. Next.js `after` retains cleanup on disconnect and awaits the same release promise used by the stream callbacks. Failed streams abort upstream before releasing a lease. Credentials and provider errors are not returned to visitors. Quotas do not replace Vercel's firewall or provider billing controls.

## Checks before production resumes

1. Verify the intended commit with `bun run audit`, `bun run check`, and `bun run test:e2e`. Install with the pinned toolchain and `--frozen-lockfile --ignore-scripts` in a clean checkout. Do not ignore a failed audit or bypass lint rules to release.
2. While the project remains paused, enable **Vercel Authentication → All Deployments** in its Deployment Protection settings and save. This protects production domains as well as preview/generated URLs, is available on all plans, and provides a login barrier for testing before public launch. Review existing exceptions, shareable links, and bypass access. See [protection scopes](https://vercel.com/docs/deployment-protection). Existing old deployments do not acquire patches automatically.
3. In **Settings → Build and Deployment → Node.js Version**, select **24.x**. Vercel controls the hosted patch; the local Node 24.22.1 pin does not prove the function's version. The install command prints the build machine's Node version, which still does not establish the function runtime's version. Obtain the actual runtime version or Vercel's confirmation of the applicable runtime security update before certifying it as fully patched. `vercel.json` pins Bun 1.4.4 for install/build and enforces `--frozen-lockfile --ignore-scripts`; confirm those commands were used. Remove the old portfolio Notion environment variables. Revoke the old integration credential only after confirming it is dedicated to this removed integration; do not affect unrelated Notion integrations or content.
4. Keep `AI_CHAT_ENABLED=false` for a curated-only launch, or provision and verify the dedicated Redis service and provider project before enabling live AI. Confirm the deployed chat function has `supportsCancellation: true`. Check permit acquisition/release, outage behavior, trusted IPs, provider cancellation (including closing a tab), and usage against that exact deployed preview. Local fixtures do not establish cloud service configuration or prove platform disconnect propagation.
5. Configure a Vercel firewall rate limit for `/api/chat` covering curated and live calls, managed bot/DDoS protections, and usage/spending alerts. A conservative starting rule is 20 requests per minute per IP; verify availability on the account's plan and tune from legitimate traffic. Maintain an immediate `AI_CHAT_ENABLED=false` kill switch.
6. Review Vercel/GitHub/domain-registrar access, MFA/passkeys, deployment permissions, domain auto-renewal, and recovery access. GitHub vulnerability alerts and automated security-fix PRs were enabled in this task; secret scanning and push protection were already enabled. These settings do not prove MFA is enabled.
7. After saving environment/runtime settings, create a fresh deployment from the patched commit under **Deployments → Create Deployment**. Wait for **Ready** and confirm its source commit and build commands. The launch recommendation is `AI_CHAT_ENABLED=false` in both Production and Preview; suggested questions need no OpenAI or Redis credentials. Avoid redeploying an old source revision just because it was previously Production.
8. Deploy or promote the patched revision to **Production** and verify that **Current** points to that commit. Pausing can disable automatic assignment of production domains. If the deployment is **Staged**, use **… → Promote**. If the dashboard blocks building or promotion while paused, resume only after step 2's All Deployments protection is saved, confirm an unauthenticated visitor receives the Vercel login gate, and complete the build/promotion privately. Official documentation does not guarantee promotion while paused.
9. With the patched deployment Current and All Deployments protection still enabled, use **Settings → General → Pause Project → Resume Project** if needed. Verify the login gate in an incognito window. In your authorized browser, test the actual production domain's pages, images, blog filters, four suggested questions, and an arbitrary question's curated-only response. Confirm headers and error behavior. Testing the production domain avoids needing an extra preview origin for chat.
10. After the protected checks pass, change the protection scope to **Standard Protection** and save. This opens production domains while keeping generated deployment URLs protected. Verify the public response in incognito and watch errors, firewall requests, and usage. Keep a rollback to a patched build; do not roll back to a known-vulnerable revision. **Resume alone restores the existing production deployment without rebuilding it**; the authentication barrier and explicit Current-commit check prevent accidentally exposing the old build. See [promotion](https://vercel.com/docs/deployments/promoting-a-deployment) and [resume instructions](https://vercel.com/docs/projects/managing-projects#resuming-a-project).

Vercel account access was unavailable during local implementation, so Vercel firewall/runtime/environment changes, a deployed preview, and production resumption are not certified by this repository.

The deployment commands run `scripts/vercel-bun.mjs`, which uses the hosting-supplied Node/npm launcher and the exact `.bun-version` pin (currently `bun@1.4.4`). Each invocation uses a fresh temporary tool cache, prints the build tool versions, and removes that cache afterward. npm 12 receives the package-specific `--allow-scripts=bun` option. The npm `--ignore-scripts=false` option and normalized environment aliases apply only to this tool bootstrap: Bun's reviewed `install.js` needs to select its native executable from its exact-version `@oven` platform packages. The application install still explicitly passes `--frozen-lockfile --ignore-scripts` to Bun. Do not remove the child `--ignore-scripts` flag or disable the repository's default script protection. CI executes the actual install/build commands from `vercel.json`; the install-policy fixture also starts with a cold npm cache and inherited script-blocking settings, then verifies that neither project nor trusted dependency lifecycle scripts run, even without `bunfig.toml` and with script blocking also set in a fixture `.npmrc`.

This launcher replaced `bunx` after the 27 October protected deployment exited before the application installer started. A global ignore-scripts setting reproduced that symptom locally, but the user reported no such Vercel environment variable; the hosted root cause was not established. The replacement avoids relying on the hosting-supplied Bun bootstrap and still requires a successful protected deployment to confirm the hosting fix. Check the hosting-supplied Node/npm launcher as well as the pinned Bun executable when verifying build runtimes. A version pin does not patch the launcher that downloads it. Version files alone do not update a developer's global installation.

Vercel's [April incident guidance](https://vercel.com/kb/bulletin/vercel-april-2026-security-incident) also calls for reviewing account/deployment activity and rotating credentials previously stored as non-sensitive environment variables. Store replacement secrets as sensitive, keep preview deployment protection enabled, and follow any account-specific incident notification. This review did not establish whether the portfolio account was affected. The [October Node/Brotli bulletin](https://vercel.com/kb/bulletin/node-js-security-advisory) and [eMudhra certificate bulletin](https://vercel.com/kb/bulletin/emudhra-security-advisory-compromised-intermediate-ca-keys) reinforce verifying the actual hosted runtime and newly deployed mitigations; the checked local Node 24.22.1/Bun 1.4.4 versions include their respective fixes.

## Local Redis verification

Use a disposable Redis instance bound only to loopback, with persistence disabled. The integration test uses database 15, refuses existing limiter state, and deletes only its fixture keys. Never point it at a shared or production server.

```sh
REDIS_TEST_CLI=/absolute/path/to/redis-cli REDIS_TEST_PORT=16379 bun test tests/chat-redis-integration.test.ts
```

The ordinary unit suite uses fake network/provider responses and makes no paid calls. The optional integration suite executes the actual admission Lua against Redis. Cloud credentials are never needed for either.

## Ongoing updates and incidents

Review automated update PRs and their checks weekly; prioritize active security advisories immediately. The daily advisory workflow checks the full lockfile without installing application packages, in addition to verification on changes and the weekly full check. Workflows must be merged into the default branch to run on their schedules; enable GitHub failure notifications and check that scheduled runs actually occur. No workflow auto-merges or deploys updates. Exact pins make installs reproducible; they still require updates. `bunfig.toml` disables lifecycle scripts and automatic installation on import for normal local use and saves new dependencies as exact versions. Review any exception before explicitly trusting an install script.

If compromise is suspected, keep the project paused, preserve logs and deployment evidence, inspect access/deployment history, rebuild from trusted patched source, and rotate affected credentials. A code update alone does not remove an attacker who already has account access.

## Second review: 27 October 2026

Current maintainer advisories and fresh registry metadata were checked against the manifest, lockfile, and installed packages. Next.js 16.4.3 exceeds the October security minimum of 16.4.1; Sharp 0.35.5 meets the image-processing fix. React/React DOM 19.2.9 are explicitly patched backports, so a move to 19.3 is not required for those fixes. Node 24.22.1 and Bun 1.4.4 include their applicable current security fixes. The fresh full-lockfile audit reported no known advisories. There are no application Server Actions, `use cache` functions, or `next/og` image routes, but the framework still needs regular patches.

The threat review covered observed React2Shell server compromises, subsequent React/Next.js RCE and denial-of-service advisories, malicious npm lifecycle scripts, compromised CI Actions, browser injection, and public API resource abuse. These are attack categories assessed against this repository, not evidence that this portfolio was compromised. Lock integrity and registry signatures authenticate downloaded package identity; they do not prove that a maintainer or package is trustworthy. Script blocking also does not sandbox code once it is imported or built.

The second pass added repository-wide safe-install defaults, explicit Vercel install/build commands, daily advisory checks, and bounded memory handling for fragmented chat bodies. Checks of repository text and public assets found no high-confidence credential patterns or active SVG markup. That is a scoped source review, not a forensic examination of prior deployments, local editor extensions, or hosting accounts. The CSP's inline-hydration exception remains documented above.

Supporting primary sources: [React RSC RCE fixed versions](https://github.com/react/react/security/advisories/GHSA-xqc2-xf4c-x3h3), [React Server Functions DoS](https://github.com/react/react/security/advisories/GHSA-h3gv-c5rc-p453), [Node 24.22.1 security release](https://nodejs.org/en/blog/release/v24.22.1), [Bun security advisories](https://github.com/oven-sh/bun/security/advisories), [Google's observed React2Shell exploitation](https://cloud.google.com/blog/topics/threat-intelligence/threat-actors-exploit-react2shell-cve-2025-55182/), [GitHub supply-chain incident guidance](https://github.blog/security/supply-chain-security/our-plan-for-a-more-secure-npm-supply-chain/), [GitHub Actions security guidance](https://docs.github.com/en/actions/reference/security/secure-use), [Bun safe-install configuration](https://bun.com/docs/runtime/bunfig#installignorescripts), [Vercel Bun pinning](https://vercel.com/kb/guide/how-to-pin-a-specific-bun-version-for-vercel-builds).

Primary references: [Next.js October 2026 security release](https://nextjs.org/blog/nextjs-security-update-october-14-2026), [Next.js CSP guidance](https://nextjs.org/docs/app/guides/content-security-policy), [Vercel trusted request headers](https://vercel.com/docs/headers/request-headers), [Vercel rate limiting](https://vercel.com/kb/guide/limit-abuse-with-rate-limiting).

## Requested consecutive review loop: 27 October 2026

Completed four additional research/review rounds. A clean round means no new confirmed, remotely exploitable vulnerability was found in the reviewed application, dependencies, build, or repository configuration. Each round refreshed primary advisory research and examined concrete attack paths. Hosting/account checks and historical compromise remain outside this result.

| Round | Research and verification | Result |
| --- | --- | --- |
| 1 | Current maintainer advisories; OSV queries for all 640 locked package versions; HTTP/image and Markdown probes; streaming lifecycle/cancellation review. | No new confirmed vulnerability; count 1. |
| 2 | Fresh independent reviewers; 2,002 parser cases; browser/API probes; 19 registry artifacts compared across 8,920 files; 122 Next bundled-library versions checked with reachability review. | Found missing Vercel cancellation opt-in. Fixed it and retained asynchronous lease cleanup with `after`; reset count to 0. |
| 3 | Fresh OSV/npm queries for 640 versions; renewed advisory research; seven new stream-failure cases; native pre-abort network canary; 13 Chromium injection fixtures; HTTP/cache/image checks; CI and build-input review. | No new confirmed vulnerability; count 1. |
| 4 | Three fresh reviewers; renewed Bun/npm/OSV and maintainer checks; 1,201 traced build files examined; additional parser/renderer, HTTP framing, image and RSC cache probes; production browser asset credential-pattern scan. | No new confirmed vulnerability; count 2. |

The final two rounds reviewed the same application/configuration candidate. Its SHA-256 is `44817e992a194dcd90f401d5aa03aab5523d89508f2d900356ae0ca88a0ef38a`: sorted repository-relative paths from Git's tracked/non-ignored file inventory, excluding Markdown and deleted files, each followed by a NUL and the raw SHA-256 of its content, then hashed together (371 files). The lockfile SHA-256 is `595fc9b3cc1cbff67875c12c9c1a3e14a3ed406556cc60278f055ac75d4c4367`. This identifies the local candidate; it is not a deployed commit identifier.

After the last code fix, the pinned Node 24.22.1/Bun 1.4.4 toolchain passed lint, lint-rule and safe-install fixtures, type checks, all 16 security tests, a production build, and all 10 desktop/mobile Chromium tests. The final dependency checks found no known advisory matches among the 640 locked package versions. The production browser asset scan found no high-confidence credential patterns in 378 files; it does not cover every possible secret format.

Version-only alerts for libraries bundled inside Next were investigated separately from the lockfile audit. For example, the framework's own aborted-response cleanup destroys the affected compression streams; other candidates required attacker-controlled build inputs or remote image features absent here. This is a reachability assessment of the current source, not an exemption from future framework updates. Registry-byte comparisons authenticate artifact identity, not publisher trust.

The cancellation fix follows [Vercel's opt-in and retained-cleanup requirements](https://vercel.com/docs/functions/functions-api-reference#cancel-requests), [AI SDK cancellation guidance](https://ai-sdk.dev/docs/advanced/stopping-streams), and [Next.js `after`](https://nextjs.org/docs/app/api-reference/functions/after). Regression tests cover platform closure before the request abort signal and while lease release is already pending. Actual Vercel propagation must still be verified on a protected deployment.

The historical two-clean-round stopping rule was satisfied for that local scope. The November review below supersedes that result for the current working tree. No review guarantees immunity to unknown vulnerabilities, and this result does not authorize resuming an old deployment. Complete the production checklist above against the patched revision.

## Initial defensive review and hardening: 3 November 2026

The audit-remediation follow-up below supersedes this initial candidate's dependency status and artifact identifiers.

Reviewed the architecture before editing: prerendered local pages, one custom text-only chat API, optional public GitHub star reads, and no application login, upload, administration, or Server Action endpoints. Three independent reviews covered server controls, browser rendering/storage, and dependency/build configuration. Work used source inspection, current maintainer advisories, existing local regression tests, and ordinary browser flows against a loopback production build. No public deployment was scanned or changed, and no live paid provider was used.

### Findings and changes

- **Lint dependency advisory:** the fresh full-lockfile audit reported [GHSA-g3hv-75wg-m249](https://github.com/isaacs/minimatch/security/advisories/GHSA-g3hv-75wg-m249). A version-scoped override replaces modern `minimatch` 10.2.6 with 11.0.4. ESLint and its TypeScript/config consumers use the supported named/class interfaces. Ordinary file-selection and lint-rule fixtures verify compatibility. The override requires Bun lockfile version 3; use the repository's pinned Bun 1.4.4.
- **Saved-chat resilience:** the previous restoration guard accepted arbitrary message parts, and its error handler could throw again when browser storage was denied. A dedicated storage module now bounds input before JSON parsing, validates the text history, drops unsupported parts and metadata, and guards storage access and cleanup. Tests cover ordinary curated-response reload, malformed history, limits, and unavailable storage. This was a local saved-state failure, not evidence of remote compromise.
- **Boundary documentation:** documented the Labs page's fixed, server-side GitHub star-count reads. No career facts or project claims changed.

### Five post-fix verification passes

The initial findings reset the count. The following five focused defensive passes found no additional confirmed application issue on the final code/configuration candidate. They are separate review scopes, not five penetration tests, and do not clear the unresolved upstream items below.

| Pass | Scope and evidence | New findings |
| --- | --- | --- |
| 1 | Dependency compatibility: scoped override, manifest/lock review, modern file globs, legacy plugin glob APIs, frozen install with scripts disabled. | None; existing legacy advisory retained. |
| 2 | Independent server/storage review: request boundaries, permit/cancellation lifecycle, bounded saved history, guarded storage failures and hydration-before-persistence. | None. |
| 3 | Full local verification: lint, lint-rule fixtures, cold-bootstrap install-policy fixtures, type checks, 16 request/security tests, eight storage tests, and production build. | None; all checks passed. |
| 4 | Running production build on loopback: all 16 desktop/mobile Chromium tests passed, including ordinary navigation, curated chat, storage recovery, headers, and image restrictions. | None. |
| 5 | Final artifact and dependency review: 28 build traces covering 1,201 unique files; no lint/minimatch packages in traced server files; no application Server Actions; one custom API route. Credential-pattern checks found no high-confidence matches in 123 source text files or 378 browser artifacts. Production dependency audit passed for 269 packages; primary release/advisory information was rechecked. | None beyond the unresolved items below. |

The checks used Node 24.22.1 and scoped Bun 1.4.4; the machine's global Bun was not changed. Production build ID: `IgT-6kZpEt-Ma476NaHhf`. The application/configuration/test candidate SHA-256 is `b2b54ac60f43522e4325870b753a17fb806f4deba595dad726e9ccdefb64b0f7`: sorted tracked/non-ignored repository-relative paths excluding Markdown, each followed by a NUL and the raw SHA-256 of its content, then hashed together (374 files). Lockfile SHA-256: `8ceed53511b203b2177223464bb2381562ba301ba8859c829896b9a778a564f3`. This identifies the local working tree, not a deployed revision. Credential-pattern checks cannot establish that every possible secret format is absent.

### Items remaining after the initial review

**The initial full dependency audit was nonzero.** Three legacy lint plugins required `minimatch` 3.1.5's callable export and `makeRe`, preventing a direct v11 substitution. The advisory database flagged all versions below 11.0.1, although the described preprocessing mechanism was absent from v3. No ignore flag, audit suppression, or weakened CI gate was added. The follow-up below removes these legacy copies by adapting the plugins to the current API.

**Next.js has announced an additional security release.** The [27 October advance notice](https://nextjs.org/blog/upcoming-nextjs-security-release-november-2026) schedules seven medium-severity fixes for 3 November. At the final check, the registry's latest Next.js and ESLint config were 16.4.4; the [16.4.4 release notes](https://github.com/vercel/next.js/releases/tag/v16.4.4) explicitly say that 2 November maintenance release precedes the security release. Full November advisories and an identified patched version were not yet available in the sources checked. The repository therefore remains on 16.4.3; no claim is made that today's pending issues are fixed or inapplicable. Once published, assess the advisories, update Next.js and its ESLint config together, then rerun verification before release.

Live Vercel firewall, runtime, environment, trusted-IP and disconnect propagation, account access, and existing production state were not verified. Redis/provider behavior used local fixtures; the optional real-Redis integration suite was not run in this review. The five-pass local result is complete, but production security certification remains open under the release procedure above.

### Audit remediation follow-up: 3 November 2026

The remaining audit alert is resolved. A global `minimatch: 11.0.4` override replaces all legacy copies, with exact-version Bun patches for `eslint-plugin-import` 2.32.0, `eslint-plugin-react` 7.37.5, and `eslint-plugin-jsx-a11y` 6.10.2. The patches update 14 distributed JavaScript files to the named matching API; the import plugin's removed `makeRe` use becomes cached `Minimatch.match` calls. All six installed consumers resolve 11.0.4, and the lockfile contains no older minimatch version. Audit remains the unmodified `bun audit` command, and every lint rule remains configured as before.

Expanded lint fixtures passed on both the original plugins and the patched installation, checking file selection, scoped and resolved imports, allow/forbid rules, restricted-path exceptions, React ignore globs, and accessibility control globs. The optional `no-internal-modules` rule now follows standard matcher dotfile semantics; it is not enabled in the portfolio configuration. See [patch maintenance and compatibility scope](patches/README.md) before changing its patterns or upgrading these plugins.

Verification passed with Node 24.22.1 and Bun 1.4.4: the full audit found no known vulnerabilities across 622 packages; `bun run check` passed lint, compatibility fixtures, install-policy fixtures, type checks, all 24 tests, and the production build; all 16 desktop/mobile browser tests passed. A separate temporary project installed the frozen lockfile from an empty dependency cache with lifecycle scripts disabled, applied all three patches, left the lockfile unchanged, and passed the same lint compatibility fixtures. Independent patch review found no missed matcher imports or manifest/lock mismatch.

Final local build ID: `-ukUHRREwVuxb_ooXCGU2`. Final lockfile SHA-256: `84ebc8eeda7c102857f86610d7a9fcc1ea39119f1998d71d333fdf835e21be47`. These replace the initial candidate identifiers above for this follow-up; no deployment was made.

At **12:36 p.m. Eastern on 3 November**, fresh npm registry requests and GitHub's release API still reported Next.js and `eslint-config-next` 16.4.4 as latest stable. Its [release notes](https://github.com/vercel/next.js/releases/tag/v16.4.4) explicitly precede the announced November security release. No identified stable security patch was available, so both repository pins remain 16.4.3. The pending Next.js advisory assessment and deployed-platform checks remain open; a clean package audit does not establish that unpublished issues are absent.
