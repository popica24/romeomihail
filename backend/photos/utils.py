from PIL import Image
from io import BytesIO
from django.core.files.uploadedfile import InMemoryUploadedFile
import sys

def compress_image(image, quality=50, max_width=2900, max_height=1500):
    """
    Compress and resize a JPG image before saving.
    
    Args:
        image: The uploaded image file
        quality: JPEG quality (1-100, default 85)
        max_width: Maximum width in pixels (default 1920)
        max_height: Maximum height in pixels (default 1920)
    
    Returns:
        InMemoryUploadedFile: Compressed image ready for saving
    """
    # Open the image
    img = Image.open(image)
    
    # Convert to RGB if necessary (handles PNG with transparency, etc.)
    if img.mode in ('RGBA', 'LA', 'P'):
        img = img.convert('RGB')
    
    # Get original dimensions
    width, height = img.size
    
    # Calculate new dimensions maintaining aspect ratio
    if width > max_width or height > max_height:
        ratio = min(max_width / width, max_height / height)
        new_width = int(width * ratio)
        new_height = int(height * ratio)
        img = img.resize((new_width, new_height), Image.LANCZOS)
    
    # Save to BytesIO object
    output = BytesIO()
    img.save(output, format='JPEG', quality=quality, optimize=True)
    output.seek(0)
    
    # Create InMemoryUploadedFile
    compressed_image = InMemoryUploadedFile(
        output,
        'ImageField',
        f"{image.name.split('.')[0]}.jpg",
        'image/jpeg',
        sys.getsizeof(output),
        None
    )
    
    return compressed_image
