from flask_socketio import SocketIO, emit
from app.models import Message, db
import os

if os.environ.get("FLASK_ENV") == "production":
    origins = [
        "http://tumult-websocket.onrender.com",
        "https://tumult-websocket.onrender.com"
    ]
else:
    origins = "*"

# create your SocketIO instance
socketio = SocketIO(cors_allowed_origins=origins)

@socketio.on("chat")
def handle_chat(data):
        new_chat = Message(
            message_text = data['message_text'],
            user_id = data['user_id'],
            server_id = data['server_id'],
            channel_id = data['channel_id']
        )
        print(new_chat)
        db.session.add(new_chat)
        db.session.commit()
        emit("chat", data, broadcast=True)
    # code to follow
