'use client'

import CtaSection from '@/components/ui-block/cta'
import ProjectContent from '@/components/ui-block/project-content'
import ProjectFlexBlock from '@/components/ui-block/project-flex-block'
import { HorizontalStack, VerticalStack } from '@/components/ui-block/project-stack'
import { CallToActionButton } from '@/components/ui/button'
import { ScrollSpy, ScrollSpyLink, ScrollSpyNav, ScrollSpySection, ScrollSpyViewport } from '@/components/ui/scroll-spy'
import { Box, Layers, Monitor, MoveRight, Paintbrush, Palette, Space, Sparkles, Square, Type, Zap } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

const DEFAULT_METADATA = {
  title: 'Building Design Tokens: From Figma to Code',
  author: 'Jessica Cheng',
  profileImage: '/profile-small.jpg',
} as const

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
      <ScrollSpy offset={0} orientation="horizontal">
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
            Building Components
          </ScrollSpyLink>
          <ScrollSpyLink value="contact" activeClassName="data-[state=active]:text-secondary">
            Contact
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
                <p className="leading-relaxed">
                  This guide shows you how to build and implement design tokens using Figma Variables, then translate them into code with Next.js, TypeScript, and Tailwind CSS.
                </p>
              </ScrollSpySection>

              <hr className="my-12 border-gray-200" />

              {/* What Are Design Tokens */}
              <ScrollSpySection value="what-are-tokens">
                <h2 className="text-3xl font-bold mt-12 mb-6 text-black">What Are Design Tokens?</h2>
                <ProjectContent>
                  <p className="leading-relaxed">
                    Tokens are essentially labels for design choices. Instead of scattering actual values throughout your codebase, you create a shared vocabulary. Designers and developers both point
                    to the same name.
                  </p>

                  <ProjectFlexBlock
                    left={
                      <VerticalStack title="The Two-Part Structure" titleColor="text-black">
                        <ul className="list-disc pl-6">
                          <li>
                            <strong>An identifier</strong> - something readable like <code className="bg-gray-100 px-2 py-1 rounded text-sm">brand-primary</code>
                          </li>
                          <li>
                            <strong>An actual value</strong> - which could be a color hex, pixel measurement, font family, or even reference another token
                          </li>
                        </ul>
                      </VerticalStack>
                    }
                    right={
                      <div className="flex flex-col justify-end items-end w-full h-full">
                        <Image src="/blog-design-token-parts.png" alt="The Two-Part Structure" width={1000} height={1000} className="w-full h-auto rounded-xl border border-gray-200" />
                      </div>
                    }
                  />
                </ProjectContent>
              </ScrollSpySection>

              <hr className="my-12 border-gray-200" />

              {/* Why Design Tokens Matter */}
              <ScrollSpySection value="why-tokens">
                <h2 className="text-3xl font-bold mt-12 mb-6 text-black">Why Design Tokens Matter</h2>

                <HorizontalStack mobileCols={1} desktopCols={2}>
                  {/* Consistency at Scale */}
                  <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center">
                        <Layers className="w-8 h-8 text-green-600" />
                      </div>
                      <VerticalStack title="Consistency at Scale" titleColor="text-black">
                        <p>The same design values are used across all platforms, products, and teams. No more visual inconsistencies or &quot;close enough&quot; colors.</p>
                      </VerticalStack>
                    </div>
                  </div>

                  {/* Faster Development */}
                  <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center">
                        <Zap className="w-8 h-8 text-purple-600" />
                      </div>
                      <VerticalStack title="Faster Development" titleColor="text-black">
                        <p>Developers use pre-defined values instead of making design decisions in code. Components ship faster with fewer design review cycles.</p>
                      </VerticalStack>
                    </div>
                  </div>

                  {/* Effortless Updates */}
                  <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-16 h-16 bg-yellow-100 rounded-2xl flex items-center justify-center">
                        <Sparkles className="w-8 h-8 text-yellow-600" />
                      </div>
                      <VerticalStack title="Effortless Updates" titleColor="text-black">
                        <p>Rebrand your entire product by updating a handful of token values. What used to take weeks now takes minutes.</p>
                      </VerticalStack>
                    </div>
                  </div>

                  {/* Multi-Platform Support */}
                  <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-16 h-16 bg-cyan-100 rounded-2xl flex items-center justify-center">
                        <Monitor className="w-8 h-8 text-cyan-600" />
                      </div>
                      <VerticalStack title="Multi-Platform Support" titleColor="text-black">
                        <p>Define once, use everywhere. Your tokens work on web, iOS, Android, and any future platform.</p>
                      </VerticalStack>
                    </div>
                  </div>

                  {/* Theming Built-In */}
                  <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm hover:shadow-md transition-shadow md:col-span-2">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-16 h-16 bg-pink-100 rounded-2xl flex items-center justify-center">
                        <Paintbrush className="w-8 h-8 text-pink-600" />
                      </div>
                      <VerticalStack title="Theming Built-In" titleColor="text-black">
                        <p>Switch between light mode, dark mode, or brand variations by swapping token values, no component changes needed.</p>
                      </VerticalStack>
                    </div>
                  </div>
                </HorizontalStack>
              </ScrollSpySection>

              <hr className="my-12 border-gray-200" />

              {/* When to Use Design Tokens */}
              <ScrollSpySection value="when-to-use">
                <h2 className="text-3xl font-bold mt-12 mb-6 text-black">When to Use Design Tokens</h2>

                <p className="leading-relaxed">Design tokens are most valuable when:</p>

                <ul className="list-disc pl-6 space-y-2 text-lg text-gray-700">
                  <li>You&apos;re building products across multiple platforms (web, iOS, Android)</li>
                  <li>Your product needs theming (dark mode, brand variations, white-labeling)</li>
                  <li>Multiple teams work on the same product</li>
                  <li>You plan to scale or evolve your design system</li>
                  <li>Design-to-development handoff takes too long</li>
                  <li>You&apos;re experiencing visual inconsistencies across your product</li>
                </ul>
              </ScrollSpySection>

              <hr className="my-12 border-gray-200" />

              {/* Understanding Token Hierarchy */}
              <ScrollSpySection value="token-hierarchy">
                <h2 className="text-3xl font-bold mt-12 mb-6 text-black">Understanding Token Hierarchy</h2>
                <ProjectContent>
                  <p className="leading-relaxed">
                    Professional design systems organize tokens in three tiers. This structure enables flexibility, theming, and clear communication between designers and developers.
                  </p>

                  <ProjectFlexBlock
                    left={
                      <VerticalStack title="Tier 1: Primitive Tokens" titleColor="text-black">
                        <p className="leading-relaxed">Raw values with no context, create your palette of options.</p>
                      </VerticalStack>
                    }
                    right={<Image src="/blog-design-token-primitive.png" alt="Primitive Tokens" width={1000} height={1000} className="w-full h-auto rounded-xl border border-gray-200" />}
                  />

                  <ProjectFlexBlock
                    left={
                      <VerticalStack title="Tier 2: Semantic Tokens" titleColor="text-black">
                        <p className="leading-relaxed">Meaningful names that reference primitives, conveying purpose.</p>
                      </VerticalStack>
                    }
                    right={<Image src="/blog-design-token-semantic.png" alt="Semantic Tokens" width={1000} height={1000} className="w-full h-auto rounded-xl border border-gray-200" />}
                  />

                  <ProjectFlexBlock
                    left={
                      <VerticalStack title="Tier 3: Component Tokens" titleColor="text-black">
                        <p className="leading-relaxed">Component-specific tokens that reference semantic tokens.</p>
                      </VerticalStack>
                    }
                    right={<Image src="/blog-design-token-component.png" alt="Component Tokens" width={1000} height={1000} className="w-full h-auto rounded-xl border border-gray-200" />}
                  />
                </ProjectContent>
              </ScrollSpySection>

              <hr className="my-12 border-gray-200" />

              {/* Token Categories */}
              <ScrollSpySection value="token-categories">
                <h2 className="text-3xl font-bold mt-12 mb-6 text-black">Token Categories</h2>

                <p className="leading-relaxed mb-10">Design tokens organize your visual language into structured categories. Here are the essential token types for modern design systems:</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Color Tokens */}
                  <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center">
                        <Palette className="w-8 h-8 text-blue-600" />
                      </div>
                      <VerticalStack title="Color Tokens" titleColor="text-black">
                        <p>Brand colors, neutral scales, semantic colors, and UI palettes</p>
                        <ul className="list-disc pl-6">
                          <li>Brand colors (buttons, links, key actions)</li>
                          <li>Neutral grays (text, backgrounds, borders)</li>
                          <li>Semantic colors (success, error, warning)</li>
                        </ul>
                      </VerticalStack>
                    </div>
                  </div>

                  {/* Typography Tokens */}
                  <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center">
                        <Type className="w-8 h-8 text-blue-600" />
                      </div>
                      <VerticalStack title="Typography Tokens" titleColor="text-black">
                        <p>Font families, sizes, weights, and line heights</p>
                        <ul className="list-disc pl-6">
                          <li>Font families (sans, serif, mono)</li>
                          <li>Font sizes (xs through 9xl)</li>
                          <li>Font weights (400, 500, 600, 700)</li>
                        </ul>
                      </VerticalStack>
                    </div>
                  </div>

                  {/* Spacing Tokens */}
                  <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center">
                        <Space className="w-8 h-8 text-blue-600" />
                      </div>
                      <VerticalStack title="Spacing Tokens" titleColor="text-black">
                        <p>Padding, margins, gaps, and layout spacing values</p>
                        <ul className="list-disc pl-6">
                          <li>Padding and margins (components)</li>
                          <li>Gaps (flex, grid layouts)</li>
                          <li>Width and height (elements)</li>
                        </ul>
                      </VerticalStack>
                    </div>
                  </div>

                  {/* Border Radius Tokens */}
                  <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center">
                        <Square className="w-8 h-8 text-blue-600" />
                      </div>
                      <VerticalStack title="Border Radius Tokens" titleColor="text-black">
                        <p>Corner rounding from sharp edges to perfect circles</p>
                        <ul className="list-disc pl-6">
                          <li>Small (2-4px): buttons, inputs</li>
                          <li>Medium (6-8px): cards, dropdowns</li>
                          <li>Full: pills, avatars</li>
                        </ul>
                      </VerticalStack>
                    </div>
                  </div>

                  {/* Shadow Tokens */}
                  <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center">
                        <Box className="w-8 h-8 text-blue-600" />
                      </div>
                      <VerticalStack title="Shadow Tokens" titleColor="text-black">
                        <p>Elevation and depth for visual hierarchy</p>
                        <ul className="list-disc pl-6">
                          <li>Small: cards above surface</li>
                          <li>Medium: dropdowns, tooltips</li>
                          <li>Large: modals, overlays</li>
                        </ul>
                      </VerticalStack>
                    </div>
                  </div>

                  {/* Motion Tokens */}
                  <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center">
                        <MoveRight className="w-8 h-8 text-blue-600" />
                      </div>
                      <VerticalStack title="Motion Tokens" titleColor="text-black">
                        <p>Animation timing, easing, and duration values</p>
                        <ul className="list-disc pl-6">
                          <li>Duration (fast, normal, slow)</li>
                          <li>Easing (ease-in, ease-out)</li>
                          <li>Delays (transitions, animations)</li>
                        </ul>
                      </VerticalStack>
                    </div>
                  </div>
                </div>
              </ScrollSpySection>

              <hr className="my-12 border-gray-200" />

              {/* Naming Convention */}
              <ScrollSpySection value="naming-convention">
                <h2 className="text-3xl font-bold mt-12 mb-6 text-black">Naming Convention</h2>
                <ProjectFlexBlock
                  left={
                    <VerticalStack>
                      <ol className="list-decimal pl-6 space-y-2 text-lg">
                        <li>
                          <strong>Category</strong> <br /> The token type (color, spacing, typography, etc.)
                        </li>
                        <li>
                          <strong>Property</strong> <br /> What it affects (background, text, border, padding, etc.)
                        </li>
                        <li>
                          <strong>Variant</strong> <br /> The specific use case (primary, secondary, error, success, etc.)
                        </li>
                        <li>
                          <strong>State</strong> <br /> Optional interaction state (hover, active, disabled, etc.)
                        </li>
                      </ol>
                    </VerticalStack>
                  }
                  right={<Image src="/blog-design-token-naming.png" alt="Naming Convention" width={1000} height={1000} className="w-full h-auto rounded-xl border border-gray-200" />}
                />
              </ScrollSpySection>

              <hr className="my-12 border-gray-200" />

              {/* Creating Tokens in Figma */}
              <ScrollSpySection value="figma-setup">
                <h2 className="text-3xl font-bold mt-12 mb-6 text-black">Creating Tokens in Figma</h2>
                <ProjectContent>
                  <p className="leading-relaxed">Figma Variables are built for design tokens. Here&apos;s how to set up a professional system.</p>

                  <ProjectFlexBlock
                    left={
                      <VerticalStack title="Step 1: Create Primitive Colors" titleColor="text-black">
                        <p className="leading-relaxed flex-1 ">
                          <strong>Create Collection:</strong> <code className="bg-gray-100 px-2 py-1 rounded text-sm">Primitives/Colors</code>
                        </p>
                        <p className="leading-relaxed">
                          Build your foundational color palette with full shade scales (50, 100, 200...900, 950). For each color family, like primary, warning, or neutral, create variables from{' '}
                          <code className="bg-gray-100 px-2 py-1 rounded text-sm">primary-50</code> (lightest) to <code className="bg-gray-100 px-2 py-1 rounded text-sm">primary-950</code> (darkest).
                          These raw values have no semantic meaning yet, they&apos;re just your color toolkit waiting to be assigned purpose.
                        </p>
                      </VerticalStack>
                    }
                    right={<Image src="/blog-design-token-primitive-variable.png" alt="Figma Setup" width={1000} height={1000} className="w-full h-auto rounded-xl border border-gray-200" />}
                  />
                  <ProjectFlexBlock
                    left={
                      <VerticalStack title="Step 2: Create Semantic Colors" titleColor="text-black">
                        <p className="leading-relaxed">
                          <strong>Create Collection:</strong> <code className="bg-gray-100 px-2 py-1 rounded text-sm">Semantic/Colors</code>
                        </p>
                        <p className="leading-relaxed">
                          Instead of using raw hex values, assign primitives to semantic tokens based on their purpose. For example, set{' '}
                          <code className="bg-gray-100 px-2 py-1 rounded text-sm">color-primary</code> to reference <code className="bg-gray-100 px-2 py-1 rounded text-sm">primary-600</code>, and{' '}
                          <code className="bg-gray-100 px-2 py-1 rounded text-sm">color-error</code> to reference <code className="bg-gray-100 px-2 py-1 rounded text-sm">warning-600</code>. This
                          creates a meaningful layer between design intent and actual values.
                        </p>
                      </VerticalStack>
                    }
                    right={<Image src="/blog-design-token-semantic-variable.png" alt="Figma Setup" width={1000} height={1000} className="w-full h-auto rounded-xl border border-gray-200" />}
                  />
                  <ProjectFlexBlock
                    left={
                      <VerticalStack title="Step 3: Enable Theming" titleColor="text-black">
                        <p className="leading-relaxed">
                          <strong>Add new variable mode: </strong> <code className="bg-gray-100 px-2 py-1 rounded text-sm">Dark</code>
                        </p>
                        <p className="leading-relaxed">
                          In your Semantic/Colors collection, add a new mode called &quot;Dark&quot;. Now each semantic token can reference different primitives per mode. For example,{' '}
                          <code className="bg-gray-100 px-2 py-1 rounded text-sm">color-primary</code> might reference <code className="bg-gray-100 px-2 py-1 rounded text-sm">primary-600</code> in
                          Light mode but <code className="bg-gray-100 px-2 py-1 rounded text-sm">primary-200</code> in Dark mode for better contrast on dark backgrounds.
                        </p>
                      </VerticalStack>
                    }
                    right={<Image src="/blog-design-token-semantic-variable-theme.png" alt="Figma Setup" width={1000} height={1000} className="w-full h-auto rounded-xl border border-gray-200" />}
                  />
                </ProjectContent>
              </ScrollSpySection>

              <hr className="my-12 border-gray-200" />

              {/* Implementing in Code */}
              <ScrollSpySection value="implementing">
                <h2 className="text-3xl font-bold mt-12 mb-6 text-black">Implementing design tokens in code</h2>
                <ProjectContent>
                  <VerticalStack>
                    <p className="leading-relaxed">
                      Now let&apos;s translate Figma tokens into your Next.js project with Tailwind CSS. The simplest and most maintainable approach is to define your design tokens directly in your
                      CSS using Tailwind&apos;s <code className="bg-gray-100 px-2 py-1 rounded text-sm">@theme</code> directive.
                    </p>

                    <p className="leading-relaxed">Let&apos;s implement the three-tier token system in Tailwind CSS. Here&apos;s when to use each approach:</p>

                    <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-xl">
                      <ul className="space-y-2 text-gray-800">
                        <li>
                          <strong>Reference Tokens:</strong> Use <code className="bg-white px-2 py-1 rounded text-sm">@theme</code> to override Tailwind&apos;s defaults (e.g.,{' '}
                          <code className="bg-white px-2 py-1 rounded text-sm">--color-blue-500</code>)
                        </li>
                        <li>
                          <strong>Semantic Tokens:</strong> Use <code className="bg-white px-2 py-1 rounded text-sm">@layer base</code> with{' '}
                          <code className="bg-white px-2 py-1 rounded text-sm">theme()</code> function for custom names (e.g.,{' '}
                          <code className="bg-white px-2 py-1 rounded text-sm">--color-primary</code>)
                        </li>
                        <li>
                          <strong>Component Tokens:</strong> Use <code className="bg-white px-2 py-1 rounded text-sm">@layer base</code> to reference semantic/theme tokens (most projects skip this
                          layer)
                        </li>
                      </ul>
                    </div>
                  </VerticalStack>
                  <VerticalStack title="1. Reference Tokens (Override Tailwind Defaults)" titleColor="text-black">
                    <p className="leading-relaxed">
                      Use the <code className="bg-gray-100 px-2 py-1 rounded text-sm">@theme</code> directive to override Tailwind&apos;s default color scales, spacing, and typography. This is the
                      official approach from the{' '}
                      <a href="https://tailwindcss.com/docs/colors" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 underline">
                        Tailwind CSS documentation
                      </a>
                      .
                    </p>
                    <p className="leading-relaxed">
                      These tokens automatically work with Tailwind&apos;s utility classes. Use <code className="bg-gray-100 px-2 py-1 rounded text-sm">bg-blue-500</code> for backgrounds,{' '}
                      <code className="bg-gray-100 px-2 py-1 rounded text-sm">text-gray-900</code> for text, <code className="bg-gray-100 px-2 py-1 rounded text-sm">border-blue-200</code> for borders.
                      Complete scales (50-950) give you natural progressions for hover states, active states, and visual hierarchy.
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
}`}
                    />
                  </VerticalStack>

                  <VerticalStack title="2. Semantic Tokens (Custom CSS Properties)" titleColor="text-black">
                    <p className="leading-relaxed">
                      <strong>Important:</strong> Tailwind&apos;s <code className="bg-gray-100 px-2 py-1 rounded text-sm">@theme</code> directive only accepts specific token names (like{' '}
                      <code className="bg-gray-100 px-2 py-1 rounded text-sm">--color-blue-500</code>). For semantic tokens with custom names like{' '}
                      <code className="bg-gray-100 px-2 py-1 rounded text-sm">--color-primary</code>, use <code className="bg-gray-100 px-2 py-1 rounded text-sm">@layer base</code> with CSS custom
                      properties that reference your theme tokens via the <code className="bg-gray-100 px-2 py-1 rounded text-sm">theme()</code> function:
                    </p>
                    <p className="leading-relaxed">
                      These semantic tokens can be used with the <code className="bg-gray-100 px-2 py-1 rounded text-sm">var()</code> function in custom CSS or with Tailwind&apos;s arbitrary values:{' '}
                      <code className="bg-gray-100 px-2 py-1 rounded text-sm">bg-[var(--color-primary)]</code>. The <code className="bg-gray-100 px-2 py-1 rounded text-sm">theme()</code> function
                      ensures your semantic tokens always reference the correct values from your <code className="bg-gray-100 px-2 py-1 rounded text-sm">@theme</code> configuration.
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
                  </VerticalStack>
                  <VerticalStack title="3. Component Tokens" titleColor="text-black">
                    <p className="leading-relaxed">
                      Component tokens follow the same pattern as semantic tokens, use <code className="bg-gray-100 px-2 py-1 rounded text-sm">@layer base</code> with the{' '}
                      <code className="bg-gray-100 px-2 py-1 rounded text-sm">theme()</code> function to reference your base or semantic tokens:
                    </p>

                    <p className="leading-relaxed">
                      Tailwind v4 automatically converts these CSS custom properties into utility classes: <code className="bg-gray-100 px-2 py-1 rounded text-sm">bg-button-bg-primary</code>,{' '}
                      <code className="bg-gray-100 px-2 py-1 rounded text-sm">px-button-padding-x</code>. The <code className="bg-gray-100 px-2 py-1 rounded text-sm">--button-bg-primary</code> custom
                      property becomes <code className="bg-gray-100 px-2 py-1 rounded text-sm">bg-button-bg-primary</code> class. Notice how component tokens can reference semantic tokens (
                      <code className="bg-gray-100 px-2 py-1 rounded text-sm">var(--color-primary)</code>) or theme values directly (
                      <code className="bg-gray-100 px-2 py-1 rounded text-sm">theme(colors.white)</code>).
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
                  </VerticalStack>
                </ProjectContent>
              </ScrollSpySection>

              <hr className="my-12 border-gray-200" />

              {/* Building Components */}
              <ScrollSpySection value="components">
                <h2 className="text-3xl font-bold mt-12 mb-6 text-black">Building Components with Tokens</h2>
                <ProjectContent>
                  <p className="leading-relaxed">Here&apos;s a button component using design tokens with shadcn/ui patterns:</p>

                  <CodeBlock
                    language="typescript"
                    code={`'use client'

