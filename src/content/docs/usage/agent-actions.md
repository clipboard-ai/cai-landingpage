---
title: "Agent-Authored Actions"
description: "Let Claude Code, Cursor, or Codex write your Cai actions over MCP. Every proposal waits for your approval, shown as a diff with risky parts flagged."
---

# Agent-Authored Actions

Cai is an MCP server. Connect a coding agent you already use — Claude Code, Cursor, or Codex — and describe the action you want in plain language. The agent writes it, you approve it in Cai, and from then on it runs from **⌥C** on its own: locally, offline, no agent and no tokens involved.

<!-- TODO: demo GIF — agent proposes an action → approval sheet → action runs from ⌥C -->

## Connect Your Agent

1. Open Cai → **Settings** → **Connections** → **Agents**
2. Pick your agent (Claude Code, Cursor, or Codex)
3. Copy the config command into your agent's MCP configuration

That's it. Your agent can now read your actions and propose new ones or changes — and nothing more. It cannot run, delete, or approve anything; every proposal waits for you in Cai.

## Approving a Proposal

When proposals are waiting, you'll see a dot on the menu bar icon, a toast on arrival, and a row at the top of the ⌥C list. Each proposal opens as a reviewable diff of the whole action, so updates show exactly what changes.

Parts worth a second look are flagged — running a shell command, putting your selection into a URL, or pasting over your selection without showing you first — and need an explicit acknowledgment before **Approve** unlocks.

## Capability Chips

Every action — agent-authored or your own — shows chips for what it can do: run shell commands, open URLs, replace your selection, use Calendar or Contacts. Cai computes them from the action's actual steps, not from what the agent claims, so they always match what would happen. You'll see them on the approval sheet, in the action list, and in Settings.

## Secrets Stay Yours

An agent can reference a [named secret](/docs/usage/secrets/) by its name (`{{secrets.NAME}}`), but never sees the value. Secrets live in the macOS Keychain and are resolved only when the action runs.

## Privacy

The connection is a small local helper your agent launches itself — no port, no listener, nothing else on your Mac or network can reach it. The agent only ever sees your action definitions, never your secrets or your selections.
