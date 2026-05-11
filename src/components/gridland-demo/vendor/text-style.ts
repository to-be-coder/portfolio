// Vendored from @gridland/ui — packages/ui/lib/text-style.ts
const BOLD = 1 << 0
const DIM = 1 << 1
const ITALIC = 1 << 2
const UNDERLINE = 1 << 3
const INVERSE = 1 << 5

export function textStyle(opts: {
  fg?: string
  bg?: string
  bold?: boolean
  dim?: boolean
  italic?: boolean
  underline?: boolean
  inverse?: boolean
}): { fg?: string; bg?: string; attributes?: number } {
  let attributes = 0
  if (opts.bold) attributes |= BOLD
  if (opts.dim) attributes |= DIM
  if (opts.italic) attributes |= ITALIC
  if (opts.underline) attributes |= UNDERLINE
  if (opts.inverse) attributes |= INVERSE

  const result: { fg?: string; bg?: string; attributes?: number } = {}
  if (opts.fg) result.fg = opts.fg
  if (opts.bg) result.bg = opts.bg
  if (attributes) result.attributes = attributes
  return result
}
