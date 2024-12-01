"""Configuration settings for the video generation system"""

# 11 labs API Configuration
VOICE_ID = 'Xb7hH8MSUJpSbSDYk0k2'

# Text Processing
WORDS_PER_CHUNK = 40

# File Paths
FONT_PATH = 'assets/fonts/OpenSans/OpenSans-VariableFont_wdth,wght.ttf'
FONT_SIZE = 100
BACKGROUND_IMAGE = 'assets/images/background.jpeg'
IMAGES_FOLDER = 'assets/images'
OUTPUT_FOLDER = 'outputs'
BLOG_TEXT_FILE = 'assets/blogs/blog_test.txt'

# Video Platforms Configuration
PLATFORMS = {
    'tiktok': (1080, 1920),    # 9:16 aspect ratio
    'youtube': (1920, 1080),   # 16:9 aspect ratio
    'instagram': (1080, 1080)  # 1:1 aspect ratio
} 