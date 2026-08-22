---
title: "Secrets"
description: "Store API tokens once in Cai's Keychain-backed secret store and reference them in shell actions as {{secrets.NAME}}. Never in action text, never shown to the model."
---

# Secrets

Secrets let you store an API token or other sensitive value once and reference it by name in your actions. The value lives in the macOS Keychain and is resolved only at the moment the action runs — it never appears in the action text, is never shown to the model, and is never visible to a [connected agent](/docs/usage/agent-actions/) (an agent can reference a secret by name, nothing more).

## Adding a Secret

1. Open Cai → **Settings** → **Secrets**
2. Click **+** and give the secret a name (e.g. `GITHUB_TOKEN`) and its value
3. Or click **Import from Shell…** to pull in variables already exported in your shell environment, in one click

## Using a Secret

Reference a secret in a shell action as `{{secrets.NAME}}`:

```bash
curl -s -H "Authorization: Bearer {{secrets.API_TOKEN}}" https://api.example.com/v1/me
```

> **Scope:** secrets currently work in **shell commands only**. Using `{{secrets.NAME}}` anywhere else (or piping it through a template filter) is blocked, so the value can't end up somewhere Cai can't protect.

## How Secrets Are Protected

- **Keychain-backed** — values are stored in the macOS Keychain, never in config files or UserDefaults
- **Resolved at run time** — the value is substituted only when the shell command executes
- **Invisible to models and agents** — the LLM and any connected agent only ever see the `{{secrets.NAME}}` reference
- **Flagged at approval** — when an [agent-authored action](/docs/usage/agent-actions/) references a secret, the approval sheet calls it out so you can check the action does what it claims before granting it your token
