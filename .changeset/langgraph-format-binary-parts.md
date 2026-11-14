---
"@openuidev/react-headless": patch
---

`langGraphMessageFormat` now sends a user message's binary parts (images) as `image_url` content blocks, as `openAIMessageFormat` does. It used to pass the AG-UI `binary` part through unchanged, which LangChain chat models reject, so a message with an attachment failed the run.
