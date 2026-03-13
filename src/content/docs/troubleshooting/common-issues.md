---
title: "Common Issues"
description: "Troubleshoot common Cai issues. Fix global hotkey problems, LLM connection errors, date detection, and formatting issues."
---

# Common Issues

## Global hotkey doesn't work

- Open **System Settings → Privacy & Security → Accessibility** and make sure Cai is listed and **enabled**
- If it's listed but still not working, remove Cai from the list, then re-add it
- Check that no other app is using ⌥C (or your custom hotkey) — e.g., Raycast, Alfred, BetterTouchTool

## LLM not connecting

- Verify your server is running:
  ```bash
  curl http://127.0.0.1:1234/v1/models
  ```
- Check that the URL in Preferences matches your server's address and port
- Ollama uses port `11434`, LM Studio uses `1234` — make sure you selected the right provider
- If using a Custom URL, make sure it includes the full path (e.g., `http://127.0.0.1:1234/v1`)

## Date/meeting not detected

- Detection works best with English dates ("Tuesday at 3pm", "lunch tomorrow at noon")
- Try rephrasing: "3pm tomorrow" instead of "tomorrow 15h"
- Some informal formats may not be recognized — explicit dates work most reliably

## Calendar event has wrong details

Cai generates ICS files from detected text. For best results, include a clear date/time and optionally a location in the copied text. The ICS file opens in your default calendar app, where you can review and edit before saving.

## Result text looks odd

Cai renders results as Markdown. If your LLM returns unexpected formatting, try a different model or adjust your custom prompt to request plain text output.
