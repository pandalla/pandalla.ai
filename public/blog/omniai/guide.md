---
title: OmniAI 多模型接口调用指南
description: A guide
---

## 概述

OmniAI 提供统一的API接口，支持多种AI模型的无缝调用，包括OpenAI、Claude、Gemini、Midjourney等。本文档将详细介绍各模型的调用方法和示例。

## 基本配置

### 接口地址

将原始API地址从 `https://api.openai.com` 替换为 `https://api.pandalla.ai`

### 身份认证

使用在令牌页面`https://api.pandalla.ai/token` 生成的密钥进行API调用

**请注意：生成令牌的时候需注意分组，代表了不同的渠道消耗**

![](/public/token_index.jpg)

## OpenAI 模型调用

### Python SDK 调用示例

```python
pip install openai
from openai import OpenAI

client = OpenAI(
    base_url="https://api.pandalla.ai/v1",
    api_key="sk-xxxxxx"
)

completion = client.chat.completions.create(
    model="gpt-4o-mini",
    max_tokens=16384,
    messages=[
        {"role": "user", "content": "hi"}
    ]
)
print(completion)
```

### Curl 调用示例

#### 聊天接口

```bash
curl --request POST \
    --url https://api.pandalla.ai/v1/chat/completions \
    --header 'Authorization: Bearer sk-你的key' \
    -H "Content-Type: application/json" \
    --data '{
      "max_tokens": 1200,
      "model": "gpt-3.5-turbo",
      "temperature": 0.8,
      "messages": [
          {
              "role": "system",
              "content": "You are ChatGPT, a large language model."
          },
          {
              "role": "user",
              "content": "你是chatGPT吗？"
          }
      ]
  }'
```

#### DALL-E 图像生成

```bash
curl https://api.pandalla.ai/v1/images/generations \
    -H 'Authorization: Bearer sk-你的key' \
    -H "Content-Type: application/json" \
    -d '{
      "model": "dall-e-3",
      "prompt": "a white siamese cat",
      "n": 1,
      "size": "1024x1024"
    }'
```

#### Vision 图像识别

```bash
curl https://api.pandalla.ai/v1/chat/completions \
    -H 'Authorization: Bearer sk-你的key' \
    -H "Content-Type: application/json" \
    -d '{
      "max_tokens": 1200,
      "model": "gpt-4-vision-preview",
      "messages": [
          {
              "role": "system",
              "content": "You are an expert Tailwind developer"
          },
          {
              "role": "user",
              "content": [
                  {"type": "text", "text": "将图片生成网页代码"},
                  {
                      "type": "image_url",
                      "image_url": {
                          "url": "data:image/jpeg;base64,图片base64"
                      }
                  }
              ]
          }
      ]
  }'
```

#### Whisper 语音转文字

```bash
curl --request POST \
    --url https://api.pandalla.ai/v1/audio/transcriptions \
    --header 'Authorization: Bearer sk-你的key' \
    --header 'Content-Type: multipart/form-data' \
    --form file=@/path/to/file/openai.mp3 \
    --form model=whisper-1
```

#### 文本转语音(TTS)

```bash
curl https://api.pandalla.ai/v1/audio/speech \
    -H "Authorization: Bearer sk-你的key" \
    -H "Content-Type: application/json" \
    -d '{
      "model": "tts-1",
      "input": "你说点什么 包括中文!",
      "voice": "alloy"
    }' \
    --output speech.mp3
```

## 其他模型调用

### Claude & Gemini

对于Claude和Gemini，只需将`model`参数修改为对应模型名称即可。

### Midjourney 调用

#### 接口地址

- `https://api.pandalla.ai`

#### 模式路径

- Relax模式：`/mj-relax/mj`
- Fast模式：`/mj`或`/mj-fast/mj`
- Turbo模式：`/mj-turbo/mj`

#### Curl 示例

```bash
curl -X POST https://api.pandalla.ai/mj/submit/imagine \
  -H "Content-Type: application/json" \
  -H "mj-api-secret: sk-你的key" \
  -d '{
    "botType": "MID_JOURNEY",
    "prompt": "a cute cat",
    "base64Array": [],
    "notifyHook": "",
    "state": ""
  }'
```

### Suno 音乐生成

详细的Python示例请参考文档原始代码。

### Udio 音乐生成

详细的Python示例请参考文档原始代码。

## 注意事项

1. 请妥善保管您的API密钥
2. 遵守各平台的使用条款
3. 对于图像和音频等资源，注意版权和使用限制

## 更多帮助

如需详细支持，请联系OmniAI技术支持团队。