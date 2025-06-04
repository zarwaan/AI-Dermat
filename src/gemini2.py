from fastapi import FastAPI, Body, File, UploadFile, Form
from fastapi.middleware.cors import CORSMiddleware
import google.generativeai as genai
import uvicorn
import PyPDF2
import io
import os
from dotenv import load_dotenv
import re

chat_memory = {}
load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure the Gemini API
gemeini_api_key = os.getenv("GEMINI_API_KEY")
genai.configure(api_key=gemeini_api_key)

# Store extracted PDF content
pdf_context = ""

@app.post('/answer')
async def answer(prompt: str = Form(...), session_id: str = Form(...)):
    global pdf_context
    global chat_memory

    history = chat_memory.get(session_id, [])
    full_prompt = ""

    # Combine chat history with current prompt
    for turn in history[-5:]:  # last 5 exchanges
        full_prompt += f"User: {turn['user']}\nBot: {turn['bot']}\n"

    full_prompt += f"User: {prompt}\n"
    
    # If we have PDF context, include it in the prompt
    if pdf_context:
        enhanced_prompt = f"""
        Context from uploaded PDF:
        {pdf_context}

        User query: {full_prompt}

        Please provide a detailed response following these formatting guidelines:
        1. Use clear paragraph breaks between distinct topics (double newlines).
        2. For lists or steps, use asterisks at the beginning of lines like:
           * First point
           * Second point
        3. Use **bold text** for important terms or headings.
        4. Use *italics* for emphasis where appropriate.
        5. Organize information in a readable, structured way.
        """
    else:
        enhanced_prompt = f"""
        User query: {full_prompt}

        Please provide a detailed response following these formatting guidelines:
        1. Use clear paragraph breaks between distinct topics (double newlines).
        2. For lists or steps, use asterisks at the beginning of lines like:
           * First point
           * Second point
        3. Use **bold text** for important terms or headings.
        4. Use *italics* for emphasis where appropriate.
        5. Organize information in a readable, structured way.
        """
    
    model = genai.GenerativeModel("gemini-1.5-flash")
    response = model.generate_content(enhanced_prompt)
    chat_memory.setdefault(session_id, []).append({"user": prompt, "bot": response.text})


    # Return the text as-is, let the frontend handle formatting
    return {
        "response": response.text
    }
    
@app.post('/upload-pdf')
async def upload_pdf(file: UploadFile = File(...)):
    global pdf_context
    
    try:
        # Read the PDF file
        contents = await file.read()
        pdf_file = io.BytesIO(contents)
        
        # Extract text from the PDF
        pdf_reader = PyPDF2.PdfReader(pdf_file)
        text = ""
        for page in pdf_reader.pages:
            text += page.extract_text() + "\n"
        
        # Store the extracted text
        pdf_context = text
        
        return {
            "message": "PDF processed successfully",
            "filename": file.filename,
            "content_preview": text[:200] + "..." if len(text) > 200 else text
        }
    except Exception as e:
        return {
            "error": f"Failed to process PDF: {str(e)}"
        }

@app.post('/clear-pdf')
async def clear_pdf():
    global pdf_context
    pdf_context = ""
    return {
        "message": "PDF context cleared"
    }

if __name__ == '__main__':
    uvicorn.run(app, host='localhost', port=8001)