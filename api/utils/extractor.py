import docx2txt
import PyPDF2
import io
import os
import logging
from typing import Union
from fastapi import HTTPException, UploadFile
from pathlib import Path
import tempfile

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Constants
MAX_FILE_SIZE = 10 * 1024 * 1024  # 10MB
ALLOWED_EXTENSIONS = {'.txt', '.docx', '.pdf'}
ALLOWED_MIME_TYPES = {
    'text/plain': '.txt',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': '.docx',
    'application/pdf': '.pdf'
}

class FileExtractionError(Exception):
    """Custom exception for file extraction errors"""
    pass

def validate_file(file: UploadFile) -> None:
    """
    Validate file before processing
    
    Args:
        file: UploadFile from FastAPI
    Raises:
        HTTPException: If file is invalid
    """
    if not file or not file.filename:
        raise HTTPException(status_code=400, detail="No file provided")

    # Check file size
    file.file.seek(0, 2)  # Seek to end
    size = file.file.tell()
    file.file.seek(0)  # Reset position
    
    if size > MAX_FILE_SIZE:
        raise HTTPException(
            status_code=400,
            detail=f"File too large. Maximum size is {MAX_FILE_SIZE/1024/1024}MB"
        )

    # Validate extension
    ext = Path(file.filename).suffix.lower()
    if ext not in ALLOWED_EXTENSIONS:
        raise HTTPException(
            status_code=400,
            detail=f"Unsupported file type. Supported types: {', '.join(ALLOWED_EXTENSIONS)}"
        )

    # Validate content type
    content_type = file.content_type
    if content_type not in ALLOWED_MIME_TYPES:
        raise HTTPException(
            status_code=400,
            detail="Invalid content type"
        )

    # Check content type matches extension
    if ALLOWED_MIME_TYPES[content_type] != ext:
        raise HTTPException(
            status_code=400,
            detail="File extension doesn't match content type"
        )

def extract_text(file: UploadFile) -> str:
    """
    Extract text from various file formats
    
    Args:
        file: UploadFile from FastAPI
    Returns:
        str: Extracted text content
    Raises:
        HTTPException: If file processing fails
    """
    try:
        validate_file(file)
        contents = file.file.read()
        ext = Path(file.filename).suffix.lower()

        if ext == '.txt':
            try:
                return contents.decode('utf-8')
            except UnicodeDecodeError:
                raise FileExtractionError("Invalid text file encoding")

        elif ext == '.docx':
            with tempfile.NamedTemporaryFile(suffix='.docx', delete=False) as temp_file:
                try:
                    temp_file.write(contents)
                    temp_file.flush()
                    text = docx2txt.process(temp_file.name)
                    if not text.strip():
                        raise FileExtractionError("No text content found in DOCX file")
                    return text
                except Exception as e:
                    raise FileExtractionError(f"Failed to process DOCX file: {str(e)}")
                finally:
                    # Clean up temp file
                    try:
                        os.unlink(temp_file.name)
                    except Exception as e:
                        logger.error(f"Failed to delete temporary file: {str(e)}")

        elif ext == '.pdf':
            try:
                pdf = PyPDF2.PdfReader(io.BytesIO(contents))
                
                if len(pdf.pages) == 0:
                    raise FileExtractionError("PDF file is empty")
                
                if pdf.is_encrypted:
                    raise FileExtractionError("Cannot process encrypted PDF files")
                
                text = " ".join(
                    page.extract_text() 
                    for page in pdf.pages 
                    if page.extract_text()
                )
                
                if not text.strip():
                    raise FileExtractionError("No text could be extracted from PDF")
                
                return text
                
            except PyPDF2.PdfReadError as e:
                raise FileExtractionError(f"Invalid or corrupted PDF file: {str(e)}")
            
    except FileExtractionError as e:
        logger.error(f"Extraction error for file {file.filename}: {str(e)}")
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        logger.error(f"Unexpected error processing file {file.filename}: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error during file processing")
    finally:
        file.file.close()
