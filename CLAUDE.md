# Cai Landing Page

Site: https://getcai.app
Framework: Astro (static), hosted on GitHub Pages.

## Before any SEO work

Read these files first. They contain positioning rules, keyword strategy, copy guidelines, and maintenance checklists that must be followed:

1. `/Users/xyz/Documents/repos/cai/cai-clipboard-macos/_docs/research/SEO.md` — SEO reference (keywords, meta tag conventions, structured data, maintenance checklists)
2. `/Users/xyz/Documents/repos/cai/cai-clipboard-macos/_docs/research/competitive-landscape.md` — competitor analysis, positioning, prepared answers
3. `public/llms.txt` — current product description for AI crawlers (must stay in sync with SEO.md)

Key rules from those docs:
- Primary positioning: "AI action layer for macOS" (never "clipboard manager" or "AI assistant" in primary copy)
- "Clipboard AI" is a secondary/trailing keyword only (for search capture, not brand positioning)
- User-facing SEO surfaces use "terminal scripts"; technical contexts use "shell scripts"
- Avoid em-dashes in meta descriptions and llms.txt; use periods or colons instead
- "Local by default. Cloud optional." for technical surfaces; "100% Local" for hero/emotional surfaces

## Workflow preferences

- **Do NOT start the dev/preview server by default.** Use `npm run build` to verify changes. Only start the preview server (`preview_start`) when the user explicitly asks for a visual check.
- **`npm` isn't on default PATH** — prefix bash commands with `export PATH="/opt/homebrew/bin:/usr/local/bin:$PATH" && ...`
- **Comparison pages (`/vs/*`) reorders and edits**: the user frequently tunes these; changes are intentional, don't revert.

## Docs conventions

- **Section separators** — docs use `---` between major H2 sections, rendered as gradient lines via `.docs-content hr` in `DocsLayout.astro`. Don't add numbering to H2s; follow OpenRouter/Stripe convention.
- **Code blocks** — background lives on `<pre>` (not `<code>`), so horizontal scrolling shows a consistent background. See `DocsLayout.astro`.
- **Model lineup (v1.3.0)** — 2 curated MLX models: **Ministral 3B** (default, ~1.8 GB, 8 GB+ RAM) and **Qwen 2.5 7B** (power, ~4.3 GB, 16 GB+ RAM), plus **Apple Intelligence** on macOS 26+. Users can paste any HuggingFace mlx-community repo ID for custom models. *Qwen3.5 2B was tested and removed — do not add back.*
- **External providers table** — keep only: LM Studio, Ollama, OpenRouter, OpenAI, Anthropic, Google Gemini, Mistral, Custom. Niche providers (Jan AI, LocalAI, Open WebUI, GPT4All) are listed as examples in the "Custom" row for SEO without cluttering the main table.

## Comparison pages

Live at `/vs/{slug}/`:
- `chatgpt`, `raycast`, `maccy`, `alter`, `boltai` (if created — check `src/pages/vs/`)
- Each uses `ComparisonPage.astro` component with `competitor`, `tldr`, `features`, `whenCompetitor`, `whenCai`, `relatedComparisons` props.
- All pages should be honest: explicitly list what the competitor does BETTER, not just Cai's wins. Google rewards balanced comparisons.

## Homebrew

Install command: `brew tap cai-layer/cai && brew install --cask cai`
(lives in `Hero.astro` modal + FAQ — keep in sync)
