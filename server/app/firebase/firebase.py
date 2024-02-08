import firebase_admin
from firebase_admin import credentials, initialize_app
from firebase_admin import firestore

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
        "userID": userEmail,
        "messages": []
    })

    return new_chat_ref.id
