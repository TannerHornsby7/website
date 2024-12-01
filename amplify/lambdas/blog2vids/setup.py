from setuptools import setup, find_packages

setup(
    name="blog2vids",
    version="0.2",
    packages=find_packages(),
    install_requires=[
        'numpy',
        'pillow',
        'moviepy',
        'requests',
        'pytest',
        'pytest-cov',
        'responses',
        'gTTS'
    ],
) 