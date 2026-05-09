import os

from linebot.v3 import WebhookHandler
from linebot.v3.exceptions import InvalidSignatureError
from linebot.v3.messaging import Configuration, ApiClient, MessagingApi, ReplyMessageRequest
from linebot.v3.webhooks import MessageEvent

CHANNEL_ACCESS_TOKEN = os.getenv('LINE_CHANNEL_ACCESS_TOKEN', '')
CHANNEL_SECRET = os.getenv('LINE_CHANNEL_SECRET', '')

configuration = Configuration(access_token=CHANNEL_ACCESS_TOKEN)
handler = WebhookHandler(CHANNEL_SECRET)


@handler.add(MessageEvent)
def handle_message_event(event: MessageEvent):
    message_type = getattr(event.message, 'type', '')

    match message_type:
        case 'text':
            response_text = f'你說的是：{getattr(event.message, "text", "")}'
        case 'image':
            response_text = '收到圖片訊息！'
        case 'video':
            response_text = '收到影片訊息！'
        case 'audio':
            response_text = '收到語音訊息！'
        case 'file':
            response_text = '收到檔案訊息！'
        case 'location':
            response_text = '收到位置訊息！'
        case 'sticker':
            response_text = '收到貼圖訊息！'
        case 'unsupported':
            response_text = '收到不支援的訊息類型。'
        case _:
            response_text = f'收到 {message_type or "未知"} 類型的訊息。'

    reply_message = build_reply_message(message_type='text', payload={'text': response_text})

    with ApiClient(configuration) as api_client:
        messaging_api = MessagingApi(api_client)
        messaging_api.reply_message(
            ReplyMessageRequest(
                reply_token=event.reply_token,
                messages=[reply_message],
            )
        )


def build_reply_message(message_type: str, payload: dict) -> dict:
    """
    建立符合 LINE 官方訊息格式的回覆內容。

    所有回覆訊息都會明確帶上 `type`，並支援官方文件列出的訊息類別：
    text, image, video, audio, location, sticker, imagemap, template, flex。
    """
    supported_types = {
        'text',
        'image',
        'video',
        'audio',
        'location',
        'sticker',
        'imagemap',
        'template',
        'flex',
    }

    if message_type not in supported_types:
        raise ValueError(f'unsupported message type: {message_type}')

    message = {'type': message_type}
    message.update(payload)
    return message


def handle_webhook(body: str, signature: str) -> None:
    try:
        handler.handle(body, signature)
    except InvalidSignatureError as exc:
        raise ValueError('invalid signature') from exc
