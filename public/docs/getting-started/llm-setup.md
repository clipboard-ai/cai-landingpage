# LLM Setup

## Built-in Model

Cai ships with a built-in model (**Ministral 3B**) that downloads automatically on first launch (~2.15 GB). It runs locally via Metal GPU acceleration — no external server or configuration needed.

The built-in model handles all AI-powered actions out of the box: Summarize, Reply, Proofread, Translate, Explain, and Custom Actions.

## Using an External Provider

Want to use a different or larger model? Cai works with any local OpenAI-compatible server. Just switch the provider in settings.

### Supported Providers

| Provider | Default URL | Setup |
|---|---|---|
| **LM Studio** | `http://127.0.0.1:1234/v1` | [Download](https://lmstudio.ai) → Load a model → Start server |
| **Ollama** | `http://127.0.0.1:11434/v1` | [Install](https://ollama.ai) → `ollama pull llama3.2` |
| **Jan AI** | `http://127.0.0.1:1337/v1` | [Download](https://jan.ai) → Load a model → Start server |
| **LocalAI** | `http://127.0.0.1:8080/v1` | [Setup guide](https://localai.io) |
| **Open WebUI** | `http://127.0.0.1:8080/v1` | [Install](https://openwebui.com) → Enable OpenAI API |
| **GPT4All** | `http://127.0.0.1:4891/v1` | [Download](https://gpt4all.io) → Enable API server |
| **Custom** | User-defined | Any local OpenAI-compatible server |

### How to Configure

1. Left-click the **Cai menu bar icon** (or click the Cai logo in the action window footer)
2. Select your **Model Provider** from the dropdown
3. If using **Custom**, enter your server's full URL

That's it — Cai will use your external LLM instead of the built-in model.

## Recommended Models

Not sure which model to use? See our [recommended models](https://github.com/soyasis/cai#recommended-models) for tested suggestions based on your hardware and use case.

## Verify Your Server

You can confirm your external LLM server is running by opening Terminal and running:

```bash
# LM Studio (default)
curl http://127.0.0.1:1234/v1/models

# Ollama
curl http://127.0.0.1:11434/v1/models
```

If you get a JSON response listing models, your server is ready.

> [!NOTE]
> Cai uses the OpenAI-compatible `/v1/chat/completions` endpoint. Any local server that implements this API will work.
