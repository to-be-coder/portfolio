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

Streamdown resolves Marked 18.1.3, including the [18.1.0 Unicode-whitespace fix](https://github.com/markedjs/marked/commit/0d2022025d3cd44750a3ffbb77e2da60635589ee) and the [18.1.3 parser hardening](https://github.com/markedjs/marked/releases/tag/v18.1.3). Gridland 0.4.3 still declares Marked 17.x, whose latest release is 17.0.6, and also embeds Marked 15.0.12 in its published browser bundles. Neither older line has an upstream release containing these fixes.

Two exact-version Bun patches preserve the older APIs while adapting these upstream changes:

- Restrict the whitespace gaps around inline link destinations to ASCII space, tab, and newline ([0d20220](https://github.com/markedjs/marked/commit/0d2022025d3cd44750a3ffbb77e2da60635589ee)).
- Avoid repeatedly scanning the rest of the input for unmatched emphasis delimiters ([eab1e48](https://github.com/markedjs/marked/commit/eab1e483fe88e559288d3003d493bbc0ec4ecf53)). Closer hints belong to a tokenizer's active inline pass, support nested parsing, and are removed in a `finally` block.
- Remove overlapping trailing-whitespace alternatives from the pedantic HTML rules ([2d4a23c](https://github.com/markedjs/marked/commit/2d4a23c50e5c4fe64de67762d19a0c9741a811d4)).
- Use maps without inherited prototype properties for registered extension renderers and child-token names ([5cb03bd](https://github.com/markedjs/marked/commit/5cb03bd)).

`marked@17.0.6` patches its ESM and UMD runtime entrypoints. `@gridland/web@0.4.3` patches its embedded parsers in `dist/index.js` and `dist/next.js`. These are locally maintained backports, not upstream fixed releases. The generated source maps remain upstream artifacts; the runtime patches are the authority for the changed code.

The portfolio currently uses Gridland only for its fixed multi-select demo. That demo does not expose its embedded Markdown parser; the backports keep the distributed dependency hardened. The application does not enable Marked's pedantic mode or let requests register parser extensions.

`bun run test:dependency-security` exercises the installed parsers with bounded adversarial inputs, ordinary Markdown, nested parsing, and extension behavior. It runs in `bun run check` and CI. When Gridland supports and ships a fixed parser, update it, remove obsolete patch entries/files, and rerun those checks. Do not carry a patch to another package version without reviewing its source.


## PostCSS resolution

PostCSS has an exact 8.5.32 override so Next resolves the same supported patched release as the root package. Its [symlink-aware source-map boundary fix](https://github.com/postcss/postcss/blob/main/CHANGELOG.md#8526) is checked through both consumers by `tests/postcss-dependency-security.test.ts`: local maps and allowed symlinks load, while symlinks escaping the real CSS directory do not.

## Unresolved Next.js bundled matcher

Next.js 16.4.5 embeds glob 7.1.7, minimatch 3.1.2, and brace-expansion 1.1.11 in `dist/compiled/glob/glob.js`. The top-level minimatch override cannot replace code already bundled into that file. The checked Next 16.4.6 source retains the same old matcher dependency versions, so that release does not close this gap.

An isolated attempt to replace the embedded matcher with legacy minimatch 3.1.5 and brace-expansion 1.1.22 still exceeded a five-second external deadline for nested extglobs. The maintainer also [warns that legacy JavaScript-regexp matching cannot safely accept arbitrary untrusted patterns](https://github.com/isaacs/minimatch/commit/bd259425b2ca). No Next patch or matcher alias is included in this release candidate. The attempted patch and all five tests, including the failing case, are preserved separately on the local `codex/security-next-glob-review` branch for further review.

Applicable advisories include [nested-extglob](https://github.com/isaacs/minimatch/security/advisories/GHSA-23c5-xmqv-rm74), [globstar](https://github.com/isaacs/minimatch/security/advisories/GHSA-7r86-cg39-jmmj), [repeated-wildcard](https://github.com/isaacs/minimatch/security/advisories/GHSA-3ppc-4f35-3m26), and [brace-expansion](https://github.com/juliangruber/brace-expansion/security/advisories/GHSA-6jwq-xf8q-xcwh) resource exhaustion. Reviewed uses in this app's framework are build/development operations with project/configuration patterns; no request-derived glob input was found. That limits exposure but does not mean the bundled packages are fixed. Future reviews must check both the installed bundle and the adversarial behavior, not only registry versions or the audit result.
