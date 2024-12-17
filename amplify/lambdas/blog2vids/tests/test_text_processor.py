"""Test suite for text processing functionality"""

import pytest
from src.text_processor import read_blog_text, split_text_into_chunks
import tempfile
import os

@pytest.fixture
def sample_text():
    return "This is a sample text with multiple words that we will use for testing the text processor functionality"

@pytest.fixture
def temp_text_file(sample_text):
    with tempfile.NamedTemporaryFile(mode='w', delete=False) as f:
        f.write(sample_text)
    yield f.name
    os.unlink(f.name)

def test_read_blog_text(temp_text_file, sample_text):
    result = read_blog_text(temp_text_file)
    assert result == sample_text

def test_split_text_into_chunks():
    text = "This is a test text that should be split into chunks of specified size"
    chunks = split_text_into_chunks(text, words_per_chunk=3)
    assert len(chunks) == 5
    assert chunks[0] == "This is a"
    assert chunks[-1] == "specified size"

def test_split_text_into_chunks_empty():
    assert split_text_into_chunks("") == []

def test_split_text_into_chunks_smaller_than_limit():
    text = "Short text."
    chunks = split_text_into_chunks(text, words_per_chunk=5)
    assert len(chunks) == 1
    assert chunks[0] == text 