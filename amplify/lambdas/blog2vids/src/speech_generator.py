"""Module responsible for generating speech from text using 11labs API"""

import time
import requests
from typing import Optional
from src.config import API_KEY
from gtts import gTTS

def generate_gtts_speech(text: str, output_file: str) -> Optional[str]:
    """Generate speech from text and save to file using gTTS"""
    tts = gTTS(text=text, lang='en')
    tts.save(output_file)
    return output_file

def generate_11_speech(text: str, voice_id: str, output_file: str) -> Optional[str]:
    """Generate speech from text and save to file"""
    # Validate inputs
    if not text or not voice_id or not output_file:
        print("Missing required parameters")
        return None

    # Proper API endpoint
    url = f'https://api.elevenlabs.io/v1/text-to-speech/{voice_id}'
    
    headers = {
        'xi-api-key': API_KEY,
        'Content-Type': 'application/json',
        'Accept': 'audio/mpeg'  # Explicitly request MP3 format
    }
    
    data = {
        'text': text,
        'voice_settings': {
            'stability': 0.75,
            'similarity_boost': 0.75
        },
        'model_id': 'eleven_monolingual_v1'  # Specify model explicitly
    }

    max_retries = 3  # Reduced from 5 to prevent memory issues
    wait_time = 1
    session = None

    try:
        session = requests.Session()  # Use session for better memory management
        
        for attempt in range(max_retries):
            try:
                response = session.post(url, headers=headers, json=data, timeout=30)
                
                if response.status_code == 200:
                    with open(output_file, 'wb') as f:
                        f.write(response.content)
                    return output_file
                    
                elif response.status_code == 429:
                    print(f"Rate limit hit. Retrying in {wait_time} seconds...")
                    time.sleep(wait_time)
                    wait_time *= 2
                    
                else:
                    error_msg = response.json().get('detail', response.text) if response.text else 'Unknown error'
                    print(f"API Error: {response.status_code} - {error_msg}")
                    return None
                    
            except requests.exceptions.RequestException as e:
                print(f"Request failed (attempt {attempt + 1}/{max_retries}): {str(e)}")
                if attempt < max_retries - 1:
                    time.sleep(wait_time)
                    wait_time *= 2
                else:
                    return None
                    
    except Exception as e:
        print(f"Unexpected error: {str(e)}")
        return None
        
    finally:
        if session:
            session.close()
    
    print("Max retries exceeded.")
    return None 