'use client'

import ExpandableImage from '@/components/ui-block/expandable-image'
import CtaSection from '@/components/ui-block/cta'
import { HorizontalCard, VerticalCard } from '@/components/ui-block/project-card'
import ProjectContent from '@/components/ui-block/project-content'
import ProjectFlexBlock from '@/components/ui-block/project-flex-block'
import ProjectHeroSection from '@/components/ui-block/project-hero-section'
import ProjectPullQuote from '@/components/ui-block/project-pull-quote'
import ProjectSectionTitle from '@/components/ui-block/project-section-title'
import { HorizontalStack, VerticalStack } from '@/components/ui-block/project-stack'
import { ScrollSpy, ScrollSpyLink, ScrollSpyNav, ScrollSpySection, ScrollSpyViewport } from '@/components/ui/scroll-spy'
import { ArrowDown, ArrowLeft, ArrowRight } from 'lucide-react'
import Image from 'next/image'
import { Fragment } from 'react'

const iosFlowScreens = [
  {
    label: 'Set up household',
    src: '/peasy-flow-household.png',
    alt: 'Peasy iOS onboarding screen for household members',
  },
  {
    label: 'Choose meals',
    src: '/peasy-flow-meals.png',
    alt: 'Peasy iOS onboarding screen for choosing meal types',
  },
  {
    label: 'Recipe library',
    src: '/peasy-ios-recipes-dark.png',
    alt: 'Peasy iOS recipe library with illustrated import options',
  },
  {
    label: 'Add a recipe',
    src: '/peasy-ios-add-recipe-dark.png',
    alt: 'Peasy iOS Add Recipe screen with web, photo, file, manual, and social import options',
  },
  {
    label: 'Import from web',
    src: '/peasy-flow-web-import.png',
    alt: 'Peasy iOS web recipe import screen with source link and language controls',
  },
  {
    label: 'Recipe instructions',
    src: '/peasy-ios-recipe-instructions-dark.png',
    alt: 'Peasy iOS ginger salmon recipe with ingredients and instructions',
  },
  {
    label: 'Meal settings',
    src: '/peasy-ios-meal-settings-dark.png',
    alt: 'Peasy iOS meal settings with meal toggles and recipe language preference',
  },
  {
    label: 'Build a meal plan',
    src: '/peasy-plan-screen.png',
    alt: 'Peasy iOS meal planner choosing recipes and household participants',
  },
  {
    label: 'Choose shopping days',
    src: '/peasy-flow-shopping-days.png',
    alt: 'Peasy iOS screen for choosing which days to include in a shopping list',
  },
  {
    label: 'Review the list',
    src: '/peasy-flow-shopping-review.png',
    alt: 'Peasy iOS screen reviewing meals before creating a shopping list',
  },
  {
    label: 'Shop the list',
    src: '/peasy-shopping-list-screen.png',
    alt: 'Peasy iOS shopping list with grocery items and store selection controls',
  },
  {
    label: 'Add grocery items',
    src: '/peasy-flow-ingredients.png',
    alt: 'Peasy iOS grocery ingredient browser with food choices and search',
  },
]

const webHighlights = [
  {
    title: 'Collect recipes',
    description:
      'The recipe library brings web links, photos, files, social posts, and manual entry into one starting point. Imported recipes stay reviewable before they join the library.',
    src: '/peasy-web-recipes.png',
    alt: 'Peasy web recipe library with link, photo, file, and manual recipe entry points',
  },
  {
    title: 'Build the plan',
    description:
      'The wider workspace keeps the selected day, meal, recipe details, nutrition, and household participants in view. Servings follow the people included in the plan.',
    src: '/peasy-web-plan.png',
    alt: 'Peasy web meal plan with recipe details and household participants',
  },
  {
    title: 'Work through the list',
    description:
      'Saved lists and the active checklist sit side by side. A list stays stable after it is created, so later recipe or preference changes do not rewrite a trip already in progress.',
    src: '/peasy-web-shopping-list.png',
    alt: 'Peasy web shopping workspace with saved lists and a detailed grocery checklist',
  },
]

