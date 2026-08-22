---
title: "Cai Documentation"
description: "Documentation for Cai, the action layer for macOS. Installation, LLM setup, custom actions, agent-authored actions, secrets, connectors, and keyboard shortcuts."
---

# Cai Documentation

Act on anything. Locally.

## Quick Start

1. [Download and install Cai](/docs/getting-started/installation/)
2. [Pick a model](/docs/getting-started/llm-setup/) (optional — the built-in one downloads automatically)
3. Select any text or image and press **⌥C**

## What is Cai?

Cai is a native macOS menu bar app that turns what you select into action. Select a meeting invite and it creates a calendar event. Select an address and it opens Maps. Select any text and ask AI to summarize or translate, or pipe it to a shell script, all without leaving your keyboard.

- **Simple and fast**: one shortcut, one menu, no launcher or bloat
- **Flexible models**: built-in MLX (default), Apple Intelligence, or any local/cloud provider
- **Context aware**: Reply adapts to email vs Slack, actions adapt to content type
- **Keyboard first**: trigger with ⌥C, navigate with arrows, execute with ⌘1–9
- **Local by default**: no accounts, no forced cloud, no telemetry

## Guides

- **[How It Works](/docs/usage/how-it-works/)**: content detection, actions, Ask AI, and settings
- **[Keyboard Shortcuts](/docs/usage/keyboard-shortcuts/)**: full shortcut reference
- **[Custom Actions](/docs/usage/saved-actions/)**: save prompt, shell, and URL actions for instant access
- **[Destinations](/docs/usage/destinations/)**: send results to any app or service
- **[Action Chains](/docs/usage/action-chains/)**: multi-step workflows from one keystroke
- **[Secrets](/docs/usage/secrets/)**: Keychain-backed tokens for shell actions, referenced as `{{secrets.NAME}}`
- **[Agent-Authored Actions](/docs/usage/agent-actions/)**: let Claude Code, Cursor, or Codex write actions for you; every proposal waits for your approval
- **[Connectors](/docs/usage/connectors/)**: create GitHub and Linear issues from your selection
- **[System Access](/docs/usage/system-access/)**: on-demand macOS permissions (Calendar, Contacts, Reminders)
- **[Extensions](/docs/usage/extensions/)**: install community-built actions and destinations
- **[Troubleshooting](/docs/troubleshooting/common-issues/)**: common issues and fixes
