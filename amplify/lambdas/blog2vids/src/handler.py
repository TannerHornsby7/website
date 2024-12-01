"""Main handler for blog to video conversion"""

import os
from typing import List
from moviepy import concatenate_videoclips

from .config import (
    VOICE_ID, OUTPUT_FOLDER, IMAGES_FOLDER, 
    BLOG_TEXT_FILE, PLATFORMS, BACKGROUND_IMAGE
)
from .text_processor import read_blog_text, split_text_into_chunks
from .speech_generator import generate_gtts_speech
from .video_generator import create_video_clips

def get_image_files(num_chunks: int) -> List[str]:
    """Get and prepare image files for video creation"""
    # Get images and ensure there are enough for each text chunk
    image_files = sorted([
        os.path.join(IMAGES_FOLDER, f) for f in os.listdir(IMAGES_FOLDER)
        if f.endswith(('.png', '.jpg', '.jpeg')) and f != 'cover.jpg'
    ])
    
    # Use cover image if available, otherwise use background image
    cover_image = os.path.join(IMAGES_FOLDER, 'cover.jpg')
    if not os.path.exists(cover_image):
        cover_image = BACKGROUND_IMAGE

    # Repeat images if there are fewer images than text chunks
    if len(image_files) < num_chunks - 1:
        times_to_repeat = (num_chunks - 1) // len(image_files) + 1
        image_files *= times_to_repeat
    image_files = image_files[:num_chunks - 1]  # Exclude cover image

    # Prepare image list with cover image at the beginning
    return [cover_image] + image_files

def generate_audio_files(text_chunks: List[str]) -> List[str]:
    """Generate audio files for each text chunk"""
    generated_audio_files = []
    for i, text_chunk in enumerate(text_chunks):
        audio_file = f'audio_{i}.mp3'
        audio_path = os.path.join(OUTPUT_FOLDER, audio_file)
        if generate_gtts_speech(text_chunk, audio_path):
            generated_audio_files.append(audio_path)
        else:
            print(f"Failed to generate audio for chunk {i}")
    return generated_audio_files

def main() -> None:
    """Main function to convert blog text to videos"""
    # Create output directory if it doesn't exist
    if not os.path.exists(OUTPUT_FOLDER):
        os.makedirs(OUTPUT_FOLDER)

    # Process text
    blog_text = read_blog_text(BLOG_TEXT_FILE)
    text_chunks = split_text_into_chunks(blog_text)
    
    # Get image and audio files
    image_files = get_image_files(len(text_chunks))
    audio_files = generate_audio_files(text_chunks)

    # Validate we have enough files
    if not audio_files:
        print("No audio files were generated successfully")
        return
        
    if len(audio_files) != len(text_chunks):
        print(f"Mismatch in number of audio files ({len(audio_files)}) and text chunks ({len(text_chunks)})")
        return

    # Generate videos for each platform
    for platform, size in PLATFORMS.items():
        try:
            output_video_file = os.path.join(OUTPUT_FOLDER, f'output_{platform}.mp4')
            
            # Create video clips
            clips = create_video_clips(image_files, audio_files, text_chunks, size)
            
            if not clips:
                print(f"No valid clips were created for {platform}")
                continue
            
            # Combine clips and write final video
            final_clip = concatenate_videoclips(clips, method="compose")
            final_clip.write_videofile(
                output_video_file, 
                fps=24, 
                codec='libx264', 
                audio_codec='aac'
            )
            print(f"Successfully created video for {platform}")
            
        except Exception as e:
            print(f"Error creating video for {platform}: {str(e)}")
            continue

if __name__ == '__main__':
    main()