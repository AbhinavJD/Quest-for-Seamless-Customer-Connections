import firebase_admin
from firebase_admin import credentials, initialize_app
from firebase_admin import firestore
from datetime import datetime

cred = credentials.Certificate(r"app/firebase/fire-base-key.json")

firebase_admin.initialize_app(cred)

firebase_db = firestore.client()

def add_new_chat(userEmail):
    # Create a document for the user in the "users" collection
    user_ref = firebase_db.collection("users").document(userEmail)
    user_ref.set({})  # You can set any additional user data here

    # Create a subcollection named "chats" for the user
    chats_ref = user_ref.collection("chats")

    # Create a new chat document within the "chats" subcollection
    new_chat_ref = chats_ref.document()
    new_chat_ref.set({
        "createdAt": firestore.SERVER_TIMESTAMP,
        "userID": userEmail
    })

    return {
            "chatid": new_chat_ref.id,
            "messages": ['New Chat']
        }

def get_all_chat_ids(userEmail):
    # Reference to the "chats" subcollection for the user
    chats_ref = firebase_db.collection("users").document(userEmail).collection("chats")

    # Get all documents in the "chats" subcollection
    chat_docs = chats_ref.stream()

    # Extract chat IDs and messages from the documents
    chat_data = []
    for chat in chat_docs:
        chat_dict = {
            "chatid": chat.id
        }
        chat_data.append(chat_dict)

    return chat_data

def delete_chat(chatid, userEmail):
    # Reference to the specific chat document
    print("chatid-------------------------", chatid)
    chat_ref = firebase_db.collection("users").document(userEmail).collection("chats").document(chatid)

    # Check if the chat document exists
    chat_doc = chat_ref.get()
    if chat_doc.exists:
        # Delete the chat document
        chat_ref.delete()
        return True
    else:
        # Chat document not found
        return False

def save_prompt(prompt_details, user, isUser=True):
    if(isUser):
        # Construct the message object
        message_data = {
            "user": {
                "user_id": user.email,
                "user_name": user.user_name,
                "user_avatar": "https://ui-avatars.com/api/?name=" + user.user_name
            },
            "createdAt": firestore.SERVER_TIMESTAMP,
            "prompt_text": prompt_details["prompt_text"]
        }
    else:
        # Construct the message object
        message_data = {
            "user": {
                "user_id": "Assistant",
                "user_name": "AI Bot",
                "user_avatar": "avatar.png"
            },
            "createdAt": firestore.SERVER_TIMESTAMP,
            "prompt_text": prompt_details["prompt_text"]
        }

    # Specify the path to the chat document
    chat_ref = firebase_db.collection("users").document(user.email).collection("chats").document(prompt_details["chat_id"])

    # Create a new document in the "messages" subcollection
    message_ref = chat_ref.collection("messages").document()

    # Set the message data in the message document
    status = message_ref.set(message_data)

    if status:
        return True
    else :
        return False


def get_all_chat_messages(user_email, chatid):
       # Specify the path to the chat document
    chat_ref = firebase_db.collection("users").document(user_email).collection("chats").document(chatid)

    # Query the "messages" subcollection and order by createdAt in ascending order
    messages_query = chat_ref.collection("messages").order_by("createdAt", direction="ASCENDING")

    # Get all documents in the subcollection
    messages = messages_query.get()

    # Initialize an empty list to store the messages
    chat_messages = []

    # Iterate over the documents and append them to the list
    for message_doc in messages:
        # Get the data of the document
        message_data = message_doc.to_dict()
        # Append the message data to the list
        chat_messages.append(message_data)

    # Return the list of messages
    return chat_messages
