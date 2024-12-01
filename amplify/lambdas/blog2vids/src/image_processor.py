"""Module responsible for image processing and manipulation"""

from PIL import Image
from typing import Tuple

def resize_and_crop_image(image_path: str, target_size: Tuple[int, int]) -> Image:
    """Resize and crop image to match target aspect ratio"""
    img = Image.open(image_path)
    img_ratio = img.width / img.height
    target_ratio = target_size[0] / target_size[1]

    if img_ratio > target_ratio:
        new_height = img.height
        new_width = int(new_height * target_ratio)
    else:
        new_width = img.width
        new_height = int(new_width / target_ratio)

    left = (img.width - new_width)/2
    top = (img.height - new_height)/2
    right = (img.width + new_width)/2
    bottom = (img.height + new_height)/2

    img_cropped = img.crop((left, top, right, bottom))
    img_resized = img_cropped.resize(target_size, Image.LANCZOS)
    return img_resized 