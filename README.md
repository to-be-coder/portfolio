# Jessica Cheng's UX Portfolio

A modern, responsive portfolio website built with Next.js, showcasing UX design work, projects, and blog content powered by Notion.

## 🚀 Features

- **Project Showcase**: Interactive project pages with detailed case studies
  - Mozilla (AI Design, Privacy-first)
  - Vision Track (UX Research, B2B SaaS)
  - Lilypad (UI Design, Landing Page)
  - Vercel
  - Personal hobbies (Photography, Camping)

- **Notion Integration**: Blog and content management powered by Notion API
- **AI Chat**: Interactive chat interface using OpenAI SDK
- **Responsive Design**: Mobile-first design with smooth animations
- **Scroll Spy Navigation**: Active section highlighting on scroll
- **UI Components**: Custom components built with Radix UI and Tailwind CSS

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4.0
- **UI Components**: Radix UI
- **Animations**: Framer Motion
- **Content**: Notion API
- **AI**: OpenAI SDK (Vercel AI SDK)
- **Package Manager**: Bun
- **Fonts**: Geist Sans & Geist Mono

## 📦 Getting Started

### Prerequisites

- [Bun](https://bun.sh) installed on your system

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd portfolio
```

2. Install dependencies:
```bash
bun install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

4. Configure your environment variables (see [Environment Variables](#environment-variables) below)

5. Run the development server:
```bash
bun dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🔐 Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# Notion API Configuration
NOTION_API_KEY=your_notion_api_key
NOTION_PAGES_DATABASE_ID=your_notion_database_id

# OpenAI Configuration (for chat feature)
OPENAI_API_KEY=your_openai_api_key
```

### Getting Notion API Credentials

1. Go to [Notion Integrations](https://www.notion.so/my-integrations)
2. Create a new integration
3. Copy the API key
4. Share your Notion database with the integration
5. Copy the database ID from the database URL

## 📁 Project Structure

```
portfolio/
├── src/
│   ├── app/                    # Next.js app directory
│   │   ├── (projects)/        # Project pages route group
│   │   │   ├── mozilla/
│   │   │   ├── vision-track/
│   │   │   ├── lilypad/
│   │   │   ├── vercel/
│   │   │   └── hobby/
│   │   ├── (designs)/         # UI templates route group
│   │   ├── about/             # About page
│   │   ├── blog/              # Blog pages
│   │   ├── contact/           # Contact page
│   │   ├── api/               # API routes
│   │   │   └── chat/          # Chat API endpoint
│   │   └── layout.tsx         # Root layout
│   ├── components/
│   │   ├── ui/                # Reusable UI components
│   │   ├── ui-block/          # Page-specific components
│   │   ├── demo/              # Demo components
│   │   └── magicui/           # Magic UI components
│   └── lib/
│       ├── notion.ts          # Notion API utilities
│       ├── utils.ts           # Utility functions
│       └── compose-refs.ts    # React ref composition
├── public/                    # Static assets
└── package.json
```

## 🎨 Key Components

### UI Components (`src/components/ui/`)
- Accordion
- Badge
- Button
- Card
- Navigation Menu
- Scroll Spy
- Tabs
- And more...

### Page Components (`src/components/ui-block/`)
- Header with navigation
- Footer
- Home Hero Section
- Project Cards
- Notion Content Renderer
- Chat Interface
- CTA Section

## 🧪 Development

### Available Scripts

```bash
# Start development server
bun dev

# Build for production
bun run build

# Start production server
bun run start

# Run linter
bun run lint
```

### Code Style

- TypeScript strict mode enabled
- No `any` types allowed
- Prefer `const` over `let`
- Use async/await over promises
- Direct imports (e.g., `useMemo` not `React.useMemo`)

## 🚢 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository in [Vercel](https://vercel.com)
3. Add your environment variables in the Vercel dashboard
4. Deploy!

The site will automatically deploy on every push to your main branch.

### Other Platforms

The site can be deployed to any platform that supports Next.js:
- Netlify
- AWS Amplify
- Railway
- Or any Node.js hosting service

## 📝 Content Management

Content is managed through Notion. To add or update:

1. Create or edit pages in your Notion database
2. Ensure pages have the required properties:
   - `Name` (Title)
   - `Path` (Rich text - URL slug)
   - `Date` (Date)
   - `Image` (Files)
   - `Subtitle` (Rich text)
   - `Category` (Select)
   - `Visibility` (Select - "Visible" for published)

3. The site will automatically fetch and display the content

## 🎯 Features in Detail

### Scroll Spy Navigation
The homepage features an interactive scroll spy that highlights the active project section as you scroll.

### Notion Integration
Blog posts and project content are fetched from Notion, allowing for easy content updates without code changes.

### AI Chat
Interactive chat interface powered by OpenAI, accessible via the `/api/chat` endpoint.

### Responsive Design
Mobile-first approach with breakpoints optimized for all device sizes.

## 🤝 Contributing

This is a personal portfolio project. If you'd like to use it as a template or reference, feel free to fork and adapt it to your needs!

## 📄 License

This project is private and personal. All rights reserved.

## 👤 Author

**Jessica Cheng**
- Portfolio: [jessicacheng.studio](https://jessicacheng.studio)
- UX Designer focused on privacy-first design, scalable systems, and ethical AI experiences

---

Built with ❤️ using Next.js, TypeScript, and Tailwind CSS
