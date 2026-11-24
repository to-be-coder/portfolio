# Dependency patches

## Lint plugin compatibility

The package override pins `minimatch` to 11.0.8. The following upstream releases still request its legacy 3.x API, so exact-version Bun patches adapt their distributed JavaScript:

- `eslint-plugin-import@2.32.0`: use the named matching function; change `no-internal-modules` from removed `makeRe()` calls to cached `Minimatch` instances and `.match()`.
- `eslint-plugin-react@7.37.5`: use the named matching function.
- `eslint-plugin-jsx-a11y@6.10.2`: use the named matching function.

The plugins, rule configuration, and `@eslint/compat` bridge remain in place. The matcher implementation comes from the maintained registry package. No audit exceptions or install lifecycle scripts are needed. Bun applies the patches through `patchedDependencies` during a frozen install with scripts disabled.

`no-internal-modules` is not enabled in the portfolio's configuration. If enabling it later, review allow/forbid patterns using v11 matcher semantics: dotfiles follow the normal glob rules, which differ in some cases from the old regular-expression conversion. Compatibility fixtures cover ordinary scoped-package, relative/resolved-path, allow/forbid, React, and accessibility rules; they do not promise identical behavior for every historical glob pattern.

When an upstream plugin release supports the current matcher, update it deliberately, remove its obsolete patch entry/file, and rerun the raw audit, lint compatibility fixtures, and full checks. Do not retain a patch for a different package version. Use `bun patch` before editing installed packages to keep the shared cache intact; regenerate with `bun patch --commit`.

