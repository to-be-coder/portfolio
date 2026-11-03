# Lint dependency compatibility patches

The package override pins `minimatch` to 11.0.4. The following upstream releases still request its legacy 3.x API, so exact-version Bun patches adapt their distributed JavaScript:

- `eslint-plugin-import@2.32.0`: use the named matching function; change `no-internal-modules` from removed `makeRe()` calls to cached `Minimatch` instances and `.match()`.
- `eslint-plugin-react@7.37.5`: use the named matching function.
- `eslint-plugin-jsx-a11y@6.10.2`: use the named matching function.

The plugins, rule configuration, and `@eslint/compat` bridge remain in place. The matcher implementation comes from the maintained registry package. No audit exceptions or install lifecycle scripts are needed. Bun applies the patches through `patchedDependencies` during a frozen install with scripts disabled.

`no-internal-modules` is not enabled in the portfolio's configuration. If enabling it later, review allow/forbid patterns using v11 matcher semantics: dotfiles follow the normal glob rules, which differ in some cases from the old regular-expression conversion. Compatibility fixtures cover ordinary scoped-package, relative/resolved-path, allow/forbid, React, and accessibility rules; they do not promise identical behavior for every historical glob pattern.

When an upstream plugin release supports the current matcher, update it deliberately, remove its obsolete patch entry/file, and rerun the raw audit, lint compatibility fixtures, and full checks. Do not retain a patch for a different package version. Use `bun patch` before editing installed packages to keep the shared cache intact; regenerate with `bun patch --commit`.

References: [Minimatch advisory](https://github.com/isaacs/minimatch/security/advisories/GHSA-g3hv-75wg-m249), [Minimatch API](https://github.com/isaacs/minimatch#usage), [Bun patches](https://bun.com/docs/pm/cli/patch).
