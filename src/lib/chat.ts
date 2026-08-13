import type { UIMessage } from 'ai'

export type ChatMessageMetadata = {
  createdAt: number
  durationMs?: number
  finishReason?: string
  model?: string
  totalTokens?: number
}

export type PortfolioChatMessage = UIMessage<ChatMessageMetadata>

export const PORTFOLIO_PROCESS_PROMPT = 'Walk me through Jessica’s product design process with examples.'

export const PORTFOLIO_PROCESS_RESPONSE = `## How I design products

I use this process to turn ambiguous ideas into clear, testable, and buildable products. It is a loop, so I am always willing to change the direction when the evidence tells me something new.

**Frame → Learn → Reframe → Align → Explore → Scope → Prototype → Build → Measure**

### 1. Frame the real problem

I start by clarifying the user need, the business goal, the current behavior, and the technical constraints. I define what success should look like and separate what we know from what we are assuming.

This gives product, design, and engineering a shared question to solve before anyone becomes attached to a screen.

**How I use AI:** I use AI to question the brief, pull out constraints, and turn vague requirements into a working Knowns & Unknowns list. I keep every assumption labeled so a confident AI answer does not quietly become product truth.

### 2. Learn from real behavior

I review the existing product, research, analytics, support signals, market, and competitive landscape. When the evidence is thin, I talk to users or watch them complete real tasks.

My questions focus on what people do today. At Fractional, that meant market research, more than 60 interviews, and live user testing. For Vision Track, I interviewed 5 startup founders and 20 SMB leaders without pitching features to them.

**How I use AI:** I give AI the interview transcripts, notes, analytics definitions, and competitor evidence to tag themes and build source-linked comparisons. Then I check the patterns against the raw material. If the evidence conflicts, I go back to the source or talk to more users.

### 3. Synthesize and reframe

I look for patterns, contradictions, workarounds, and adoption barriers. Then I connect those findings to the business opportunity.

Vision Track began as a goal-alignment product for startup founders. The research showed that teams already understood their goals. They struggled to turn those goals into daily action, and they did not want another dashboard. I helped pivot the audience, reframe the problem, and move the experience into Slack, where the behavior was already happening.

**How I use AI:** I ask AI to generate several reframes from the same evidence and trace the observations behind each one. I do not pick the most polished answer. I compare the options against user behavior, business value, and the original research.

### 4. Bring engineering in early

Engineering constraints shape the design from the beginning. I work with developers to understand architecture, data, privacy, APIs, platform limits, accessibility, migration risk, and long-term maintenance.

On Mozilla’s privacy-focused AI assistant, I partnered with two engineers to understand on-device AI, encryption, and storage before committing to the experience. That led us toward familiar patterns and lightweight logic the team could evolve quickly.

**How I use AI:** Before engineering working sessions, I use AI to inspect documentation and code, map data flows, and surface privacy, accessibility, failure-state, and migration questions. Engineers validate the output. Anything uncertain stays a question instead of becoming a design constraint.

### 5. Explore and pressure-test directions

I make several approaches concrete enough to compare. I evaluate them against user value, business value, accessibility, familiarity, engineering effort, scalability, and risk.

For the V0 chat affordance exercise, I compared three interaction patterns against discoverability, consistency, accessibility, and engineering complexity. For Thunderbolt Skills, I tested three product and data-model directions, including the edge cases and maintenance each would create.

**How I use AI:** I use AI to produce intentionally different flows, state variations, content options, and edge-case matrices. It helps me explore more possibilities quickly. My evaluation criteria and research are what narrow them into a direction I can defend.

### 6. Scope the smallest valuable release

I treat scope as part of the design. The goal is to protect the core value while removing work that does not need to exist yet.

For Vision Track, we cut 80% of the feature ideas and focused on one reminder loop. Thunderbolt’s initial direction included editing, version history, snapshots, marketplace conflicts, and other document-management behavior. I reframed customization around skill references and helped reduce the first release from roughly six months of engineering to a one-week v1.

**How I use AI:** I use AI to turn a candidate direction into dependency maps and different cut lines. That makes it easier to see what we can defer and what would break the core loop. I bring those scenarios to product and engineering so we can choose the smallest release that still feels complete.

### 7. Prototype to answer questions

I start with flows and low-fidelity concepts, then add fidelity as the direction becomes more certain. I use prototypes to test structure, interaction, content, trust, and technical behavior.

When implementation is the main risk, I prototype in code. That exposes responsive behavior, component states, real content, and technical constraints that static screens can hide. I share work early so product, engineering, and stakeholders can react while changes are still inexpensive.

**How I use AI:** I use AI to help me build working frontend prototypes, realistic content, synthetic edge-case data, and complete state coverage. Synthetic users are useful as test fixtures, but they never replace watching real people use the product.

### 8. Design the system and build it

I define the components, tokens, responsive rules, states, accessibility behavior, and data relationships that support the experience. I like foundations that can grow through addition instead of forcing the team to redesign the same thing repeatedly.

My frontend background lets me continue into React, TypeScript, Next.js, Tailwind CSS, Shadcn UI, or Mantine UI when it is useful. Code is part of my design feedback loop. The design can still get better once it meets real production behavior.

**How I use AI:** AI helps with component scaffolding, code review, token audits, accessibility checks, and implementation documentation. I review the actual code and browser behavior before anything generated becomes part of the product.

### 9. Validate, ship, and learn

I test the riskiest behavior as early as possible through usability testing, observation, live product testing, A/B tests, analytics, or qualitative feedback. I choose signals that match the decision, such as completion, hesitation, errors, repeated hovering, or drop-off.

One lesson I took from Vision Track was to test a high-signal behavior after 5 or 6 interviews instead of waiting for complete certainty. After launch, I compare what happened with the original success criteria and use that evidence to guide the next iteration.

**How I use AI:** I use AI to transcribe and cluster test sessions, compare observed behavior with the success criteria, and draft a change log tied to evidence. Then I return to the source moments, separate observation from interpretation, and decide the next move with the team.

### What makes the process effective

- **Evidence can change the direction.** Research is useful because it affects the product.
- **Engineering is part of discovery.** Technical cost becomes visible before the team commits.
- **Scope protects the core value.** Smaller releases create learning without closing future paths.
- **Systems extend beyond screens.** Components, tokens, and data relationships reduce future rework.
- **AI work stays inspectable.** Sources, assumptions, generated alternatives, and accepted or rejected outputs remain traceable.
- **The work continues into production.** I can carry the reasoning from research through interface implementation.

The through-line is simple: AI increases the speed and range of my work. I stay accountable for the evidence, the judgment, and the experience we ship.`

export const CHAT_LIMITS = {
  maxInputCharacters: 4000,
  maxMessages: 40,
  maxRequestCharacters: 50000,
} as const
