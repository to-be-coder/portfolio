'use client'

import CtaSection from '@/components/ui-block/cta'
import { ScrollSpy, ScrollSpyLink, ScrollSpyNav, ScrollSpySection, ScrollSpyViewport } from '@/components/ui/scroll-spy'
import Image from 'next/image'

const DEFAULT_METADATA = {
  title: 'Building Design Tokens: From Figma to Code',
  author: 'Jessica Cheng',
  profileImage: '/profile-small.jpg',
} as const

// Simple static code block component
function CodeBlock({ code, language = 'typescript' }: { code: string; language?: string }) {
  return (
    <div className="my-6 w-full">
      <pre className="relative rounded-md p-4 bg-gray-900 text-gray-100 overflow-x-auto text-sm">
        <code className={`language-${language}`}>{code.trim()}</code>
      </pre>
    </div>
  )
}

export default function DesignTokenBlogPage() {
  return (
    <main>
      <ScrollSpy offset={80} defaultValue="introduction" orientation="horizontal">
        <ScrollSpyNav className="top-[72px]">
          <ScrollSpyLink value="introduction" activeClassName="data-[state=active]:text-secondary">
            Introduction
          </ScrollSpyLink>
          <ScrollSpyLink value="what-are-tokens" activeClassName="data-[state=active]:text-secondary">
            What Are Tokens
          </ScrollSpyLink>
          <ScrollSpyLink value="why-tokens" activeClassName="data-[state=active]:text-secondary">
            Why They Matter
          </ScrollSpyLink>
          <ScrollSpyLink value="when-to-use" activeClassName="data-[state=active]:text-secondary">
            When to Use
          </ScrollSpyLink>
          <ScrollSpyLink value="token-hierarchy" activeClassName="data-[state=active]:text-secondary">
            Token Hierarchy
          </ScrollSpyLink>
          <ScrollSpyLink value="token-categories" activeClassName="data-[state=active]:text-secondary">
            Token Categories
          </ScrollSpyLink>
          <ScrollSpyLink value="naming-convention" activeClassName="data-[state=active]:text-secondary">
            Naming Convention
          </ScrollSpyLink>
          <ScrollSpyLink value="figma-setup" activeClassName="data-[state=active]:text-secondary">
            Figma Setup
          </ScrollSpyLink>
          <ScrollSpyLink value="implementing" activeClassName="data-[state=active]:text-secondary">
            Implementing in Code
          </ScrollSpyLink>
          <ScrollSpyLink value="components" activeClassName="data-[state=active]:text-secondary">
            Components
          </ScrollSpyLink>
          <ScrollSpyLink value="best-practices" activeClassName="data-[state=active]:text-secondary">
            Best Practices
          </ScrollSpyLink>

          <ScrollSpyLink value="conclusion" activeClassName="data-[state=active]:text-secondary">
            Conclusion
          </ScrollSpyLink>
        </ScrollSpyNav>

        <ScrollSpyViewport>
          <section className="container mx-auto px-4 py-2 max-w-3xl">
            {/* Article Header */}
            <div className="my-12 px-6">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-black">{DEFAULT_METADATA.title}</h1>

              <div className="border-b border-gray-200 w-full" />

              <div className="flex items-center gap-2 mt-3">
                <Image src={DEFAULT_METADATA.profileImage} alt={DEFAULT_METADATA.author} width={30} height={30} className="rounded-full object-cover aspect-square" />
                <p className="text-sm text-gray-500">{DEFAULT_METADATA.author}</p>
              </div>
            </div>

            {/* Blog Content */}
            <article className="prose prose-lg max-w-none px-6">
              <ScrollSpySection value="introduction">
                <p className="text-lg text-gray-700 leading-relaxed">
                  Design tokens bridge the gap between design and development. They&apos;re the systematic approach that ensures your product looks consistent everywhere—from your design files to
                  production code across web, iOS, and Android.
                </p>

                <p className="text-lg text-gray-700 leading-relaxed">
                  This guide shows you how to build and implement design tokens using Figma Variables, then translate them into code with Next.js, TypeScript, and Tailwind CSS.
                </p>
              </ScrollSpySection>

              <hr className="my-12 border-gray-200" />

              {/* What Are Design Tokens */}
              <ScrollSpySection value="what-are-tokens">
                <h2 className="text-3xl font-bold mt-12 mb-6 text-black">What Are Design Tokens?</h2>

                <p className="text-lg text-gray-700 leading-relaxed">
                  Design tokens are <strong>named variables that store design decisions</strong>—colors, spacing, typography, shadows, and more. They act as a single source of truth for your design
                  system&apos;s visual properties.
                </p>

                <p className="text-lg text-gray-700 leading-relaxed">
                  <strong>Here&apos;s the problem they solve:</strong>
                </p>

                <p className="text-lg text-gray-700 leading-relaxed">
                  Imagine you&apos;re designing a success state. You have dozens of green shades to choose from: <code className="bg-gray-100 px-2 py-1 rounded text-sm">#10B981</code>,{' '}
                  <code className="bg-gray-100 px-2 py-1 rounded text-sm">#059669</code>, <code className="bg-gray-100 px-2 py-1 rounded text-sm">#22C55E</code>,{' '}
                  <code className="bg-gray-100 px-2 py-1 rounded text-sm">#16A34A</code>... which one represents &quot;success&quot; in your product? Different designers might pick different greens.
                  Developers might use yet another shade they find in the codebase. Suddenly, you have 5 different &quot;success greens&quot; scattered across your app.
                </p>

                <p className="text-lg text-gray-700 leading-relaxed">
                  <strong>With design tokens, you use one consistent name instead:</strong>
                </p>

                <CodeBlock
                  language="css"
                  code={`/* ❌ Without tokens - inconsistent, hard-coded values */
.success-icon { color: #10B981; }
.success-badge { background: #22C55E; }
.success-button { background: #059669; }

/* ✅ With tokens - consistent hierarchy */
/* 1. Primitive/Reference Token - the actual color value */
--green-500: #10B981;

/* 2. Semantic Token - references the primitive */
--color-status-success: var(--green-500);

/* 3. Component Usage - uses the semantic token */
.success-icon { color: var(--color-status-success); }
.success-badge { background: var(--color-status-success); }
.success-button { background: var(--color-status-success); }`}
                />

                <p className="text-lg text-gray-700 leading-relaxed">
                  Instead of choosing from endless options every time, you apply <code className="bg-gray-100 px-2 py-1 rounded text-sm">color-status-success</code>, which references{' '}
                  <code className="bg-gray-100 px-2 py-1 rounded text-sm">green-500</code>, which holds the actual color value <code className="bg-gray-100 px-2 py-1 rounded text-sm">#10B981</code>.
                  This three-tier system ensures consistency across every component, every screen, and every platform. When your brand evolves and that green needs to change, you update one primitive
                  token value—and it cascades through all semantic tokens and components automatically.
                </p>
              </ScrollSpySection>

              <hr className="my-12 border-gray-200" />

              {/* Why Design Tokens Matter */}
              <ScrollSpySection value="why-tokens">
                <h2 className="text-3xl font-bold mt-12 mb-6 text-black">Why Design Tokens Matter</h2>

                <p className="text-lg text-gray-700 leading-relaxed">Design tokens solve real problems for product teams:</p>

                <h3 className="text-2xl font-bold mt-10 mb-4 text-black">Consistency at Scale</h3>
                <p className="text-lg text-gray-700 leading-relaxed">
                  The same design values are used across all platforms, products, and teams. No more visual inconsistencies or &quot;close enough&quot; colors.
                </p>

                <h3 className="text-2xl font-bold mt-10 mb-4 text-black">Faster Development</h3>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Developers use pre-defined values instead of making design decisions in code. Components ship faster with fewer design review cycles.
                </p>

                <h3 className="text-2xl font-bold mt-10 mb-4 text-black">Effortless Updates</h3>
                <p className="text-lg text-gray-700 leading-relaxed">Rebrand your entire product by updating a handful of token values. What used to take weeks now takes minutes.</p>

                <h3 className="text-2xl font-bold mt-10 mb-4 text-black">Multi-Platform Support</h3>
                <p className="text-lg text-gray-700 leading-relaxed">Define once, use everywhere. Your tokens work on web, iOS, Android, and any future platform.</p>

                <h3 className="text-2xl font-bold mt-10 mb-4 text-black">Theming Built-In</h3>
                <p className="text-lg text-gray-700 leading-relaxed">Switch between light mode, dark mode, or brand variations by swapping token values—no component changes needed.</p>
              </ScrollSpySection>

              <hr className="my-12 border-gray-200" />

              {/* When to Use Design Tokens */}
              <ScrollSpySection value="when-to-use">
                <h2 className="text-3xl font-bold mt-12 mb-6 text-black">When to Use Design Tokens</h2>

                <p className="text-lg text-gray-700 leading-relaxed">Design tokens are most valuable when:</p>

                <ul className="list-disc pl-6 space-y-2 text-lg text-gray-700">
                  <li>You&apos;re building products across multiple platforms (web, iOS, Android)</li>
                  <li>Your product needs theming (dark mode, brand variations, white-labeling)</li>
                  <li>Multiple teams work on the same product</li>
                  <li>You plan to scale or evolve your design system</li>
                  <li>Design-to-development handoff takes too long</li>
                  <li>You&apos;re experiencing visual inconsistencies across your product</li>
                </ul>

                <p className="text-lg text-gray-700 leading-relaxed mt-6">Design tokens might be less critical if:</p>

                <ul className="list-disc pl-6 space-y-2 text-lg text-gray-700">
                  <li>You&apos;re building a single, small application with no plans to scale</li>
                  <li>Your design won&apos;t change for several years</li>
                  <li>You&apos;re working solo with full design and development control</li>
                </ul>
              </ScrollSpySection>

              <hr className="my-12 border-gray-200" />

              {/* Understanding Token Hierarchy */}
              <ScrollSpySection value="token-hierarchy">
                <h2 className="text-3xl font-bold mt-12 mb-6 text-black">Understanding Token Hierarchy</h2>

                <p className="text-lg text-gray-700 leading-relaxed">
                  Professional design systems organize tokens in three tiers. This structure enables flexibility, theming, and clear communication between designers and developers.
                </p>

                <h3 className="text-2xl font-bold mt-10 mb-4 text-black">Tier 1: Reference Tokens (Primitives)</h3>
                <p className="text-lg text-gray-700 leading-relaxed">Raw values with no context—your palette of options.</p>

                <CodeBlock
                  language="typescript"
                  code={`blue500: '#3B82F6'
space16: '1rem'
fontWeightBold: 700`}
                />

                <p className="text-lg text-gray-700 leading-relaxed">
                  <strong>Think of these as:</strong> Your ingredients—flour, sugar, eggs.
                </p>

                <h3 className="text-2xl font-bold mt-10 mb-4 text-black">Tier 2: Semantic Tokens</h3>
                <p className="text-lg text-gray-700 leading-relaxed">Meaningful names that reference primitives, conveying purpose.</p>

                <CodeBlock
                  language="typescript"
                  code={`colorPrimary: primitives.blue500
spacingMedium: primitives.space16
textHeadingWeight: primitives.fontWeightBold`}
                />

                <p className="text-lg text-gray-700 leading-relaxed">
                  <strong>Think of these as:</strong> Your recipe—&quot;sugar for sweetness,&quot; not just &quot;sugar.&quot;
                </p>

                <h3 className="text-2xl font-bold mt-10 mb-4 text-black">Tier 3: Component Tokens</h3>
                <p className="text-lg text-gray-700 leading-relaxed">Component-specific tokens that reference semantic tokens.</p>

                <CodeBlock
                  language="typescript"
                  code={`buttonBackground: semantic.colorPrimary
buttonPadding: semantic.spacingMedium
buttonTextWeight: semantic.textHeadingWeight`}
                />

                <p className="text-lg text-gray-700 leading-relaxed">
                  <strong>Think of these as:</strong> The finished dish—cake made from your recipe.
                </p>

                <h3 className="text-2xl font-bold mt-10 mb-4 text-black">Why This Structure Matters</h3>

                <CodeBlock
                  language="text"
                  code={`Component → Semantic → Primitive
    ↓          ↓          ↓
button-bg → primary → blue-500`}
                />

                <p className="text-lg text-gray-700 leading-relaxed">
                  Change <code className="bg-gray-100 px-2 py-1 rounded text-sm">blue-500</code> to a new shade, and everything cascades. For dark mode, reassign semantic tokens:
                </p>

                <CodeBlock
                  language="typescript"
                  code={`// Light mode
colorPrimary: blue500

// Dark mode  
colorPrimary: blue200  // Lighter blue for dark backgrounds`}
                />

                <p className="text-lg text-gray-700 leading-relaxed">Components stay the same—only the semantic layer shifts. This is how tokens enable theming.</p>
              </ScrollSpySection>

              <hr className="my-12 border-gray-200" />

              {/* Token Categories */}
              <ScrollSpySection value="token-categories">
                <h2 className="text-3xl font-bold mt-12 mb-6 text-black">Token Categories</h2>

                <p className="text-lg text-gray-700 leading-relaxed">
                  Tailwind CSS provides a comprehensive default theme with well-designed token categories. Your design tokens will override or extend these foundations. Focus on customizing only what
                  makes your brand unique.
                </p>

                <h3 className="text-2xl font-bold mt-10 mb-4 text-black">Colors</h3>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Color tokens define your product&apos;s visual identity and communicate meaning. Organize colors into scales with multiple shades for each hue:
                </p>

                <ul className="list-disc pl-6 space-y-3 text-lg text-gray-700 mt-4">
                  <li>
                    <strong>Brand Colors:</strong> Your primary brand color used for buttons, links, focus states, and key actions. Include lighter shades for backgrounds and hover states, darker
                    shades for active states and emphasis. Typically you&apos;ll need 8-11 shades from lightest to darkest
                  </li>
                  <li>
                    <strong>Neutral Colors:</strong> Gray scale for text (headings, body copy, captions), backgrounds (page, cards, surfaces), borders (dividers, inputs, outlines), and disabled
                    states. A complete neutral scale is essential for establishing visual hierarchy
                  </li>
                  <li>
                    <strong>Semantic Colors:</strong> Communicate status and meaning—green for success messages and confirmations, red for errors and destructive actions, yellow for warnings and
                    cautions, blue for informational messages. Each should include multiple shades for backgrounds, borders, and text
                  </li>
                  <li>
                    <strong>Secondary Colors:</strong> Optional accent colors for variety in illustrations, charts, badges, or secondary actions. Use sparingly to avoid overwhelming your primary brand
                    color
                  </li>
                </ul>

                <p className="text-lg text-gray-700 leading-relaxed mt-4">
                  <strong>Color scale tip:</strong> Define complete scales (50-950 or similar) for each color. Light shades work for backgrounds and subtle states, mid-range shades for primary uses,
                  and dark shades for emphasis and dark mode. Incomplete scales force designers to improvise, breaking consistency across your product.
                </p>

                <h3 className="text-2xl font-bold mt-10 mb-4 text-black">Spacing</h3>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Tailwind uses a <strong>4px base unit system</strong> where spacing values are multiples of 4 (0, 4px, 8px, 12px, 16px, 24px, 32px...). This creates visual rhythm and makes layouts
                  feel cohesive. The scale includes fractional values (0.5 = 2px, 1.5 = 6px) for fine-tuning when needed.
                </p>

                <p className="text-lg text-gray-700 leading-relaxed mt-4">
                  <strong>Spacing controls:</strong>
                </p>
                <ul className="list-disc pl-6 space-y-2 text-lg text-gray-700">
                  <li>Padding and margins inside and around components</li>
                  <li>Gaps between flex and grid items</li>
                  <li>Width and height of elements</li>
                  <li>Positioning offsets (top, right, bottom, left)</li>
                </ul>

                <p className="text-lg text-gray-700 leading-relaxed mt-4">
                  <strong>Best practice:</strong> Stick to Tailwind&apos;s default spacing scale. It&apos;s been refined through thousands of real projects. Only customize if your brand absolutely
                  requires different spacing ratios.
                </p>

                <h3 className="text-2xl font-bold mt-10 mb-4 text-black">Typography</h3>
                <p className="text-lg text-gray-700 leading-relaxed">Typography tokens define how text looks and feels across your product. Tailwind organizes this into four key areas:</p>

                <ul className="list-disc pl-6 space-y-3 text-lg text-gray-700 mt-4">
                  <li>
                    <strong>Font Families:</strong> Define your primary sans-serif (for UI), serif (for content-heavy pages), and monospace (for code) fonts. Include system fallbacks for performance
                  </li>
                  <li>
                    <strong>Font Sizes:</strong> A scale from xs (12px) to 9xl (128px) with proportional line heights. Each size is designed to work at specific use cases—body text, headings,
                    captions, displays
                  </li>
                  <li>
                    <strong>Font Weights:</strong> From thin (100) to black (900), though most projects only need normal (400), medium (500), semibold (600), and bold (700)
                  </li>
                  <li>
                    <strong>Line Heights:</strong> Control vertical spacing within text blocks. Tight line heights for headings, relaxed for body text, and loose for accessibility
                  </li>
                </ul>

                <p className="text-lg text-gray-700 leading-relaxed mt-4">
                  <strong>Typography tip:</strong> Choose fonts that support all the weights you&apos;ll use. Avoid using more than 3 font weights in your system—it creates visual noise.
                </p>

                <h3 className="text-2xl font-bold mt-10 mb-4 text-black">Border Radius</h3>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Border radius controls how rounded your corners are—from sharp rectangles (none) to perfect circles (full). Tailwind provides a scale from sm (2px) to 3xl (24px) that works for
                  buttons, cards, inputs, modals, and images.
                </p>

                <p className="text-lg text-gray-700 leading-relaxed mt-4">
                  <strong>Common uses:</strong>
                </p>
                <ul className="list-disc pl-6 space-y-2 text-lg text-gray-700">
                  <li>
                    <strong>Small (2-4px):</strong> Subtle rounding for buttons and inputs—professional and clean
                  </li>
                  <li>
                    <strong>Medium (6-8px):</strong> Cards, dropdowns, tooltips—noticeable but not overwhelming
                  </li>
                  <li>
                    <strong>Large (12-16px):</strong> Hero sections, large cards, modals—modern and friendly
                  </li>
                  <li>
                    <strong>Full (9999px):</strong> Pills, badges, avatars—always circular regardless of size
                  </li>
                </ul>

                <p className="text-lg text-gray-700 leading-relaxed mt-4">
                  <strong>Design decision:</strong> Pick 1-2 primary radius values and use them consistently. Mixing too many different radiuses makes your UI feel unpolished.
                </p>

                <h3 className="text-2xl font-bold mt-10 mb-4 text-black">Shadows</h3>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Shadows create depth and hierarchy by simulating how elements float above the page. Tailwind&apos;s shadow scale goes from sm (subtle) to 2xl (dramatic), with each level adding more
                  vertical distance and blur.
                </p>

                <p className="text-lg text-gray-700 leading-relaxed mt-4">
                  <strong>Shadow hierarchy:</strong>
                </p>
                <ul className="list-disc pl-6 space-y-2 text-lg text-gray-700">
                  <li>
                    <strong>Small:</strong> Barely noticeable—for cards that sit just above the surface
                  </li>
                  <li>
                    <strong>Medium:</strong> Standard elevation—for dropdowns, tooltips, and floating elements
                  </li>
                  <li>
                    <strong>Large:</strong> Clear separation—for modals, popovers, and important overlays
                  </li>
                  <li>
                    <strong>Extra large:</strong> Maximum depth—for dialogs that demand attention
                  </li>
                </ul>

                <p className="text-lg text-gray-700 leading-relaxed mt-4">
                  <strong>Shadow best practice:</strong> Use shadows sparingly. Too many elevated elements flatten the hierarchy. Reserve larger shadows for interactive elements (dropdowns, modals)
                  that need to stand out from the page.
                </p>

                <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mt-10">
                  <p className="text-lg text-gray-800 leading-relaxed">
                    <strong>💡 Smart Default Strategy:</strong> Tailwind&apos;s defaults are production-ready. Override <strong>colors</strong> (for your brand), <strong>typography</strong> (for your
                    fonts), and <strong>border radius</strong> (for your aesthetic). Leave spacing, shadows, and other categories as-is unless you have a specific design reason to change them.
                  </p>
                </div>
              </ScrollSpySection>

              <hr className="my-12 border-gray-200" />

              {/* Naming Convention */}
              <ScrollSpySection value="naming-convention">
                <h2 className="text-3xl font-bold mt-12 mb-6 text-black">Naming Convention</h2>
                <p className="text-lg text-gray-700 leading-relaxed">Use this proven pattern:</p>

                <CodeBlock language="text" code={`{category}/{property}/{variant}/{state}`} />

                <p className="text-lg text-gray-700 leading-relaxed">
                  <strong>Examples:</strong>
                </p>

                <CodeBlock
                  language="text"
                  code={`color/background/primary
color/text/secondary
color/status/error
spacing/component/padding
typography/heading/large`}
                />

                <p className="text-lg text-gray-700 leading-relaxed">
                  <strong>Best practices:</strong>
                </p>

                <ul className="list-disc pl-6 space-y-2 text-lg text-gray-700">
                  <li>
                    ✅ Use semantic names: <code className="bg-gray-100 px-2 py-1 rounded text-sm">color-primary</code> not <code className="bg-gray-100 px-2 py-1 rounded text-sm">blue</code>
                  </li>
                  <li>✅ Be consistent: kebab-case or camelCase, pick one</li>
                  <li>
                    ✅ Start with category: <code className="bg-gray-100 px-2 py-1 rounded text-sm">color/...</code>, <code className="bg-gray-100 px-2 py-1 rounded text-sm">spacing/...</code>
                  </li>
                  <li>
                    ❌ Avoid literal names: <code className="bg-gray-100 px-2 py-1 rounded text-sm">button-blue</code> (what if it changes?)
                  </li>
                </ul>
              </ScrollSpySection>

              <hr className="my-12 border-gray-200" />

              {/* Creating Tokens in Figma */}
              <ScrollSpySection value="figma-setup">
                <h2 className="text-3xl font-bold mt-12 mb-6 text-black">Creating Tokens in Figma</h2>

                <p className="text-lg text-gray-700 leading-relaxed">Figma Variables are built for design tokens. Here&apos;s how to set up a professional system.</p>

                <h3 className="text-2xl font-bold mt-10 mb-4 text-black">Setting Up Variable Collections</h3>

                <ol className="list-decimal pl-6 space-y-2 text-lg text-gray-700">
                  <li>Open your Figma file</li>
                  <li>Click the Variables icon (or use the local variables panel)</li>
                  <li>
                    Create collections for each category:
                    <ul className="list-disc pl-6 mt-2 space-y-1">
                      <li>
                        <strong>Colors</strong> (primitives + semantic)
                      </li>
                      <li>
                        <strong>Spacing</strong>
                      </li>
                      <li>
                        <strong>Typography</strong>
                      </li>
                      <li>
                        <strong>Borders</strong>
                      </li>
                      <li>
                        <strong>Shadows</strong>
                      </li>
                    </ul>
                  </li>
                </ol>

                <h3 className="text-2xl font-bold mt-10 mb-4 text-black">Creating Color Tokens</h3>

                <h4 className="text-xl font-semibold mt-8 mb-3 text-black">Step 1: Create Primitive Colors</h4>
                <p className="text-lg text-gray-700 leading-relaxed">
                  <strong>Collection:</strong> <code className="bg-gray-100 px-2 py-1 rounded text-sm">Primitives/Colors</code>
                </p>

                <CodeBlock
                  language="text"
                  code={`Blue/50   → #EFF6FF
Blue/500  → #3B82F6
Blue/900  → #1E3A8A

Gray/50   → #F9FAFB
Gray/500  → #6B7280
Gray/900  → #111827

Green/500 → #10B981
Red/500   → #EF4444`}
                />

                <h4 className="text-xl font-semibold mt-8 mb-3 text-black">Step 2: Create Semantic Colors</h4>
                <p className="text-lg text-gray-700 leading-relaxed">
                  <strong>Collection:</strong> <code className="bg-gray-100 px-2 py-1 rounded text-sm">Semantic/Colors</code>
                </p>

                <CodeBlock
                  language="text"
                  code={`Brand/Primary         → {Primitives.Blue.500}
Background/Primary    → {Primitives.Gray.50}
Text/Primary          → {Primitives.Gray.900}
Status/Success        → {Primitives.Green.500}`}
                />

                <div className="bg-blue-50 border-l-4 border-blue-500 p-4 my-6">
                  <p className="text-lg text-gray-700">
                    <strong>Pro tip:</strong> Use <code className="bg-white px-2 py-1 rounded text-sm">{'{variable-name}'}</code> syntax to reference other variables. This creates the hierarchy.
                  </p>
                </div>

                <h4 className="text-xl font-semibold mt-8 mb-3 text-black">Step 3: Enable Theming</h4>

                <ol className="list-decimal pl-6 space-y-2 text-lg text-gray-700">
                  <li>In your Semantic/Colors collection, add a mode</li>
                  <li>
                    Create <code className="bg-gray-100 px-2 py-1 rounded text-sm">Light</code> (default) and <code className="bg-gray-100 px-2 py-1 rounded text-sm">Dark</code> modes
                  </li>
                  <li>Assign different primitive values for each mode:</li>
                </ol>

                <CodeBlock
                  language="text"
                  code={`Light Mode:
Background/Primary → Gray.50
Text/Primary → Gray.900

Dark Mode:
Background/Primary → Gray.900
Text/Primary → Gray.50`}
                />

                <h3 className="text-2xl font-bold mt-10 mb-4 text-black">Exporting from Figma</h3>

                <h4 className="text-xl font-semibold mt-8 mb-3 text-black">Option 1: Native Export (Simple)</h4>
                <ol className="list-decimal pl-6 space-y-2 text-lg text-gray-700">
                  <li>
                    Variables panel → Click <strong>&quot;⋮&quot;</strong> menu
                  </li>
                  <li>Select &quot;Export variables&quot;</li>
                  <li>Save as JSON</li>
                </ol>

                <h4 className="text-xl font-semibold mt-8 mb-3 text-black">Option 2: Design Tokens Plugin (Recommended)</h4>
                <ol className="list-decimal pl-6 space-y-2 text-lg text-gray-700">
                  <li>Install &quot;Design Tokens&quot; plugin from Community</li>
                  <li>Select your collections</li>
                  <li>Export as JSON with Style Dictionary format</li>
                </ol>

                <h4 className="text-xl font-semibold mt-8 mb-3 text-black">Option 3: Tokens Studio (Advanced)</h4>
                <ul className="list-disc pl-6 space-y-2 text-lg text-gray-700">
                  <li>Sync directly to GitHub</li>
                  <li>Automate with CI/CD</li>
                  <li>Best for large teams</li>
                </ul>
              </ScrollSpySection>

              <hr className="my-12 border-gray-200" />

              {/* Implementing in Code */}
              <ScrollSpySection value="implementing">
                <h2 className="text-3xl font-bold mt-12 mb-6 text-black">Implementing in Code</h2>

                <p className="text-lg text-gray-700 leading-relaxed">
                  Now let&apos;s translate Figma tokens into your Next.js project with Tailwind CSS. The simplest and most maintainable approach is to define your design tokens directly in your CSS
                  using Tailwind&apos;s <code className="bg-gray-100 px-2 py-1 rounded text-sm">@theme</code> directive.
                </p>

                <h3 className="text-2xl font-bold mt-10 mb-4 text-black">Setting Up Your Token Hierarchy</h3>

                <p className="text-lg text-gray-700 leading-relaxed">Let&apos;s implement the three-tier token system in Tailwind CSS. Here&apos;s when to use each approach:</p>

                <div className="bg-blue-50 border-l-4 border-blue-500 p-6 my-6">
                  <ul className="space-y-2 text-gray-800">
                    <li>
                      <strong>Reference Tokens:</strong> Use <code className="bg-white px-2 py-1 rounded text-sm">@theme</code> to override Tailwind&apos;s defaults (e.g.,{' '}
                      <code className="bg-white px-2 py-1 rounded text-sm">--color-blue-500</code>)
                    </li>
                    <li>
                      <strong>Semantic Tokens:</strong> Use <code className="bg-white px-2 py-1 rounded text-sm">@layer base</code> with{' '}
                      <code className="bg-white px-2 py-1 rounded text-sm">theme()</code> function for custom names (e.g., <code className="bg-white px-2 py-1 rounded text-sm">--color-primary</code>)
                    </li>
                    <li>
                      <strong>Component Tokens:</strong> Use <code className="bg-white px-2 py-1 rounded text-sm">@layer base</code> to reference semantic/theme tokens (most projects skip this layer)
                    </li>
                  </ul>
                </div>

                <h4 className="text-xl font-semibold mt-8 mb-3 text-black">1. Reference Tokens (Override Tailwind Defaults)</h4>

                <p className="text-lg text-gray-700 leading-relaxed">
                  Use the <code className="bg-gray-100 px-2 py-1 rounded text-sm">@theme</code> directive to override Tailwind&apos;s default color scales, spacing, and typography. This is the
                  official approach from the{' '}
                  <a href="https://tailwindcss.com/docs/colors" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 underline">
                    Tailwind CSS documentation
                  </a>
                  .
                </p>

                <CodeBlock
                  language="css"
                  code={`/* globals.css */
@import "tailwindcss";

@theme {
  /* Reference Tokens - Your color palette */
  
  /* Blue scale - Primary brand color */
  --color-blue-50: #eff6ff;
  --color-blue-100: #dbeafe;
  --color-blue-200: #bfdbfe;
  --color-blue-300: #93c5fd;
  --color-blue-400: #60a5fa;
  --color-blue-500: #3b82f6;
  --color-blue-600: #2563eb;
  --color-blue-700: #1d4ed8;
  --color-blue-800: #1e40af;
  --color-blue-900: #1e3a8a;
  --color-blue-950: #172554;
  
  /* Gray scale - UI colors */
  --color-gray-50: #f9fafb;
  --color-gray-100: #f3f4f6;
  --color-gray-200: #e5e7eb;
  --color-gray-300: #d1d5db;
  --color-gray-400: #9ca3af;
  --color-gray-500: #6b7280;
  --color-gray-600: #4b5563;
  --color-gray-700: #374151;
  --color-gray-800: #1f2937;
  --color-gray-900: #111827;
  --color-gray-950: #030712;
}
`}
                />

                <p className="text-lg text-gray-700 leading-relaxed mt-4">
                  Now you can use these in Tailwind utilities with the full range of shades: <code className="bg-gray-100 px-2 py-1 rounded text-sm">bg-blue-500</code>,{' '}
                  <code className="bg-gray-100 px-2 py-1 rounded text-sm">text-gray-900</code>, <code className="bg-gray-100 px-2 py-1 rounded text-sm">border-blue-200</code>,{' '}
                  <code className="bg-gray-100 px-2 py-1 rounded text-sm">hover:bg-gray-800</code>, etc. Having complete scales (50-950) gives you flexibility for hover states, borders, and
                  backgrounds.
                </p>

                <h4 className="text-xl font-semibold mt-8 mb-3 text-black">2. Semantic Tokens (Custom CSS Properties)</h4>

                <p className="text-lg text-gray-700 leading-relaxed">
                  <strong>Important:</strong> Tailwind&apos;s <code className="bg-gray-100 px-2 py-1 rounded text-sm">@theme</code> directive only accepts specific token names (like{' '}
                  <code className="bg-gray-100 px-2 py-1 rounded text-sm">--color-blue-500</code>). For semantic tokens with custom names like{' '}
                  <code className="bg-gray-100 px-2 py-1 rounded text-sm">--color-primary</code>, use <code className="bg-gray-100 px-2 py-1 rounded text-sm">@layer base</code> with CSS custom
                  properties that reference your theme tokens via the <code className="bg-gray-100 px-2 py-1 rounded text-sm">theme()</code> function:
                </p>

                <CodeBlock
                  language="css"
                  code={`/* globals.css */
@import "tailwindcss";

@theme {
  /* Reference tokens with complete scales (shown above) */
  --color-blue-50: #eff6ff;
  --color-blue-500: #3b82f6;
  --color-blue-600: #2563eb;
  --color-blue-950: #172554;
  /* ... all shades from 50-950 */
}

/* Semantic Tokens - Use CSS custom properties */
@layer base {
  :root {
    /* Semantic color tokens */
    --color-primary: theme(colors.blue.500);
    --color-primary-hover: theme(colors.blue.600);
    --color-primary-light: theme(colors.blue.50);
    --color-primary-dark: theme(colors.blue.900);
    
    /* Semantic text colors */
    --color-text-primary: theme(colors.gray.900);
    --color-text-secondary: theme(colors.gray.600);
    --color-text-muted: theme(colors.gray.400);
    
    /* Semantic background colors */
    --color-bg-primary: theme(colors.gray.50);
    --color-bg-secondary: theme(colors.gray.100);
  }
  
  [data-theme="dark"] {
    /* Override semantic tokens for dark mode */
    --color-primary: theme(colors.blue.400);
    --color-text-primary: theme(colors.gray.50);
    --color-bg-primary: theme(colors.gray.900);
  }
}`}
                />

                <p className="text-lg text-gray-700 leading-relaxed mt-4">
                  These semantic tokens can be used with the <code className="bg-gray-100 px-2 py-1 rounded text-sm">var()</code> function in custom CSS or with Tailwind&apos;s arbitrary values:{' '}
                  <code className="bg-gray-100 px-2 py-1 rounded text-sm">bg-[var(--color-primary)]</code>. The <code className="bg-gray-100 px-2 py-1 rounded text-sm">theme()</code> function ensures
                  your semantic tokens always reference the correct values from your <code className="bg-gray-100 px-2 py-1 rounded text-sm">@theme</code> configuration.
                </p>

                <h4 className="text-xl font-semibold mt-8 mb-3 text-black">3. Component Tokens (Optional Layer)</h4>

                <p className="text-lg text-gray-700 leading-relaxed">
                  Component tokens follow the same pattern as semantic tokens—use <code className="bg-gray-100 px-2 py-1 rounded text-sm">@layer base</code> with the{' '}
                  <code className="bg-gray-100 px-2 py-1 rounded text-sm">theme()</code> function to reference your base or semantic tokens:
                </p>

                <CodeBlock
                  language="css"
                  code={`/* globals.css */
@import "tailwindcss";

@theme {
  /* Reference tokens */
  --color-blue-500: #3b82f6;
  --color-blue-600: #2563eb;
  /* ... */
}

/* Semantic Tokens */
@layer base {
  :root {
    --color-primary: theme(colors.blue.500);
    --color-primary-hover: theme(colors.blue.600);
  }
}

/* Component Tokens */
@layer base {
  :root {
    /* Button component tokens */
    --button-bg-primary: var(--color-primary);
    --button-bg-primary-hover: var(--color-primary-hover);
    --button-text-primary: theme(colors.white);
    --button-padding-x: theme(spacing.6);
    --button-padding-y: theme(spacing.2);
    --button-radius: theme(borderRadius.md);
    
    /* Card component tokens */
    --card-background: theme(colors.white);
    --card-padding: theme(spacing.6);
    --card-shadow: theme(boxShadow.lg);
  }
}`}
                />

                <p className="text-lg text-gray-700 leading-relaxed mt-4">
                  Use these with arbitrary values: <code className="bg-gray-100 px-2 py-1 rounded text-sm">bg-[var(--button-bg-primary)]</code>,{' '}
                  <code className="bg-gray-100 px-2 py-1 rounded text-sm">p-[var(--button-padding-x)]</code>. Notice how component tokens can reference semantic tokens (
                  <code className="bg-gray-100 px-2 py-1 rounded text-sm">var(--color-primary)</code>) or theme values directly (
                  <code className="bg-gray-100 px-2 py-1 rounded text-sm">theme(colors.white)</code>).
                </p>
              </ScrollSpySection>

              <hr className="my-12 border-gray-200" />

              {/* Building Components */}
              <ScrollSpySection value="components">
                <h2 className="text-3xl font-bold mt-12 mb-6 text-black">Building Components with Tokens</h2>

                <p className="text-lg text-gray-700 leading-relaxed">Here&apos;s a production-ready button component using design tokens:</p>

                <CodeBlock
                  language="typescript"
                  code={`// components/Button.tsx

import { cva, type VariantProps } from 'class-variance-authority';

const buttonVariants = cva(
  'inline-flex items-center justify-center font-semibold transition-colors',
  {
    variants: {
      variant: {
        primary: 'bg-blue-500 text-white hover:bg-blue-600 active:bg-blue-700',
        secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200 active:bg-gray-300',
        outline: 'border-2 border-blue-500 text-blue-600 hover:bg-blue-50',
        ghost: 'text-gray-700 hover:bg-gray-100 active:bg-gray-200',
      },
      size: {
        sm: 'text-sm px-3 py-1.5 rounded-md',
        md: 'text-sm px-6 py-2 rounded-md',
        lg: 'text-base px-8 py-3 rounded-lg',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

interface ButtonProps extends VariantProps<typeof buttonVariants> {
  children: React.ReactNode;
}

export function Button({ children, variant, size }: ButtonProps) {
  return (
    <button className={buttonVariants({ variant, size })}>
      {children}
    </button>
  );
}`}
                />

                <p className="text-lg text-gray-700 leading-relaxed mt-4">
                  The button component uses your reference tokens (<code className="bg-gray-100 px-2 py-1 rounded text-sm">bg-blue-500</code>,{' '}
                  <code className="bg-gray-100 px-2 py-1 rounded text-sm">hover:bg-blue-600</code>, <code className="bg-gray-100 px-2 py-1 rounded text-sm">active:bg-blue-700</code>) which
                  automatically pull from your <code className="bg-gray-100 px-2 py-1 rounded text-sm">@theme</code> configuration. Having complete color scales (50-950) makes it easy to create
                  different states and variants. Change those tokens once, and all buttons update automatically.
                </p>

                <p className="text-lg text-gray-700 leading-relaxed">
                  <strong>Usage:</strong>
                </p>

                <CodeBlock
                  language="tsx"
                  code={`<Button variant="primary" size="md">
  Primary Action
</Button>

<Button variant="secondary" size="md">
  Secondary Action
</Button>

<Button variant="outline" size="sm">
  Outline Button
</Button>

<Button variant="ghost" size="sm">
  Ghost Button
</Button>`}
                />
              </ScrollSpySection>

              <hr className="my-12 border-gray-200" />

              {/* Best Practices */}
              <ScrollSpySection value="best-practices">
                <h2 className="text-3xl font-bold mt-12 mb-6 text-black">Best Practices</h2>

                <h3 className="text-2xl font-bold mt-10 mb-4 text-black">Start Small</h3>
                <p className="text-lg text-gray-700 leading-relaxed">Begin with essentials:</p>
                <ul className="list-disc pl-6 space-y-2 text-lg text-gray-700">
                  <li>5-10 colors (brand, UI, status)</li>
                  <li>6-8 spacing values</li>
                  <li>Basic typography (sizes, weights)</li>
                </ul>
                <p className="text-lg text-gray-700 leading-relaxed">Expand as patterns emerge in your designs.</p>

                <h3 className="text-2xl font-bold mt-10 mb-4 text-black">Use Semantic Names</h3>
                <p className="text-lg text-gray-700 leading-relaxed">
                  ✅ <code className="bg-gray-100 px-2 py-1 rounded text-sm">color-primary</code>, <code className="bg-gray-100 px-2 py-1 rounded text-sm">color-success</code>
                  <br />❌ <code className="bg-gray-100 px-2 py-1 rounded text-sm">blue</code>, <code className="bg-gray-100 px-2 py-1 rounded text-sm">green</code>
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">Semantic names survive design changes. When your &quot;primary blue&quot; becomes purple, the token name still makes sense.</p>

                <h3 className="text-2xl font-bold mt-10 mb-4 text-black">Document Your Tokens</h3>
                <p className="text-lg text-gray-700 leading-relaxed">Create a simple reference:</p>
                <CodeBlock
                  language="markdown"
                  code={`## color-status-success

**Purpose:** Success states and positive feedback  
**Use case:** Success messages, checkmarks, positive indicators  
**WCAG:** AA compliant on white background`}
                />

                <h3 className="text-2xl font-bold mt-10 mb-4 text-black">Test Accessibility</h3>
                <p className="text-lg text-gray-700 leading-relaxed">Always verify color contrast:</p>
                <ul className="list-disc pl-6 space-y-2 text-lg text-gray-700">
                  <li>Text should meet WCAG AA (4.5:1) or AAA (7:1) standards</li>
                  <li>Use tools like WebAIM Contrast Checker</li>
                </ul>
              </ScrollSpySection>

              <hr className="my-12 border-gray-200" />

              {/* Conclusion */}
              <ScrollSpySection value="conclusion">
                <h2 className="text-3xl font-bold mt-12 mb-6 text-black">Conclusion</h2>

                <p className="text-lg text-gray-700 leading-relaxed">
                  Design tokens transform how teams build products. They eliminate inconsistencies, accelerate development, and make maintenance effortless by creating a single source of truth that
                  flows from design to code.
                </p>

                <p className="text-lg text-gray-700 leading-relaxed">
                  <strong>What I&apos;ve covered:</strong>
                </p>
                <ul className="list-disc pl-6 space-y-2 text-lg text-gray-700">
                  <li>What design tokens are and why they matter</li>
                  <li>How to create tokens in Figma Variables</li>
                  <li>How to implement tokens in Next.js with TypeScript and Tailwind CSS</li>
                  <li>Best practices for naming, organizing, and maintaining tokens</li>
                  <li>How to keep Figma and code in sync</li>
                </ul>

                <p className="text-lg text-gray-700 leading-relaxed font-semibold mt-8">
                  The result: A scalable design system that stays consistent automatically, empowering your team to build faster without sacrificing quality.
                </p>

                <div className="mt-12 p-6 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-500 italic">This guide covers the complete workflow from Figma to production code using Next.js, TypeScript, and Tailwind CSS.</p>
                  <p className="text-sm text-gray-500 italic text-center mt-2">Last updated: November 2025</p>
                </div>
              </ScrollSpySection>
            </article>
          </section>
        </ScrollSpyViewport>
      </ScrollSpy>

      <CtaSection />
    </main>
  )
}
