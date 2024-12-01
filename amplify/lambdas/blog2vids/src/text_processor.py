"""Module responsible for reading and processing text content"""

from typing import List
from src.config import WORDS_PER_CHUNK

def read_blog_text(file_path: str) -> str:
    """Read blog text from file"""
    with open(file_path, 'r', encoding='utf-8') as f:
        return f.read()

def split_text_into_chunks(text: str, words_per_chunk: int = WORDS_PER_CHUNK) -> List[str]:
    """Split text into chunks of specified word count"""
    words = text.split()
    chunks = []
    current_chunk = []
    
    for word in words:
        current_chunk.append(word)
        if len(current_chunk) >= words_per_chunk:
            chunks.append(' '.join(current_chunk))
            current_chunk = []
            
    if current_chunk:
        chunks.append(' '.join(current_chunk))
    
    return chunks 