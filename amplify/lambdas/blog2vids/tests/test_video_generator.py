"""Test suite for video generation functionality"""

import pytest
from moviepy import AudioFileClip
import numpy as np
from scipy.io.wavfile import write
from PIL import Image
import tempfile
from src.video_generator import create_text_clip, create_video_clips
import os
@pytest.fixture
def sample_audio(request):
    """Create a test audio file"""
    duration = 2.0
    fps = 44100
    t = np.linspace(0, duration, int(fps * duration))
    audio_data = np.sin(2 * np.pi * 440 * t)  # 440 Hz sine wave
    
    with tempfile.NamedTemporaryFile(suffix='.wav', delete=False) as tmp:
        write(tmp.name, fps, audio_data.astype(np.float32))
        
    def cleanup():
        try:
            os.unlink(tmp.name)
        except OSError:
            pass
    request.addfinalizer(cleanup)
    
    return tmp.name

def test_create_text_clip():
    """Test text clip creation"""
    text = "Test text"
    video_size = (640, 480)
    duration = 2.0
    
    clip = create_text_clip(text, video_size, duration)
    assert clip.duration == duration
    assert clip.size[0] <= video_size[0]

@pytest.mark.integration
def test_create_video_clips(sample_audio, tmp_path):
    """Integration test for video clip creation"""
    image_files = [str(tmp_path / "test_img.jpg")]
    audio_files = [sample_audio]
    text_chunks = ["Test text"]
    video_size = (640, 480)
    
    # Create test image
    img = Image.fromarray(np.random.randint(0, 255, (480, 640, 3), dtype=np.uint8))
    img.save(image_files[0])
    
    clips = create_video_clips(image_files, audio_files, text_chunks, video_size)
    assert len(clips) == 1
    assert clips[0].duration == AudioFileClip(sample_audio).duration
    
    # Cleanup resized image
    resized_path = f"{image_files[0]}_resized.jpg"
    if os.path.exists(resized_path):
        os.unlink(resized_path)