References: [Minimatch advisory](https://github.com/isaacs/minimatch/security/advisories/GHSA-g3hv-75wg-m249), [Minimatch API](https://github.com/isaacs/minimatch#usage), [Bun patches](https://bun.com/docs/pm/cli/patch).

## Markdown parser backports

Streamdown resolves Marked 18.3.0, including the [18.1.0 Unicode-whitespace fix](https://github.com/markedjs/marked/commit/0d2022025d3cd44750a3ffbb77e2da60635589ee), the [18.1.3 parser hardening](https://github.com/markedjs/marked/releases/tag/v18.1.3), and the [18.2.1 unmatched-run follow-up](https://github.com/markedjs/marked/releases/tag/v18.2.1). Gridland 0.4.3 still declares Marked 17.x, whose latest release is 17.0.6, and also embeds Marked 15.0.12 in its published browser bundles. Neither older line has an upstream release containing these fixes.

Two exact-version Bun patches preserve the older APIs while adapting these upstream changes:

- Restrict the whitespace gaps around inline link destinations to ASCII space, tab, and newline ([0d20220](https://github.com/markedjs/marked/commit/0d2022025d3cd44750a3ffbb77e2da60635589ee)).
- Avoid repeatedly scanning the rest of the input for unmatched emphasis delimiters ([eab1e48](https://github.com/markedjs/marked/commit/eab1e483fe88e559288d3003d493bbc0ec4ecf53)). Closer hints belong to a tokenizer's active inline pass, support nested parsing, and are removed in a `finally` block.
- Batch unmatched asterisk/underscore runs instead of rescanning their greedy opener expressions one character at a time ([0b8b3b3](https://github.com/markedjs/marked/commit/0b8b3b33863822681a1cb5a365baec684c368230)). Both older parsers already batch tilde runs in their text tokenizer, so their new fast path handles only asterisks/underscores and retains the existing strikethrough logic, including Marked 15's raw-source guard. The last character remains on the original tokenizer path; underscore previous-character behavior and email handling are preserved.
- Remove overlapping trailing-whitespace alternatives from the pedantic HTML rules ([2d4a23c](https://github.com/markedjs/marked/commit/2d4a23c50e5c4fe64de67762d19a0c9741a811d4)).
- Use maps without inherited prototype properties for registered extension renderers and child-token names ([5cb03bd](https://github.com/markedjs/marked/commit/5cb03bd)).
- Consume a plain email-local-part run at once when followed by `@`, avoiding repeated failed email lookaheads ([c6b22e89](https://github.com/markedjs/marked/commit/c6b22e89)). The fast path precedes each older GFM text rule; existing underscore, delimiter, and valid-email behavior remains on its original tokenizer paths.
- Stop bare link destinations at an unmatched closing parenthesis rather than rescanning subsequent adjacent links ([f5ffd221](https://github.com/markedjs/marked/commit/f5ffd221ba5fc7f077d867ac2fc3f7a06855da94)). The released balanced-parenthesis destination expression is expanded into the older runtime rule, while preserving each older label/title grammar.
- Require an own property before invoking a renderer supplied through parser options ([c572307](https://github.com/markedjs/marked/commit/c57230757e32a2b27c4bc75b1274b25e379fd465)). This supplements the registration-map protection: directly supplied renderer maps may still inherit properties. Explicit own renderers remain supported.

`marked@17.0.6` patches its ESM and UMD runtime entrypoints. `@gridland/web@0.4.3` patches its embedded parsers in `dist/index.js` and `dist/next.js`. These are locally maintained backports, not upstream fixed releases. The three 18.3.0 backports do not add its unrelated lexer-state API or rewrite the older parser APIs. As in upstream 18.3.0, bare destinations support up to three balanced parenthesis levels; deeper literal destinations should use angle brackets or escaped parentheses. The generated source maps remain upstream artifacts; the runtime patches are the authority for the changed code.

The local run-skipping backports apply only to the standard tokenizer without custom inline extensions or masking hooks. Custom tokenizer methods and extension start positions retain their original per-position dispatch; the default-grammar resource bounds do not promise bounded custom extension code. New batch tokens preserve raw-HTML escaping state; merging retains the original text token's flag, matching the older inlineText behavior. The upstream 18.2.1 fast path does not provide these custom-dispatch/raw-HTML compatibility protections. The application does not register custom Marked tokenizers, and Streamdown's inspected use is a default-GFM block-tokenization pass for link definitions, so that upstream difference has no identified application regression.

The portfolio currently uses Gridland only for its fixed multi-select demo. That demo does not expose its embedded Markdown parser; the backports keep the distributed dependency hardened. The application does not enable Marked's pedantic mode or let requests register parser extensions.

`bun run test:dependency-security` exercises the installed parsers with bounded adversarial inputs, ordinary Markdown, nested parsing, custom tokenizer dispatch, and extension behavior. Whole-run fixtures exercise 60,000-character runs both initially and after text under an external five-second deadline and 256 MiB child heap limit. Additional fixtures cover a 100,000-character failed email prefix, 40,000 adjacent links, three-level/escaped/empty destinations, and inherited versus own renderers through both public parser entrypoints. The Streamdown fixtures exercise its public CSV/TSV/Markdown exports for formula neutralization, carriage-return handling, and fail-fast export budgets, alongside Remend nested-bracket repair and bare-URL preservation. It runs in `bun run check` and CI. When Gridland supports and ships a fixed parser, update it, remove obsolete patch entries/files, and rerun those checks. Do not carry a patch to another package version without reviewing its source.


## PostCSS resolution

PostCSS has an exact 8.5.32 override so Next resolves the same supported patched release as the root package. Its [symlink-aware source-map boundary fix](https://github.com/postcss/postcss/blob/main/CHANGELOG.md#8526) is checked through both consumers by `tests/postcss-dependency-security.test.ts`: local maps and allowed symlinks load, while symlinks escaping the real CSS directory do not.

## Unresolved Next.js bundled matcher

Next.js 16.4.5 embeds glob 7.1.7, minimatch 3.1.2, and brace-expansion 1.1.11 in `dist/compiled/glob/glob.js`. The top-level minimatch override cannot replace code already bundled into that file. The checked Next 16.4.6 source retains the same old matcher dependency versions, so that release does not close this gap.

An isolated attempt to replace the embedded matcher with legacy minimatch 3.1.5 and brace-expansion 1.1.22 still exceeded a five-second external deadline for nested extglobs. The maintainer also [warns that legacy JavaScript-regexp matching cannot safely accept arbitrary untrusted patterns](https://github.com/isaacs/minimatch/commit/bd259425b2ca). No Next patch or matcher alias is included in this release candidate. The attempted patch and all five tests, including the failing case, are preserved separately on the local `codex/security-next-glob-review` branch for further review.

Applicable advisories include [nested-extglob](https://github.com/isaacs/minimatch/security/advisories/GHSA-23c5-xmqv-rm74), [globstar](https://github.com/isaacs/minimatch/security/advisories/GHSA-7r86-cg39-jmmj), [repeated-wildcard](https://github.com/isaacs/minimatch/security/advisories/GHSA-3ppc-4f35-3m26), and [brace-expansion](https://github.com/juliangruber/brace-expansion/security/advisories/GHSA-6jwq-xf8q-xcwh) resource exhaustion. Reviewed uses in this app's framework are build/development operations with project/configuration patterns; no request-derived glob input was found. That limits exposure but does not mean the bundled packages are fixed. Future reviews must check both the installed bundle and the adversarial behavior, not only registry versions or the audit result.
