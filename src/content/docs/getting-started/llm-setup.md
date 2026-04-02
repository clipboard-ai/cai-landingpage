---
title: "LLM Setup"
description: "Set up AI models for Cai. Use Apple Intelligence (recommended on macOS 26+), the built-in Ministral 3B, LM Studio, Ollama, or any OpenAI-compatible provider."
---

# LLM Setup

## Apple Intelligence (Recommended)

On Macs with an M1 chip or later running **macOS 26+**, Cai uses Apple Intelligence as the default model provider — no download needed, no setup required. If available, Cai will offer it during first launch setup.

Apple Intelligence handles all AI-powered actions: Summarize, Reply, Fix Grammar, Translate, Explain, and Ask AI.

## Built-in Model (Fallback)

On older macOS versions, Cai ships with a built-in model (**Ministral 3B**) that downloads automatically on first launch (~2.15 GB). It runs locally via Metal GPU acceleration — no external server or configuration needed.

The built-in model handles all AI-powered actions out of the box: Summarize, Reply, Fix Grammar, Translate, Explain, and Ask AI.

### Custom Models

You can also run your own GGUF models with the built-in provider. Drop any `.gguf` file into:

```
~/Library/Application Support/Cai/models/
```

Then select it from the model picker in **Settings**, or click the **chip icon** in the action view. Cai will restart the built-in server with your chosen model.

## Using an External Provider

Want to use a different or larger model? Cai works with any OpenAI-compatible server — local or remote. Just switch the provider in settings.

### Supported Providers

| Provider | Default URL | Setup |
|---|---|---|
| **LM Studio** | `http://127.0.0.1:1234/v1` | [Download](https://lmstudio.ai) → Load a model → Start server |
| **Ollama** | `http://127.0.0.1:11434/v1` | [Install](https://ollama.ai) → `ollama pull llama3.2` |
| **Jan AI** | `http://127.0.0.1:1337/v1` | [Download](https://jan.ai) → Load a model → Start server |
| **LocalAI** | `http://127.0.0.1:8080/v1` | [Setup guide](https://localai.io) |
| **Open WebUI** | `http://127.0.0.1:8080/v1` | [Install](https://openwebui.com) → Enable OpenAI API |
| **GPT4All** | `http://127.0.0.1:4891/v1` | [Download](https://gpt4all.io) → Enable API server |
| **OpenAI** | `https://api.openai.com/v1` | [Get API key](https://platform.openai.com) → Enter in Cai settings |
| **Google Gemini** | `https://generativelanguage.googleapis.com/v1beta/openai` | [Get API key](https://aistudio.google.com/apikey) → Enter in Cai settings |
| **Mistral** | `https://api.mistral.ai/v1` | [Get API key](https://console.mistral.ai) → Enter in Cai settings |
| **Custom** | User-defined | Any OpenAI-compatible server (local or cloud) |

### How to Configure

1. Left-click the **Cai menu bar icon** (or click the Cai logo in the action window footer)
2. Select your **Model Provider** from the dropdown
3. If using **Custom**, enter your server's full URL

That's it — Cai will use your external LLM instead of the built-in model.

### API Key (Optional)

If your server requires authentication (e.g., cloud providers), enter your API key in Cai's settings. The key is stored locally on your Mac and sent only to the server you configure — never to Cai or any third party.

## Recommended Models

Not sure which model to use? See our [recommended models](https://github.com/cai-layer/cai#recommended-models) for tested suggestions based on your hardware and use case.

## Verify Your Server

You can confirm your external LLM server is running by opening Terminal and running:

```bash
# LM Studio (default)
curl http://127.0.0.1:1234/v1/models

# Ollama
curl http://127.0.0.1:11434/v1/models
```

If you get a JSON response listing models, your server is ready.

> **Note:** Cai uses the OpenAI-compatible `/v1/chat/completions` endpoint. Any server (local or cloud) that implements this API will work.
