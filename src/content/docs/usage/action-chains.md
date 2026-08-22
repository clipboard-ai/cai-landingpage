---
title: "Action Chains"
description: "Chain AI prompts, scripts, destinations, and Apple Shortcuts into one ⌥C action. Pipe a selection through multi-step workflows and route results anywhere on macOS."
---

# Action Chains

One ⌥C, multi-step. Cai lets you chain [custom actions](/docs/usage/saved-actions/), [destinations](/docs/usage/destinations/), inline LLM transforms, and Apple Shortcuts into a single flow that runs from one keystroke. Pipe a selection through any sequence: AI prompt → script → destination → another action.

If you can describe it in steps, Cai can run it.

## How it works

Every custom action and every destination has a **"Then run"** field. Add steps and you get a chain:

1. The trigger (your ⌥C) hands the selected text to step 1
2. Step 1 runs, and its output becomes step 2's input
3. Each subsequent step receives the previous step's output
4. The final step's output lands in the result view, replaces your selection, or fires a destination, depending on its type

It works like Unix pipes — `selection | step1 | step2 | step3` — except each step can be an AI prompt, a shell command, an HTTP webhook, an AppleScript, a deeplink, or an Apple Shortcut.

## Step types

Three kinds of step you can add to a chain:

| Step | What it is |
|---|---|
| **Action** | Another custom action or destination by name. Reuse the building blocks you already have. |
| **Inline LLM** | A one-off LLM transform with a directive (e.g. "summarize as 3 bullets, no preamble"). No saved action needed. |
| **Apple Shortcut** | Any shortcut from your Shortcuts.app library, run via `shortcuts run`. Cai pipes the chain value via stdin; stdout flows back. |

For most destinations the input passes through unchanged, so you can chain them like Unix pipes: **Selection → "Save to Bear" → "Append to journal" → "Slack ping"**, all in one trigger. For webhooks and AppleScript, the response/return value becomes the next step's input.

## Examples

A few chains you can build today:

- **Translate → Replace Selection.** "Translate to German" prompt action, then "Replace Selection" destination. One keystroke replaces the source text with the translation in place.
- **Selection → Summarize → Slack.** Inline LLM step ("summarize in 2 sentences"), then a Slack webhook destination. Long messages turn into digest pings.
- **Article URL → fetch → Slack TLDR.** Shell action that `curl`s the URL, an inline LLM step ("TLDR in 3 bullets"), then a Slack webhook. Drop a link, get a digest in your team channel.
- **Selection → Save to Things.** Apple Shortcut step that creates a Things to-do from text input. Cai becomes a launcher for your existing automations.
- **Bug report → GitHub issue → Linear ticket.** Two connector destinations chained: file the same context to both trackers in one trigger.
- **Code → Explain → Append to journal.** AI prompt action that explains a code snippet, then a shell destination that appends the explanation to a daily Markdown log.

## Adding a step

From any custom action or destination editor:

1. Open **Settings → Actions → Custom** (or **Settings → Destinations**)
2. Pick the action or destination you want to extend
3. Scroll to **"Then run"** and click **Add step**
4. Choose a step type: **Action**, **Inline LLM**, or **Apple Shortcut**
5. Configure the step:
   - **Action**: pick from your saved actions and destinations
   - **Inline LLM**: write a directive (e.g. *"rewrite as a Slack message, no preamble"*)
   - **Apple Shortcut**: pick a shortcut by name from your Shortcuts library
6. Add more steps in order, drag to reorder, or delete with the trash icon
7. Click **Save**

The action or destination now carries the chain. Trigger it from ⌥C and every step runs in sequence.

## Inline LLM filters

Inside a shell or destination template, you can also chain transforms with the `|llm:"…"` filter. This runs the value through your local LLM mid-template, before the step executes:

- `{{result|llm:"translate to German"}}` — translate inside a shell command
- `{"text": "{{result|llm:\"summarize in one sentence\"}}"}` — webhook body that summarizes before sending

Filters are part of the [template syntax](/docs/usage/saved-actions/#filter-pipeline-advanced); they're a faster alternative to a full chain step when you just need one inline transform.

## Safety rails

Cai enforces a max chain depth of **10** and detects cycles (e.g. action A → action B → action A). The chain stops with a toast rather than looping forever.

Chains that include an `|llm:"…"` filter or an inline LLM step are automatically forced into background mode — local LLM generation takes too long for the foreground path. The menu bar icon pulses while the chain runs and a toast surfaces the final result.

## Requirements

- **Inline LLM** steps and chain steps that reference Prompt actions need a configured [LLM provider](/docs/getting-started/llm-setup/) (the built-in model works out of the box)
- **Apple Shortcut** steps need the named shortcut to exist in your Shortcuts.app library
- **Webhook** and **AppleScript** destinations work without an LLM if you don't transform the input

## Related

- [Custom Actions](/docs/usage/saved-actions/) — the building blocks: prompt, URL, and shell actions
- [Destinations](/docs/usage/destinations/) — webhooks, AppleScript, URL schemes, shell commands
- [Connectors](/docs/usage/connectors/) — GitHub and Linear destinations you can chain into
- [How It Works](/docs/usage/how-it-works/) — the core ⌥C flow
