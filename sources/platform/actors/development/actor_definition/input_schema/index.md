import requests, time
    
API_KEY = "testkey"

url = "https://api.undresswith.ai/undress_api/undress"

params = {
    "file_url": "https://cdn.undresswith.ai/undresswith/images/6bde64bf9ab1aacc5b58322a2eaf8e75.jpg",
    "mask_url": "https://cdn.undresswith.ai/undresswith/masks/bd442106ef2c25097580d47ef5926405.jpeg",
    "prompt": "Nude",
    "num_images": 1,
    "ai_model_type": 3,
    "width": 512,
    "height": 680
}

headers = {
    'Content-Type': 'application/json; charset=UTF-8', 
 import requests, time
    
API_KEY = "testkey"

url = f"https://api.undresswith.ai/undress_api/check_item"

params = {
    "uid": "92d5dfb9230da41e908ec72b4db13f8d"
}

headers = {
    'Content-Type': 'application/json; charset=UTF-8',
    'Accept': 'application/json; charset=UTF-8',
    'X-Api-Key': API_KEY
}

response = requests.post(url, json=params, headers=headers)
response.raise_for_status()
print(response.json())
Request Parameters:
{
  'uid': 'The uid of the task', 
}
Response:
{
  "code": 1,
  "message": "success",
  "data": {
    "uid": "92d5dfb9230da41e908ec72b4db13f8d",
    "status": 2, // 1:processing 2:completed
    "results": [
      "https://cdn.undresswith.ai/undresswith/output/1731391761_5h69gz.png",
      "https://cdn.undresswith.ai/undresswith/output/1731849186_1vjyt8_0.png"
    ]
  }
}

    'Accept': 'application/json; charset=UTF-8',
    'X-Api-Key': API_KEY
}

response = requests.post(url, json=params, headers=headers)
response.raise_for_status()
print(response.json())
Request Parameters:
{
  "file_url": "string, URL of the image to process, jpg or png format",
  "mask_url": "string, URL of the mask image to process (optional). If not provided, a mask will be auto-generated. Auto-generated masks may have some limitations, so providing a custom mask is recommended",
  "prompt": "string, text prompt for the AI model",
  "num_images": "integer (1-2), number of images to generate",
  "ai_model_type": "integer,Intelligent editing model "width": "integer, input image width, maximum 1024",
  "height": "integer, input image height, maximum 1024"
}
Response:
{
  "code": 1,
  "message": "success",
  "data": {
    "uid": "92d5dfb9230da41e908ec72b4db13f8d",
    "estimated_time": 20 // (seconds) The estimated time to complete the task
  }
} 
import requests, time
    
API_KEY = "testkey"

url = "https://api.undresswith.ai/undress_video_api/create_task"

params = {
    "file_url": "https://cdn.undresswith.ai/undresswith/images/6bde64bf9ab1aacc5b58322a2eaf8e75.jpg",
    "prompt": "A woman takes off her clothes, exposing her breasts and nipples, naked, undressed, nude",
    "width": 512,
    "height": 680,
    "pov_id": 0,
    "duration": 5
}

headers = {
    'Content-Type': 'application/json; charset=UTF-8', 
    'Accept': 'application/json; charset=UTF-8',
    'X-Api-Key': API_KEY
}

response = requests.post(url, json=params, headers=headers)
response.raise_for_status()
print(response.json())
Request Parameters:
{
  "file_url": "string, URL of the image to process, jpg or png format",
  "prompt": "string, text prompt for the AI model",
  "width": "integer, input image width, maximum 1024",
  "height": "integer, input image height, maximum 1024",
  "pov_id": "integer, 0: Undress 1.0 (10s) 1: Blowjob (10s) 2: Missionary (8s) 3: Cumshot (10s) 4: Undress 2.0 (8s) 6: Ahegao Face (10s) 7: Show Vagina (10s) 8: Masturbation (10s) 9: Handjob (10s) 10: Titfuck (10s) 11: Cowgirl (10s) 12: Foot focus (10s) 13: Insert anal (10s) 14: Squirting (10s) 15: Deep Throat (8s) 16: Grabbing breasts (8s) 17: Pussy licking(8s) 18: Kissing (8s) 19: Penis licking (8s) 20: Doggy style (8s) 21: Having sex (8s) 23: Cum on face (8s) 24: Undress 2.0 Lite (8s) 25: Suck nipples (8s) 26: Dildo (8s) 27: Undress 2.5 (Audio) (10s) 29: Sex Smash (8s) 30: Doggy style 2.0 (8s) 31: Leg aside (8s) 32: Cowgirl 2.0 (8s) 33: Double Penis (8s) 34: Spooning Sex (8s) 35: Blowjob Sit (8s) 36: Double Blowjob (8s) 37: Lick Tits (8s) 38: Facial Piss (8s) 40: Massage Tits (8s) 41: Full Nelson (8s) 42: Dildo Ride (8s) 43: Undress 3.0 (Audio) (15s) 44: Mouthfull Cumshot (8s) 45: Face Fuck (8s) 46: Deepthroat 2.0 (8s) 47: Cum on face 2.0 (8s) 48: 69 Deepthroat (8s) 49: BBC Deepthroat (8s) 50: Self Nipple Suck (8s) 51: Creampie (8s) 52: Bukkake (8s) 53: Double Penetration (8s) 54: Doggy Anal (8s) 55: Show Anus (8s) 56: Vaginal Fisting (8s) 57: Anus Squirt (8s) 58: Missionary 2.0 (8s) 59: Cowgirl 2.1 (8s) 60: Full Nelson (Anal) (8s) 61: Spitroast (8s) 62: Pronebone (8s) 63: Cum in mouth (8s) 64: Double Penetration 2.0 (8s) 65: Reverse Cowgirl (8s) 66: Creampie 2.0 (8s) 67: Masturbation 2.0 (8s) 68: Dildo Masturbation (8s) 69: Triple Dicked (8s) 70: Back Doggy (8s) 71: Handjob 2.0 (8s) 72: Titjob 2.0 (8s) 73: Front Doggy (8s) 74: Dick Slap (8s) 75: Lifted Sex (8s) 76: Lotus Position (8s) 77: Missionary (Two) (8s) 78: Blowjob (Two) (8s) 79: Cumshot (Two) (8s)",
  "duration": "integer, 5, 8 or 10, the duration of the video. For example, if you use Undress 2.0, the maximum duration is 8. If you use Undress 3.0 (Audio), the duration can be 5, 10 or 15."
}
Response:
{
  "code": 1,
  "message": "success",
  "data": {
    "uid": "92d5dfb9230da41e908ec72b4db13f8d",
    "estimated_time": 50 // (seconds) The estimated time to complete the task
  }
}
import requests, time
    
API_KEY = "testkey"

url = f"https://api.undresswith.ai/undress_video_api/check_task"

params = {
    "uid": "92d5dfb9230da41e908ec72b4db13f8d"
}

headers = {
    'Content-Type': 'application/json; charset=UTF-8',
    'Accept': 'application/json; charset=UTF-8',
    'X-Api-Key': API_KEY
}

response = requests.post(url, json=params, headers=headers)
response.raise_for_status()
print(response.json())
Request Parameters:
Notice: Only one request per 5 seconds for the same uid.
{
  'uid': 'The uid of the task', 
}
Response:
{
  "code": 1,
  "message": "success",
  "data": {
    "uid": "92d5dfb9230da41e908ec72b4db13f8d",
    "status": 2, // 1:processing 2:completed
    "results": [
      "https://cdn.undresswith.ai/videos/e762dfaa19ce4e86bab0b03f89f58747.mp4",
    ]
  }
}


