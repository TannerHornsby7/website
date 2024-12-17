"""Module responsible for creating video clips and effects"""

import os
import numpy as np
from moviepy import TextClip, ImageClip, AudioFileClip, CompositeVideoClip, concatenate_videoclips
from typing import List, Tuple, Optional
from .config import FONT_PATH, FONT_SIZE
from .image_processor import resize_and_crop_image
import moviepy.video.fx as vfx

def validate_audio_file(audio_file: str) -> Optional[AudioFileClip]:
    """Validate and load audio file, return None if invalid"""
    try:
        if not os.path.exists(audio_file):
            print(f"Audio file not found: {audio_file}")
            return None
            
        audio_clip = AudioFileClip(audio_file)
        if not hasattr(audio_clip, 'duration') or audio_clip.duration < 0.1:
            print(f"Invalid audio duration for file: {audio_file}")
            audio_clip.close()
            return None
            
        return audio_clip
    except Exception as e:
        print(f"Error loading audio file {audio_file}: {str(e)}")
        return None

def create_text_clip(text: str, video_size: Tuple[int, int], duration: float) -> TextClip:
    """Create text clip with effects"""
    # Create basic text clip
    txt_clip = TextClip(
        text=text,
        font=FONT_PATH,
        font_size=FONT_SIZE,
        color='white',
        method='caption',
        bg_color=None,
        size=(int(video_size[0]*0.8), None),
        text_align='center'
    ).with_duration(duration)
    
    return txt_clip

def create_progress_indicator(text: str, video_size: Tuple[int, int], duration: float) -> TextClip:
    """Create a progress indicator that underlines words as they are spoken"""
    words = text.split()
    total_words = len(words)
    clips = []
    
    # Calculate word positions and timings
    for i, word in enumerate(words):
        start_time = (i / total_words) * duration
        end_time = ((i + 1) / total_words) * duration
        
        # Create underline clip for this word
        underline = TextClip(
            text="_" * len(word),
            font=FONT_PATH,
            font_size=FONT_SIZE,
            color='white',
            method='caption',
            bg_color=None,
            size=(int(video_size[0]*0.8), None),
            text_align='center'
        ).with_start(start_time).with_end(end_time)
        
        clips.append(underline)
    
    # Combine all underline clips
    progress_clip = CompositeVideoClip(clips).with_duration(duration)
    return progress_clip

def create_video_clips(image_files: List[str], audio_files: List[str], 
                      text_chunks: List[str], video_size: Tuple[int, int]) -> List[CompositeVideoClip]:
    """Create video clips with audio and effects"""
    clips = []
    processed_clips = []
    
    # Validate input lengths match
    if not (len(image_files) == len(audio_files) == len(text_chunks)):
        print("Mismatch in number of files/chunks:", 
              f"Images: {len(image_files)}, Audio: {len(audio_files)}, Text: {len(text_chunks)}")
        return clips

    for i, (img_file, audio_file, text_chunk) in enumerate(zip(image_files, audio_files, text_chunks)):
        # Validate audio file
        audio_clip = validate_audio_file(audio_file)
        if audio_clip is None:
            print(f"Skipping clip {i} due to invalid audio")
            continue
            
        duration = audio_clip.duration
        
        # Skip if duration is too short
        if duration < 1:
            print(f"Skipping clip {i} due to short duration ({duration}s)")
            audio_clip.close()
            continue

        try:
            # Process image
            if not os.path.exists(img_file):
                print(f"Image file not found: {img_file}")
                audio_clip.close()
                continue
                
            img_resized = resize_and_crop_image(img_file, video_size)
            img_resized_path = f"{img_file}_resized.jpg"
            img_resized.save(img_resized_path)

            # Create clips
            background_clip = ImageClip(img_resized_path).with_duration(duration)
            txt_clip = create_text_clip(text_chunk, video_size, duration)
            progress_clip = create_progress_indicator(text_chunk, video_size, duration)
            txt_clip = txt_clip.with_position('center')
            
            # make the text and progress indicator transparent
            masked_text = vfx.MaskColor(color=[0,0,0]).apply(txt_clip)
            masked_progress = vfx.MaskColor(color=[0,0,0]).apply(progress_clip)
            
            # Compose clips directly without masking
            composite_clip = CompositeVideoClip([background_clip, masked_text, masked_progress])
            composite_clip = composite_clip.with_audio(audio_clip)
            processed_clips.append(composite_clip)

        except Exception as e:
            print(f"Error creating clip {i}: {str(e)}")
            if audio_clip:
                audio_clip.close()
            continue
            
        finally:
            # Cleanup resized image
            if os.path.exists(img_resized_path):
                try:
                    os.remove(img_resized_path)
                except Exception as e:
                    print(f"Error cleaning up resized image: {str(e)}")

    return processed_clips