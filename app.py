import os
from flask import Flask, abort, request

from line_service import handle_webhook

app = Flask(__name__)


@app.get('/health')
def health() -> tuple[dict[str, str], int]:
    return {'status': 'ok'}, 200


@app.post('/callback')
def callback():
    signature = request.headers.get('X-Line-Signature', '')
    body = request.get_data(as_text=True)

    try:
        handle_webhook(body=body, signature=signature)
    except ValueError:
        abort(400)

    return 'OK', 200


if __name__ == '__main__':
    port = int(os.getenv('PORT', '8000'))
    app.run(host='0.0.0.0', port=port)
