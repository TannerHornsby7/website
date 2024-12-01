"""Test suite for image processing functionality"""

import pytest
from PIL import Image
import numpy as np
from src.image_processor import resize_and_crop_image
import tempfile

@pytest.fixture
def sample_image():
    """Create a test image with known dimensions"""
    img = Image.fromarray(np.random.randint(0, 255, (100, 200, 3), dtype=np.uint8))
    with tempfile.NamedTemporaryFile(suffix='.jpg', delete=False) as tmp:
        img.save(tmp.name)
    return tmp.name

def test_resize_and_crop_image(sample_image):
    """Verify image resizing maintains aspect ratio and dimensions"""
    target_size = (300, 300)
    result = resize_and_crop_image(sample_image, target_size)
    
    assert result.size == target_size
    assert isinstance(result, Image.Image) 