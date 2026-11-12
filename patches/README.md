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

Marked 18.1.0 includes [upstream commit 0d20220](https://github.com/markedjs/marked/commit/0d2022025d3cd44750a3ffbb77e2da60635589ee), which prevents cubic backtracking on Unicode whitespace in inline link destinations. Streamdown already resolves the patched 18.1.2 release. Gridland 0.4.3 still declares Marked 17.x, whose latest release is 17.0.6, and also embeds an older Marked parser in its published browser bundles.

Two exact-version patches backport the same narrow expression change: the whitespace gaps before and after the link destination accept ASCII space, tab, and newline instead of the broader JavaScript whitespace class. They preserve each parser's existing label, destination, and title expressions and public API.

- `marked@17.0.6`: patch the ESM and UMD runtime entrypoints.
- `@gridland/web@0.4.3`: patch the embedded parser in `dist/index.js` and `dist/next.js`.

The portfolio currently uses Gridland only for its fixed multi-select demo. Its embedded Markdown parser is not exposed by that demo; the patch keeps the distributed dependency hardened. The generated source maps remain upstream artifacts; the runtime patches are the authority for this expression.

`bun run test:dependency-security` checks bounded adversarial parsing and ordinary Markdown behavior against the installed parsers. It runs in `bun run check` and CI. When Gridland supports and ships a fixed parser, update it, remove obsolete patch entries/files, and rerun those checks. Do not carry a patch to another package version without reviewing its source.
