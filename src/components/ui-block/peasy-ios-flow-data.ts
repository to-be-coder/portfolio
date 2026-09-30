export interface FlowCard {
  title: string
  state: string
  image: string
  detail: string
}

export interface FlowRow {
  label: string
  mode: 'sequence' | 'branches' | 'states'
  cards: FlowCard[]
}

export interface FlowSection {
  title: string
  description: string
  rows: FlowRow[]
}

// This map follows the iOS app's flows.json and groups navigation destinations
// with the visible empty, filled, and alternate states that matter to a viewer.
export const iosFlowSections: FlowSection[] = [
  {
    title: 'Access & onboarding',
    description: 'Account entry, required setup, legal pages, and incoming shared recipes.',
    rows: [
      {
        label: 'Enter the app', mode: 'sequence', cards: [
          { title: 'Account access', state: 'Entry page', image: '/peasy-flow/account-access.png', detail: 'Apple, Google, or email sign in.' },
          { title: 'Email verification', state: 'Code page', image: '/peasy-flow/email-code.png', detail: 'Enter a code, retry, or change email.' },
          { title: 'Name setup', state: 'Onboarding step', image: '/peasy-flow/name-setup.png', detail: 'First step for a new email account.' },
        ],
      },
      {
        label: 'Complete setup', mode: 'sequence', cards: [
          { title: 'Household', state: 'Onboarding step', image: '/peasy-flow-household.png', detail: 'Start with yourself and add members.' },
          { title: 'Meals', state: 'Onboarding step', image: '/peasy-flow-meals.png', detail: 'Select the meals you plan.' },
          { title: 'Recipes', state: 'First empty state', image: '/peasy-flow/recipes-empty.png', detail: 'Setup hands off to the empty library.' },
        ],
      },
      {
        label: 'Other entry routes', mode: 'branches', cards: [
          { title: 'Terms of Service', state: 'Legal page', image: '/peasy-flow/terms.png', detail: 'Available from account access and About.' },
          { title: 'Privacy Policy', state: 'Legal page', image: '/peasy-flow/privacy.png', detail: 'Available from account access and About.' },
          { title: 'Shared recipe', state: 'Public entry', image: '/peasy-flow/shared-recipe-pre-auth.png', detail: 'Readable before sign in; Save starts account gates.' },
        ],
      },
    ],
  },
  {
    title: 'Plan',
    description: 'Empty and planned days, calendar selection, bulk planning, and a single meal.',
    rows: [
      {
        label: 'Build a plan', mode: 'sequence', cards: [
          { title: 'Home', state: 'Empty', image: '/peasy-flow/home-empty.png', detail: 'Create a meal plan from an unplanned day.' },
          { title: 'Calendar', state: 'Date or range', image: '/peasy-flow/calendar.png', detail: 'Choose one day or a range before planning.' },
          { title: 'Bulk meal planner', state: 'Planning page', image: '/peasy-plan-screen.png', detail: 'Move through days and meal slots.' },
        ],
      },
      {
        label: 'Choose meals', mode: 'sequence', cards: [
          { title: 'Recipe choices', state: 'Selection', image: '/peasy-flow/recipe-choices.png', detail: 'Search and select recipes for a meal.' },
          { title: 'Participants', state: 'Household selection', image: '/peasy-flow/plan-participants.png', detail: 'Choose who is eating when needed.' },
          { title: 'Home', state: 'Filled', image: '/peasy-flow/plan-home-filled.png', detail: 'Planned meals appear by day and meal slot.' },
        ],
      },
      {
        label: 'Other planning states', mode: 'branches', cards: [
          { title: 'Add meal', state: 'Single day', image: '/peasy-flow/add-meal.png', detail: 'Add to one meal slot from Home.' },
          { title: 'Meal picker', state: 'Recipe sheet', image: '/peasy-flow/plan-meal-picker.png', detail: 'Pick one or more saved recipes.' },
          { title: 'Partial range', state: 'Mixed plan', image: '/peasy-flow/plan-partial.png', detail: 'Show planned and unplanned dates together.' },
        ],
      },
    ],
  },
  {
    title: 'Recipes',
    description: 'The empty and filled library, every capture route, review, detail, cooking, and sharing.',
    rows: [
      {
        label: 'Start from the library', mode: 'sequence', cards: [
          { title: 'Recipes', state: 'Empty', image: '/peasy-flow/recipes-empty.png', detail: 'Illustrated choices appear before any saves.' },
          { title: 'Add recipe', state: 'Source choices', image: '/peasy-flow/add-recipe.png', detail: 'Web, photo, file, social, or manual.' },
          { title: 'Import from web', state: 'Source form', image: '/peasy-flow-web-import.png', detail: 'Paste a URL and choose language.' },
        ],
      },
      {
        label: 'Alternate capture routes', mode: 'branches', cards: [
          { title: 'Import from photo', state: 'Capture & review', image: '/peasy-flow/import-photo.png', detail: 'Camera or library, extraction, review.' },
          { title: 'Import from file', state: 'Picker & review', image: '/peasy-flow/review-file.png', detail: 'Choose a file, extract text, review.' },
          { title: 'Social import', state: 'Guided capture', image: '/peasy-flow/social-import-guide.png', detail: 'Follow the social post capture steps.' },
        ],
      },
      {
        label: 'Make a saved recipe', mode: 'sequence', cards: [
          { title: 'Write a recipe', state: 'Manual editor', image: '/peasy-flow/write-recipe.png', detail: 'Enter photo, ingredients, timing, and steps.' },
          { title: 'Review import', state: 'Editable draft', image: '/peasy-flow/review-photo.png', detail: 'Check the extracted recipe before Save.' },
          { title: 'Recipe detail', state: 'Saved', image: '/peasy-ios-recipe-instructions-dark.png', detail: 'Servings, ingredients, instructions, and actions.' },
        ],
      },
      {
        label: 'Use the library', mode: 'branches', cards: [
          { title: 'Recipes', state: 'Filled', image: '/peasy-flow/recipes-filled.png', detail: 'Saved cards and search.' },
          { title: 'Search', state: 'No results', image: '/peasy-flow/recipe-filled-search-no-results.png', detail: 'The library can be filled while search is empty.' },
          { title: 'Cooking', state: 'Step by step', image: '/peasy-flow/cooking-step.png', detail: 'Move through instructions to completion.' },
        ],
      },
      {
        label: 'Share and return', mode: 'branches', cards: [
          { title: 'Share with Peasy', state: 'Sharing guide', image: '/peasy-flow/social-import-share-step.png', detail: 'Find Peasy in the iOS Share sheet.' },
          { title: 'Shared recipe', state: 'Public page', image: '/peasy-flow/shared-recipe.png', detail: 'Read the recipe from a public link.' },
          { title: 'Save a copy', state: 'After Save', image: '/peasy-flow/saved-copy.png', detail: 'Sign in if needed, then keep an independent copy.' },
        ],
      },
    ],
  },
  {
    title: 'Shop',
    description: 'Saved lists, creation choices, empty and filled grocery lists, items, prices, and handoff.',
    rows: [
      {
        label: 'Create a list', mode: 'sequence', cards: [
          { title: 'Shop', state: 'Empty', image: '/peasy-flow/shop-empty.png', detail: 'Start the first shopping list.' },
          { title: 'Create shopping list', state: 'Route choices', image: '/peasy-flow/shop-list-options.png', detail: 'Preset days, custom days, or a blank list.' },
          { title: 'Choose shopping days', state: 'Custom range', image: '/peasy-flow-shopping-days.png', detail: 'Choose the dates to shop for.' },
        ],
      },
      {
        label: 'From a meal plan', mode: 'sequence', cards: [
          { title: 'Review meals', state: 'Before creation', image: '/peasy-flow/shop-review.png', detail: 'Review the meals included in the list.' },
          { title: 'Grocery list', state: 'Filled', image: '/peasy-shopping-list-screen.png', detail: 'Grouped items and shopping progress.' },
          { title: 'Add ingredient', state: 'Catalog search', image: '/peasy-flow-ingredients.png', detail: 'Search the catalog or add a custom item.' },
        ],
      },
      {
        label: 'Other list routes', mode: 'branches', cards: [
          { title: 'Blank list', state: 'Empty detail', image: '/peasy-flow/blank-list.png', detail: 'Create a list without planned meals.' },
          { title: 'Shop', state: 'Saved lists', image: '/peasy-flow/shop-saved-lists.png', detail: 'Filter lists by shopping status.' },
          { title: 'Grocery list', state: 'No items', image: '/peasy-flow/blank-list.png', detail: 'Add an ingredient from an empty list.' },
        ],
      },
      {
        label: 'Work through a list', mode: 'branches', cards: [
          { title: 'Edit quantity', state: 'Item detail', image: '/peasy-flow/edit-quantity.png', detail: 'Change need or purchase quantity.' },
          { title: 'Store prices', state: 'Selected store', image: '/peasy-flow/store-prices.png', detail: 'See matched prices and review gaps.' },
          { title: 'Shop this list', state: 'Retailer handoff', image: '/peasy-flow/shop-handoff.png', detail: 'Review the cart before leaving Peasy.' },
        ],
      },
    ],
  },
  {
    title: 'Settings',
    description: 'Every Settings destination, with the important empty, filled, and alternate states.',
    rows: [
      {
        label: 'The menu', mode: 'branches', cards: [
          { title: 'Settings', state: 'Root menu', image: '/peasy-flow/settings-synthetic-root.png', detail: 'Customize, Theme, Account, and Get help.' },
          { title: 'Theme', state: 'System / Light / Dark', image: '/peasy-flow/settings-synthetic-theme.png', detail: 'Choose appearance on the root page.' },
          { title: 'Account', state: 'Inline details', image: '/peasy-flow/settings-synthetic-root.png', detail: 'Edit name, read account email, and log out.' },
        ],
      },
      {
        label: 'Customize', mode: 'branches', cards: [
          { title: 'Meals', state: 'Preferences', image: '/peasy-ios-meal-settings-dark.png', detail: 'Meal toggles and recipe language.' },
          { title: 'Household', state: 'One member', image: '/peasy-flow/settings-synthetic-household-one.png', detail: 'Edit the primary member.' },
          { title: 'Household', state: 'Multiple members', image: '/peasy-flow/settings-synthetic-household-many.png', detail: 'Add, rename, or remove another member.' },
        ],
      },
      {
        label: 'Stores', mode: 'sequence', cards: [
          { title: 'Stores', state: 'No location', image: '/peasy-flow/stores-empty.png', detail: 'Enter a shopping ZIP to find stores.' },
          { title: 'Find stores', state: 'Search page', image: '/peasy-flow/find-stores.png', detail: 'Validate ZIP and search nearby locations.' },
          { title: 'Stores', state: 'Results & selection', image: '/peasy-flow/stores-results.png', detail: 'Choose one exact preferred store.' },
        ],
      },
      {
        label: 'Subscription', mode: 'sequence', cards: [
          { title: 'Subscription', state: 'Free', image: '/peasy-flow/subscription-free.png', detail: 'Review plan and restore purchases.' },
          { title: 'Peasy Pro', state: 'Paywall', image: '/peasy-flow/paywall.png', detail: 'Choose a plan and review purchase terms.' },
          { title: 'Subscription', state: 'Active or trial', image: '/peasy-flow/subscription-active.png', detail: 'See status and manage the current plan.' },
        ],
      },
      {
        label: 'Account & help', mode: 'branches', cards: [
          { title: 'Data Controls', state: 'Account page', image: '/peasy-flow/data-controls.png', detail: 'Review deletion and sync status.' },
          { title: 'About', state: 'Version & legal links', image: '/peasy-flow/about.png', detail: 'Open Terms or Privacy Policy.' },
          { title: 'Report app issue', state: 'Empty form', image: '/peasy-flow/report-issue-empty.png', detail: 'Choose email feedback or write a report.' },
        ],
      },
      {
        label: 'More destinations & states', mode: 'branches', cards: [
          { title: 'Terms of Service', state: 'Reading page', image: '/peasy-flow/terms.png', detail: 'Full terms open from About or account access.' },
          { title: 'Privacy Policy', state: 'Reading page', image: '/peasy-flow/privacy.png', detail: 'Full policy opens from About or account access.' },
          { title: 'Report app issue', state: 'Validation error', image: '/peasy-flow/report-issue-validation.png', detail: 'Validate, submit, retry, or confirm.' },
        ],
      },
    ],
  },
]
