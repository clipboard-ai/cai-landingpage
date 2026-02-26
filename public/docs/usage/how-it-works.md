# How It Works

## The Core Flow

1. **Select text** anywhere on your Mac
2. Press **⌥C** (Option+C)
3. Cai detects the content type and shows relevant actions
4. Pick an action with **↑↓** arrows or **⌘1–9**
5. The result is auto-copied to your clipboard — just **⌘V** to paste. Or send it to an [output destination](usage/destinations.md) like Slack, Bear, or a webhook.

## Content Types & Actions

Cai automatically detects what you copied and offers the right actions:

| Content Type | Detection | Actions |
|---|---|---|
| **URL** | `https://...`, `www.` | Open in Browser |
| **JSON** | Valid JSON object or array | Pretty Print |
| **Meeting** | Date/time references | Create Calendar Event, Open in Maps |
| **Address** | Street patterns, "at [Place Name]" | Open in Maps |
| **Word** | 1–2 words | Define, Explain, Translate, Search |
| **Short Text** | Less than 100 characters | Explain, Reply, Proofread, Translate, Search |
| **Long Text** | 100+ characters | Summarize, Reply, Proofread, Translate, Search |

All text types also get **Custom Action** (⌘1) for free-form AI prompts.

### Context Awareness

Cai is context-aware — it detects what app you're in (email, Slack, code editor, etc.) and tailors its actions accordingly. For example, **Reply** uses this context to generate an appropriate response based on whether you're replying to an email, a chat message, or a code review comment.

## Examples

- Select `"serendipity"` → Define, Explain, Translate, Search
- Select an email body → Reply, Summarize, Translate
- Select `"Let's meet Tuesday at 3pm at Starbucks"` → Create Calendar Event, Open in Maps
- Select `"123 Main St, NYC 10001"` → Open in Maps
- Select `https://github.com/...` → Open in Browser
- Select `{"name": "John"}` → Pretty Print JSON

## System Actions vs AI Actions

**System actions** work without any LLM server:
- Open URL in browser
- Open address in Maps (Apple or Google)
- Create calendar event (via ICS file — works with any calendar app)
- Web search
- Pretty print JSON

**AI actions** use the [built-in model](getting-started/llm-setup.md) by default, or a connected external provider:
- Summarize / Explain
- Reply (context-aware responses)
- Proofread
- Translate
- Define
- Custom Action (your own prompt)

## Settings

Left-click the Cai menu bar icon to access Preferences:

| Setting | Description | Default |
|---|---|---|
| **Translation Language** | Target language for translations | English |
| **Search URL** | Base URL for web searches | Brave Search |
| **Maps Provider** | Apple Maps or Google Maps | Apple Maps |
| **Model Provider** | Built-in, LM Studio, Ollama, Cloud, or Custom | Built-in |
| **Launch at Login** | Start Cai automatically | On |
