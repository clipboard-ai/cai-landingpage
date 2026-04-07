---
title: "How It Works"
description: "Learn how Cai detects clipboard content, offers smart actions, and processes text with AI. Content types, context awareness, and settings."
---

# How It Works

## The Core Flow

1. **Select text** anywhere on your Mac
2. Press **⌥C** (Option+C)
3. Cai detects the content type and shows relevant actions
4. Pick an action with **↑↓** arrows or **⌘1–9**
5. The result is auto-copied to your clipboard — just **⌘V** to paste. Or send it to an [output destination](/docs/usage/destinations/) like Slack, Bear, or a webhook.

## Content Types & Actions

Cai automatically detects what you copied and offers the right actions:

| Content Type | Detection | Actions |
|---|---|---|
| **URL** | `https://...`, `www.` | Open in Browser |
| **JSON** | Valid JSON object or array | Pretty Print |
| **Meeting** | Date/time references | Create Calendar Event, Open in Maps |
| **Address** | Street patterns, "at [Place Name]" | Open in Maps |
| **Word** | 1–2 words | Define, Explain, Translate, Search |
| **Short Text** | Less than 100 characters | Explain, Reply, Fix Grammar, Translate, Search |
| **Long Text** | 100+ characters | Summarize, Reply, Fix Grammar, Translate, Search |
| **Image** | Clipboard image or screenshot | Extract Text (OCR), then all text actions |

All text types also get **Ask AI** (⌘1) for free-form AI prompts.

### Context Awareness

Cai is context-aware — it detects what app you're in (email, Slack, code editor, etc.) and tailors its actions accordingly. For example, **Reply** uses this context to generate an appropriate response based on whether you're replying to an email, a chat message, or a code review comment.

### Type to Reveal Hidden Actions

The default action list is focused per content type — you won't see Reply on a meeting invite, or Fix Grammar on a single word. When you need an action that isn't shown, just **start typing its name**: filter-to-reveal surfaces every applicable action regardless of detection.

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
- Extract text from images (OCR via Apple Vision)

**AI actions** use the [built-in model](/docs/getting-started/llm-setup/) by default, or a connected external provider:
- Summarize / Explain
- Reply (context-aware responses)
- Fix Grammar
- Translate
- Define
- Ask AI (your own prompt)

### Follow-up Questions

After any AI action returns a result, press **Tab** to ask a follow-up question. The full conversation history is sent to the LLM, so it has context from the previous result. You can chain multiple follow-ups in a single session.

Press **⌘N** to start a new chat — ask anything without clipboard content.

## Clipboard History

Press **⌘0** in the action window to open clipboard history. Features include:

- **Search** — type to filter your history
- **Pinning** — pin important items so they stay at the top
- **Configurable size** — adjust the history limit in settings

## Settings

Left-click the Cai menu bar icon to access Preferences:

| Setting | Description | Default |
|---|---|---|
| **Translation Language** | Target language for translations | English |
| **Search URL** | Base URL for web searches | Brave Search |
| **Maps Provider** | Apple Maps or Google Maps | Apple Maps |
| **Model Provider** | Built-in, LM Studio, Ollama, Cloud, or Custom | Built-in |
| **About You** | Personal context for AI responses (e.g. profession, tone) | Empty |
| **Launch at Login** | Start Cai automatically | On |
