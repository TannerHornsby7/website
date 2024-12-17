"""Test suite for speech generation functionality"""

import pytest
import responses
from src.speech_generator import generate_gtts_speech #, generate_11_speech
import os

@pytest.fixture
def mock_audio_response():
    """Mock audio binary data"""
    return b"mock_audio_data"

def test_generate_gtts_speech(tmp_path):
    """Test successful speech generation"""
    output_file = str(tmp_path / "test_audio.mp3")
    result = generate_gtts_speech("Test text", output_file)
    assert result == output_file
    assert os.path.exists(output_file)

# @responses.activate
# def test_generate_speech_success(mock_audio_response, tmp_path):
#     """Test successful speech generation"""
#     output_file = str(tmp_path / "test_audio.mp3")
#     voice_id = "test_voice"
    
#     # Mock successful API response
#     responses.add(
#         responses.POST,
#         f"https://api.11labs.io/v1/text-to-speech/{voice_id}",
#         body=mock_audio_response,
#         status=200
#     )
    
#     result = generate_11_speech("Test text", voice_id, output_file)
#     assert result == output_file
#     assert os.path.exists(output_file)

# @responses.activate
# def test_generate_speech_rate_limit(tmp_path):
#     """Test rate limit handling"""
#     output_file = str(tmp_path / "test_audio.mp3")
#     voice_id = "test_voice"
    
#     # Mock rate limit response
#     responses.add(
#         responses.POST,
#         f"https://api.11labs.io/v1/text-to-speech/{voice_id}",
#         json={"error": "Rate limit exceeded"},
#         status=429
#     )
    
#     result = generate_11_speech("Test text", voice_id, output_file)
#     assert result is None
