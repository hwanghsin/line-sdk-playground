# line-sdk-playground (Python)

這個專案已重構為 Python 版本，用於撰寫 LINE Messaging API Webhook Bot。

## 功能
- `GET /health`：健康檢查
- `POST /callback`：LINE Webhook 入口
- 收到文字訊息時，回覆：`你說的是：<原文字>`

## 環境變數
- `LINE_CHANNEL_ACCESS_TOKEN`
- `LINE_CHANNEL_SECRET`
- `PORT`（預設 `8000`）

## 執行
```bash
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
python app.py
```