import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 text-sm font-medium transition-colors disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-button-bg-primary text-button-text-primary hover:bg-button-bg-primary-hover rounded-button-radius px-button-padding-x py-button-padding-y',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80 rounded-md',
        outline: 'border-2 border-input bg-background hover:bg-accent hover:text-accent-foreground rounded-md',
        ghost: 'hover:bg-accent hover:text-accent-foreground rounded-md',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 px-3 text-xs',
        lg: 'h-11 px-8',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }`}
                  />

                  <VerticalStack title="Component Preview" titleColor="text-black">
                    <p className="leading-relaxed">Here&apos;s how the button looks using these component tokens:</p>
                    <HorizontalStack mobileCols={1} desktopCols={2} className="bg-gray-50 rounded-xl p-4">
                      <div>
                        <p className="text-sm text-gray-600 mb-3 font-semibold">Preview of the Button</p>
                        <button className="inline-flex items-center justify-center gap-2 text-sm font-medium transition-colors bg-[#3b82f6] text-white rounded-md px-6 py-2 hover:bg-blue-600">
                          Primary Button
                        </button>
                      </div>

                      <div>
                        <p className="text-sm text-gray-600 mb-3">
                          <strong>How tokens cascade:</strong>
                        </p>
                        <div className="space-y-3 text-sm">
                          <div className="flex items-start gap-3">
                            <span className="text-gray-400 font-mono text-xs mt-1">1.</span>
                            <div>
                              <code className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded">bg-button-bg-primary</code>
                              <p className="text-xs text-gray-600 mt-1">Component token in the code</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-3">
                            <span className="text-gray-400 font-mono text-xs mt-1">2.</span>
                            <div>
                              <code className="text-xs bg-purple-50 text-purple-700 px-2 py-1 rounded">--color-primary</code>
                              <p className="text-xs text-gray-600 mt-1">Semantic token with meaning</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-3">
                            <span className="text-gray-400 font-mono text-xs mt-1">3.</span>
                            <div>
                              <code className="text-xs bg-green-50 text-green-700 px-2 py-1 rounded">#3b82f6</code>
                              <p className="text-xs text-gray-600 mt-1">Reference token with actual value</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </HorizontalStack>
                  </VerticalStack>
                </ProjectContent>
              </ScrollSpySection>

              <hr className="my-12 border-gray-200" />

              {/* Contact */}
              <ScrollSpySection value="contact">
                {/* Contact CTA */}
                <div className="mt-16 bg-primary rounded-xl p-12 text-center">
                  <h3 className="text-3xl font-bold text-white mb-4">Have Questions?</h3>
                  <p className="leading-relaxed mb-8 max-w-2xl mx-auto text-white">
                    Building design systems can be complex. If you have questions about implementing design tokens in your project or need help getting started, let me know!
                  </p>
                  <CallToActionButton asChild className="bg-secondary hover:bg-secondary/80 text-white" arrowColor="text-secondary">
                    <Link href="/contact">Get in Touch</Link>
                  </CallToActionButton>
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
