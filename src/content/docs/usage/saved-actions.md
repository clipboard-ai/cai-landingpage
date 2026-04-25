---
title: "Custom Actions"
description: "Save frequently-used AI prompts, scripts and URL templates as custom actions in Cai. Instant access to your most common clipboard actions."
---

# Custom Actions

Custom actions let you save frequently-used prompts, scripts and URL templates for instant access. Type to filter your actions and custom actions appear inline: no menus, no setup each time.

## Three Types of Custom Actions

### Prompt Actions

Save an AI instruction you use often. When triggered, Cai sends your selected text to the LLM with your saved prompt.

**Examples:**

- `Rewrite as a professional email reply`
- `Translate to German`
- `Extract action items as a bullet list`
- `Convert to SQL query`

### URL Actions

Save a URL template with `%s` as a placeholder. When triggered, Cai replaces `%s` with your selected text and opens it in your browser.

**Examples:**

- `https://www.reddit.com/search/?q=%s`
- `https://translate.google.com/?text=%s`
- `https://en.wikipedia.org/wiki/%s`
- `https://maps.google.com/maps?q=%s`

> **Tip:** Your selected text is automatically URL-encoded, so spaces and special characters are handled for you.

### Shell Actions & Scripts

Save a shell command that runs with your selected text or as a one-off command. Use this to automate workflows, trigger scripts, or pipe text to command-line tools.

Shell actions use `{{result}}` as the placeholder for your selected text.

**Examples (from the [cai-extensions](https://github.com/cai-layer/cai-extensions) repo):**

- `echo -n '{{result}}' | base64`: encode text as Base64
- `echo '{{result}}' | tr '[:lower:]' '[:upper:]'`: uppercase
- `echo -n '{{result}}' | md5`: MD5 hash
- `lsof -ti :'{{result}}' | xargs kill -9`: kill the process on a given port
- `say '{{result}}'`: read your selected text aloud
- `curl -s ifconfig.me | pbcopy`: copy your public IP (no placeholder needed)

> **⚠️ Always wrap `{{result}}` in single quotes: `'{{result}}'`.** Cai escapes any single quotes inside your text (so `it's` stays safe), but it's your responsibility to wrap the placeholder. Without quotes, spaces, `&`, `?`, newlines, and other shell metacharacters in your selection will break the command. Double quotes (`"{{result}}"`) are **not safe** — shell variables (`$foo`), backticks, and backslashes inside your text will still be interpreted.

> **Caution:** Shell actions execute with your user-level permissions and can modify files, send network requests, and control other applications. Only create shell actions if you understand exactly what the command does. Never paste commands from untrusted sources.

#### Shell Action Tips

- **`command not found`?** Shell actions run in a non-interactive zsh that doesn't load your `~/.zshrc`, so tools like `gh`, `node`, or `python` installed via Homebrew may not be on `PATH`. Use the absolute path: `/opt/homebrew/bin/gh …` on Apple Silicon, `/usr/local/bin/gh …` on Intel. Find it with `which gh` in Terminal.
- **15-second timeout.** Long-running scripts will be killed. For slower tools, run them in the background (`… &`) or write a small wrapper that returns quickly.
- **Newlines in selected text.** Multi-line selections work with single-quote wrapping, but commands like `say`, `open`, and URL-builders may behave unexpectedly. Collapse newlines first if needed: `echo '{{result}}' | tr '\n' ' '`.

## Auto Replace Selection

For **Prompt** actions, you can enable the **"Auto replace selection"** toggle. When triggered, the action:

1. Dismisses Cai immediately
2. Runs the LLM in the background
3. Pastes the result directly over your original selection

This skips the result view entirely. Perfect for actions like "Fix Grammar," "Translate to German," or "Make Professional" where you always want the result to replace the source text.

## Creating Custom Actions

1. Left-click the **Cai menu bar icon** to open Preferences
2. Click **Custom Actions**
3. Click the add button and fill in:
   - **Name**: what you'll see in the action list
   - **Type**: Prompt, URL, or Shell
   - **Value**: the prompt instruction, URL template (use `%s` for your selected text, auto-encoded), or shell command (wrap `{{result}}` in single quotes — see [Shell Actions](#shell-actions) above)
4. For Prompt actions, optionally enable **"Auto replace selection"** to replace the selected text inline
5. Click **Save**

You can edit or delete existing custom actions from the same screen.

## Using Custom Actions

Custom actions appear when you **type to filter** in the action window:

1. Select text and press **⌥C**
2. Start typing to filter — your custom actions matching the search appear alongside built-in actions
3. Use **⌘1–9** or arrow keys to pick one
4. The action executes immediately

**Example:** You have a custom action named "Reddit Search". Type `red` and it appears. Press Enter or its ⌘ number to search Reddit with your selected text.

## Requirements

- **Prompt actions** require a running [local LLM server](/docs/getting-started/llm-setup/)
- **URL actions** work without any LLM — they just open your browser
- **Shell actions** work without any LLM — they execute the command directly