function PhonePreview({ src, alt, className = '', priority = false }: { src: string; alt: string; className?: string; priority?: boolean }) {
  return (
    <ExpandableImage
      src={src}
      alt={alt}
      width={1206}
      height={2622}
      className="h-auto w-full rounded-[2rem]"
      triggerClassName={`rounded-[2.5rem] bg-black p-2 shadow-2xl ring-1 ring-white/20 after:absolute after:left-1/2 after:top-3 after:z-10 after:h-5 after:w-[34%] after:-translate-x-1/2 after:rounded-full after:bg-black after:content-[''] ${className}`}
      sizes="(min-width: 768px) 230px, 30vw"
      priority={priority}
      unoptimized
    />
  )
}

function IOSFlowChart() {
  const rows = Array.from({ length: Math.ceil(iosFlowScreens.length / 3) }, (_, index) => iosFlowScreens.slice(index * 3, index * 3 + 3))

  return (
    <div className="rounded-3xl bg-emerald-950 px-5 py-8 text-white sm:px-7 sm:py-10" aria-label="Peasy iOS flow from onboarding to shopping">
      {rows.map((row, rowIndex) => (
        <Fragment key={row[0].src}>
          <div className={`flex flex-col items-center gap-4 sm:gap-2 ${rowIndex % 2 === 1 ? 'sm:flex-row-reverse' : 'sm:flex-row'}`}>
            {row.map((screen, screenIndex) => (
              <Fragment key={screen.src}>
                <figure className="w-full max-w-[220px] sm:min-w-0 sm:flex-1">
                  <PhonePreview src={screen.src} alt={screen.alt} className="w-full" />
                  <figcaption className="mt-3 text-center text-sm font-medium text-emerald-50">{screen.label}</figcaption>
                </figure>
                {screenIndex < row.length - 1 && (
                  <div className="flex w-8 shrink-0 items-center justify-center text-emerald-300" aria-hidden="true">
                    <ArrowDown className="h-6 w-6 sm:hidden" strokeWidth={1.5} />
                    {rowIndex % 2 === 1 ? (
                      <ArrowLeft className="hidden h-6 w-6 sm:block" strokeWidth={1.5} />
                    ) : (
                      <ArrowRight className="hidden h-6 w-6 sm:block" strokeWidth={1.5} />
                    )}
                  </div>
                )}
              </Fragment>
            ))}
          </div>
          {rowIndex < rows.length - 1 && (
            <div className={`flex h-16 items-center justify-center text-emerald-300 sm:h-20 ${rowIndex % 2 === 1 ? 'sm:justify-start sm:pl-[14%]' : 'sm:justify-end sm:pr-[14%]'}`} aria-hidden="true">
              <ArrowDown className="h-7 w-7" strokeWidth={1.5} />
            </div>
          )}
        </Fragment>
      ))}
    </div>
  )
}

