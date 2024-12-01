"""Shared test configurations and fixtures"""

import pytest
import os
import tempfile
from PIL import Image
import numpy as np

@pytest.fixture(scope="session")
def test_assets():
    """Create temporary test assets"""
    with tempfile.TemporaryDirectory() as tmpdir:
        # Create test image
        img_path = os.path.join(tmpdir, "test.jpg")
        img = Image.fromarray(np.random.randint(0, 255, (100, 100, 3), dtype=np.uint8))
        img.save(img_path)
        
        # Create test audio
        audio_path = os.path.join(tmpdir, "test.mp3")
        with open(audio_path, 'wb') as f:
            f.write(b"mock_audio_data")
            
        yield {
            'image': img_path,
            'audio': audio_path,
            'dir': tmpdir
        }

@pytest.fixture
def mock_config(monkeypatch):
    """Mock configuration settings"""
    mock_settings = {
        'API_KEY': 'test_key',
        'VOICE_ID': 'test_voice',
        'WORDS_PER_CHUNK': 10,
        'FONT_PATH': 'path/to/font.ttf',
    }
    
    for key, value in mock_settings.items():
        monkeypatch.setattr(f"config.{key}", value) 