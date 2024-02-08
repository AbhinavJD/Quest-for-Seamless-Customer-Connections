# import openai
# # client = OpenAI("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");
# openai.api_key = "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"
# # system = [{"role": "assistant",
# #            "content": "You are chatbot helping an AI Scientist."}]
# # user = [{"role": "user", "content": "brief introduction?"}]
# async def get_response_from_openai(prompt):
#     try:
#         response = await openai.Completion.create(
#             model="gpt-3.5-turbo-instruct",  # Specify the chat model
#             messages=[{"role": "system", "content": "You are a chatbot helping an AI Scientist."},
#                       {"role": "user", "content": prompt}],  # Include the user's prompt
#             max_tokens=100,  # Set the maximum number of tokens for the response
#         )
#     except Exception as e:
#         print("Error:", e)
#         return ""
#     # try:
#     #     response = await openai.ChatCompletion.create(
#     #         model="gpt-3.5-turbo",
#     #         messages=system + user,
#     #         stream=False  # Set to True if you want a streaming response
#     #     )
#     #     return response.choices[0].delta.content if response.choices else ""
#     # except Exception as e:
#     #     print("Error:", e)
#     #     return ""
import requests
import json

API_KEY = "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"

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