export default function PeasyPage() {
  return (
    <main>
      <ScrollSpy offset={0} defaultValue="overview" orientation="horizontal">
        <ScrollSpyNav>
          <ScrollSpyLink value="overview" activeClassName="data-[state=active]:text-emerald-700">
            Overview
          </ScrollSpyLink>
          <ScrollSpyLink value="ios-app" activeClassName="data-[state=active]:text-emerald-700 data-[state=active]:font-semibold">
            iOS app
          </ScrollSpyLink>
          <ScrollSpyLink value="web-app" activeClassName="data-[state=active]:text-emerald-700 data-[state=active]:font-semibold">
            Web app
          </ScrollSpyLink>
          <ScrollSpyLink value="decisions" activeClassName="data-[state=active]:text-emerald-700 data-[state=active]:font-semibold">
            Product decisions
          </ScrollSpyLink>
          <ScrollSpyLink value="system" activeClassName="data-[state=active]:text-emerald-700 data-[state=active]:font-semibold">
            Product system
          </ScrollSpyLink>
        </ScrollSpyNav>

        <ScrollSpyViewport className="flex-1 max-w-3xl mx-auto">
          <ProjectHeroSection
            title="Peasy"
            subtitle="One calm path from recipes to a shopping list you can depend on."
            media={
              <div className="relative flex w-full flex-col overflow-hidden rounded-xl bg-emerald-950">
                <Image src="/peasy-broccoli.png" alt="" width={640} height={640} aria-hidden className="absolute -right-20 -top-24 w-64 rotate-12 opacity-70 md:w-80" />
                <Image src="/peasy-lemon.png" alt="" width={640} height={512} aria-hidden className="absolute -bottom-16 -left-20 w-56 -rotate-12 opacity-70 md:w-72" />

                <div className="relative z-10 flex items-center gap-3 p-6 text-white md:p-8">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100">
                    <Image src="/peasy-mark.png" alt="" width={640} height={533} aria-hidden className="w-9" />
                  </div>
                  <div>
                    <p className="text-xl font-semibold">Peasy</p>
                    <p className="text-sm text-emerald-100/70">Plan well. Shop once.</p>
                  </div>
                </div>

                <div className="relative z-10 mt-4 flex items-end justify-center gap-3 px-5 pb-5 md:mt-3 md:gap-5 md:px-10 md:pb-7">
                  <PhonePreview src="/peasy-ios-recipe-instructions-dark.png" alt="Peasy iOS ginger salmon recipe page showing ingredients and instructions" className="w-[28%] max-w-[145px] -rotate-3" priority />
                  <PhonePreview src="/peasy-plan-screen.png" alt="Peasy iOS meal planner choosing recipes and household participants" className="w-[31%] max-w-[160px]" priority />
                  <PhonePreview src="/peasy-shopping-list-screen.png" alt="Peasy iOS shopping list with grocery items and store selection controls" className="w-[28%] max-w-[145px] rotate-3" priority />
                </div>
              </div>
            }
          />

          <ScrollSpySection value="overview" className="flex flex-col">
            <ProjectSectionTitle color="text-black" dotColor="text-emerald-700">
              Overview
            </ProjectSectionTitle>
            <ProjectContent>
              <VerticalStack>
                <p className="text-lg">
                  Meal planning breaks down when recipes, household needs, and the grocery run live in separate places. Peasy connects them in one flow: save what you want to cook, choose who is
                  eating, and create the shopping list from those decisions.
                </p>
                <p>
                  I designed and built Peasy as one product across iOS and the web. Both apps share the same accounts, calculations, and product rules. Each interface follows the patterns that make
                  sense for its screen and context.
                </p>
              </VerticalStack>

              <HorizontalStack mobileCols={1} desktopCols={3} gapClassName="gap-2 md:gap-4">
                <VerticalCard title="My role" bgColor="bg-gray-100" titleColor="text-gray-500">
                  Product direction, UX/UI, brand, system architecture, and implementation
                </VerticalCard>
                <VerticalCard title="Platforms" bgColor="bg-gray-100" titleColor="text-gray-500">
                  Native iOS app, responsive web app, and shared backend
                </VerticalCard>
                <VerticalCard title="Status" bgColor="bg-gray-100" titleColor="text-gray-500">
                  Prelaunch product with working iOS and web experiences
                </VerticalCard>
              </HorizontalStack>
            </ProjectContent>
          </ScrollSpySection>

          <ScrollSpySection value="ios-app" className="flex flex-col">
            <ProjectSectionTitle color="text-black" dotColor="text-emerald-700">
              Product flow on iOS
            </ProjectSectionTitle>
            <ProjectContent>
              <IOSFlowChart />
            </ProjectContent>
          </ScrollSpySection>

          <ScrollSpySection value="web-app" className="flex flex-col">
            <ProjectSectionTitle color="text-black" dotColor="text-emerald-700">
              Web app
            </ProjectSectionTitle>
            <ProjectContent>
              <VerticalStack>
                <p className="text-lg">
                  The web app adds a workspace for larger screens. Persistent navigation keeps recipes, plans, and shopping lists close while wider panels make comparison and detailed list work
                  faster.
                </p>
              </VerticalStack>

              <VerticalStack title="Click through the web app" titleColor="text-gray-500">
                <p>Follow the pointer from the recipe library to the meal plan and into a shopping list.</p>
                <ExpandableImage
                  src="/peasy-web-walkthrough.gif"
                  posterSrc="/peasy-web-walkthrough-poster.png"
                  alt="Animated Peasy web walkthrough with a pointer clicking Recipes, Plan, and Shop"
                  width={960}
                  height={467}
                  className="h-auto w-full rounded-xl"
                  triggerClassName="border border-border bg-emerald-950 shadow-xl"
                  sizes="(min-width: 768px) 768px, 100vw"
                  unoptimized
                />
              </VerticalStack>

              <div className="flex flex-col gap-y-8 md:gap-y-12">
                {webHighlights.map((highlight, index) => (
                  <ProjectFlexBlock
                    key={highlight.title}
                    left={
                      <VerticalStack title={highlight.title} titleColor="text-gray-500">
                        <p>{highlight.description}</p>
                      </VerticalStack>
                    }
                    right={
                      <ExpandableImage
                        src={highlight.src}
                        alt={highlight.alt}
                        width={1440}
                        height={700}
                        className="h-auto w-full rounded-xl"
                        triggerClassName="border border-border"
                        sizes="(min-width: 768px) 384px, 100vw"
                      />
                    }
                    leftClassName={index % 2 === 1 ? 'md:order-2' : ''}
                    rightClassName={index % 2 === 1 ? 'md:order-1' : ''}
                  />
                ))}
              </div>
            </ProjectContent>
          </ScrollSpySection>

          <ScrollSpySection value="decisions" className="flex flex-col">
            <ProjectSectionTitle color="text-black" dotColor="text-emerald-700">
              Product decisions
            </ProjectSectionTitle>
            <ProjectContent>
              <ProjectPullQuote>Use AI for the messy work. Use regular code for prices, payments, and anything the app must get right every time.</ProjectPullQuote>

              <VerticalStack>
                <HorizontalCard title="Remove the paywall from onboarding" titleColor="text-gray-500">
                  <p>
                    <span className="font-semibold">What:</span> I removed the paywall from onboarding. New accounts finish setup and enter a 14-day Pro trial on iPhone and the web without a card. The
                    trial ends on the same date on every device, and checkout appears only after it ends.
                  </p>
                  <p>
                    <span className="font-semibold">Why:</span> A paywall asks people to make a payment decision before they have felt the product&apos;s value. That extra step can make them leave before
                    finishing signup. Letting them save a recipe, build a plan, and make a shopping list first lowers onboarding friction, then asks them to pay after they understand what Peasy does.
                  </p>
                </HorizontalCard>
                <HorizontalCard title="Limit the expensive work, not people&apos;s recipes" titleColor="text-gray-500">
                  <p>
                    <span className="font-semibold">What:</span> Free accounts can save 50 recipes and use 3 imports that need AI help each month. Pro removes the recipe limit and gives 100 assisted
                    imports each month. The trial includes 100 total. If someone returns to Free, Peasy keeps every recipe and only pauses new saves until they are under the limit.
                  </p>
                  <p>
                    <span className="font-semibold">Why:</span> AI imports cost Peasy money each time, while keeping an old recipe is cheap. The limits focus on the costly action and never erase work a
                    person already saved.
                  </p>
                </HorizontalCard>
                <HorizontalCard title="Set a competitive price to grow Peasy" titleColor="text-gray-500">
                  <p>
                    <span className="font-semibold">What:</span> I set Peasy Pro&apos;s US web launch price at $5.99 a month or $49.99 a year. In a September 2026 price check, that was close to{' '}
                    <a href="https://www.plantoeat.com/tour/automated-grocery-list-maker/" className="underline underline-offset-2">Plan to Eat</a> ($5.95 a month, $49 a year) and below{' '}
                    <a href="https://samsungfood.com/food-plus/" className="underline underline-offset-2">Samsung Food+</a> ($6.99 a month, $59.99 a year).
                  </p>
                  <p>
                    <span className="font-semibold">Why:</span> Peasy is prelaunch, so gaining users matters more to me right now than maximizing profit. A familiar price makes it easier for people to
                    keep using Peasy after the free trial.
                  </p>
                </HorizontalCard>
                <HorizontalCard title="Use AI only where it is worth the cost" titleColor="text-gray-500">
                  <p>
                    <span className="font-semibold">What:</span> I use AI only when a messy recipe page, photo, or file needs help becoming a draft. Serving math, unit conversions, grocery totals, and
                    package amounts use hand-written calculations and reviewed rules. Peasy does not pay for an AI call to do math the app already knows how to do.
                  </p>
                  <p>
                    <span className="font-semibold">Why:</span> That matters in an MVP because every AI call costs money and can return a different answer. Regular calculations are faster, cheaper, and
                    give the same result every time. Saving AI for the messy work lets Peasy test the product without paying for it everywhere.
                  </p>
                </HorizontalCard>
                <HorizontalCard title="AI makes the draft. People make the decision." titleColor="text-gray-500">
                  <p>
                    <span className="font-semibold">What:</span> Anything AI creates stays a draft. Peasy checks where the details came from and whether the draft has the right fields. The person can
                    edit it and must press Save. AI never decides an unclear serving size, paid access, package amounts, or whether to send a cart to a store.
                  </p>
                  <p>
                    <span className="font-semibold">Why:</span> Those choices can change someone&apos;s bill, food amounts, or saved data. They need the same answer every time and a clear choice from the
                    person using the app.
                  </p>
                </HorizontalCard>
                <HorizontalCard title="Let shared recipes bring in new people" titleColor="text-gray-500">
                  <p>
                    <span className="font-semibold">What:</span> Every saved recipe automatically gets a public page that anyone with the link can read. Peasy explains this before Save, so sharing from
                    a recipe card or detail page does not need another publish step. If a visitor taps Save recipe, Peasy takes them through sign in or sign up when needed, then returns to save their
                    own copy. The page also shows how many different Peasy accounts saved it.
                  </p>
                  <p>
                    <span className="font-semibold">Why:</span> A useful recipe can introduce someone to Peasy without feeling like an ad. The Save button gives them a clear next step after they see
                    the value. The save count adds social proof and gives sharing a small sense of progress, but views, failed attempts, and repeat saves do not raise it, and no names are shown.
                  </p>
                </HorizontalCard>
              </VerticalStack>
            </ProjectContent>
          </ScrollSpySection>

          <ScrollSpySection value="system" className="flex flex-col">
            <ProjectSectionTitle color="text-black" dotColor="text-emerald-700">
              One product system
            </ProjectSectionTitle>
            <ProjectContent>
              <VerticalStack>
                <p className="text-lg">
                  iOS and web use different interface patterns, but the product promises stay the same. Shared contracts keep recipes, plans, quantities, and saved shopping lists consistent across
                  both apps.
                </p>
              </VerticalStack>

              <HorizontalStack mobileCols={1} desktopCols={3}>
                <VerticalCard title="Shared contracts" titleColor="text-gray-500">
                  The same schemas, calculations, and transition fixtures run in Swift, TypeScript, and the backend.
                </VerticalCard>
                <VerticalCard title="Canonical data" titleColor="text-gray-500">
                  Supabase owns accounts and shared product records across devices.
                </VerticalCard>
                <VerticalCard title="Protected commands" titleColor="text-gray-500">
                  Versioned, retry-safe mutations preserve revisions, receipts, and account boundaries.
                </VerticalCard>
              </HorizontalStack>

              <VerticalStack title="What I learned" titleColor="text-gray-500">
                <p>
                  Cross-platform design gets stronger when the shared layer is the product&apos;s behavior. The interfaces can respond to their devices while the important promises stay exact.
                </p>
              </VerticalStack>
            </ProjectContent>
          </ScrollSpySection>
        </ScrollSpyViewport>
      </ScrollSpy>
      <CtaSection />
    </main>
  )
}
