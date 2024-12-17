"""Module responsible for reading and processing text content"""

from typing import List
from src.config import WORDS_PER_CHUNK

def read_blog_text(file_path: str) -> str:
    """Read blog text from file"""
    with open(file_path, 'r', encoding='utf-8') as f:
        return f.read()

def split_text_into_chunks(text: str, words_per_chunk: int = WORDS_PER_CHUNK) -> List[str]:
    """Split text into chunks of specified word count while preserving sentences when possible"""
    # Split into sentences while preserving punctuation
    sentences = []
    current = ""
    for char in text:
        current += char
        if char in ".!?":
            sentences.append(current)
            current = ""
    if current:  # Add any remaining text
        sentences.append(current)
        
    sentences = [s.strip() for s in sentences if s.strip()]
    
    chunks = []
    current_chunk = []
    current_word_count = 0
    
    for sentence in sentences:
        sentence_words = sentence.split()
        sentence_word_count = len(sentence_words)
        
        # If sentence is longer than chunk size, split it
        if sentence_word_count > words_per_chunk:
            words = sentence_words
            while words:
                chunk_words = words[:words_per_chunk]
                chunks.append(' '.join(chunk_words))  # Don't add period
                words = words[words_per_chunk:]
            continue
            
        # If adding this sentence would exceed word limit
        if current_word_count + sentence_word_count > words_per_chunk and current_chunk:
            # Save current chunk and start new one
            chunks.append(' '.join(current_chunk))  # Don't add period
            current_chunk = []
            current_word_count = 0
        
        # Add sentence to current chunk
        current_chunk.append(sentence)
        current_word_count += sentence_word_count
    
    # Add any remaining text
    if current_chunk:
        chunks.append(' '.join(current_chunk))  # Don't add period
    
    return chunks