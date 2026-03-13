---
title: "Custom Actions"
description: "Run any AI prompt on your clipboard content with Cai's Custom Action. Free-form text processing with your local LLM."
---

# Custom Actions

Custom Action is Cai's most flexible feature — it lets you run any prompt against your clipboard content using your local LLM. You can also press **⌘N** in the action window to start a new chat without clipboard content — useful for asking the LLM anything directly.

## How to Use

1. Select text and press **⌥C**
2. Choose **Custom Action** (always the first item, or press **⌘1**)
3. Type your instruction (e.g., "translate to Spanish", "make this more concise", "extract all emails")
4. Press **⌘↵** to submit
5. The result is auto-copied to your clipboard

## Example Prompts

- `Translate to French`
- `Summarize in 2 sentences`
- `Rewrite this more professionally`
- `Extract all dates mentioned`
- `Create a bullet-point list from this`
- `Fix the grammar and spelling`
- `Reply to this email politely declining`
- `Convert this to a markdown table`
- `Count the words`
- `Explain this like I'm 5`

## Requirements

Custom Action requires a running [local LLM server](/docs/getting-started/llm-setup/). If no server is connected, you'll see an error with a hint to check your settings.

> **Tip:** Custom Action appears for **every** content type, so it's always available as ⌘1 regardless of what you copied.
