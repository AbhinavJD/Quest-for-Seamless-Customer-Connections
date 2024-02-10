
import requests
import json
import os

from dotenv import load_dotenv
import os

# Load environment variables from .env file
load_dotenv()

# Access the environment variable
API_KEY = os.environ.get('openAIKey')

url = 'https://api.openai.com/v1/chat/completions'
headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + API_KEY,
}
async def get_response_from_openai(prompt):
    data = {
        'model': 'gpt-3.5-turbo',
        'messages': [
            {
                'role': 'assistant',
                'content': 'You are an AI Scientist of XYZ Corporation, helping client to their queries to Problems, as well as you are a personal assistant as well',
            },
            {
                'role': 'user',
                'content': prompt,
            },
        ],
    }

    try:
        response = requests.post(url, headers=headers, data=json.dumps(data))
        if response.status_code == 200:
            response_data = response.json()
            # Process response_data as needed
            print(response_data)
            gptresponse = response_data["choices"][0]["message"]["content"]
            print(gptresponse)
            return gptresponse
        else:
            print("Error:", response.text)
            return "Got Stuck, please wait! or Try again later!"
    except Exception as e:
        print("Error:", e)
