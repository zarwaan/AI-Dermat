import { addHeader } from "./header.js";
addHeader(document.body);
function getSessionId(){
    let id;
    if(Cookies.get('userInfo')) {
        const user = JSON.parse(Cookies.get('userInfo'));
        id = user['user_id'];
    }
    else {
        return crypto.randomUUID();
    }
}
const sessionId = getSessionId();

// Common JavaScript to handle page navigation

// document.getElementById('title').style.cursor = "pointer";
// document.getElementById('title').addEventListener('click', function() {
//     window.open("../templates/index.html", "_self");
// });

// Handle file selection button click to trigger the hidden file input
document.getElementById('select-pdf').addEventListener('click', function() {
    document.getElementById('pdf-upload').click();
});

// Update file name display when a file is selected
document.getElementById('pdf-upload').addEventListener('change', function() {
    const fileName = this.files[0] ? this.files[0].name : 'No file selected';
    document.getElementById('file-name').textContent = fileName;
});

// Handle PDF upload
document.getElementById('upload-btn').addEventListener('click', async function() {
    const fileInput = document.getElementById('pdf-upload');
    const file = fileInput.files[0];
    
    if (!file) {
        alert("Please select a PDF file first");
        return;
    }
    
    if (file.type !== 'application/pdf') {
        alert("Please upload a PDF file");
        return;
    }
    
    const formData = new FormData();
    formData.append('file', file);
    
    try {
        const statusDiv = document.getElementById('pdf-status');
        statusDiv.innerHTML = "Uploading PDF...";
        
        const response = await fetch('http://localhost:8001/upload-pdf', {
            method: 'POST',
            body: formData
        });
        
        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }
        
        const data = await response.json();
        statusDiv.innerHTML = `<b>PDF Active:</b> ${file.name} (${data.content_preview.length} characters extracted)`;
        document.getElementById('pdf-controls').classList.add('pdf-active');
        
        // Add a system message about the PDF
        addBotMessage(`I've processed the PDF "${file.name}" and will use its information to help answer your questions.`);
        
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('pdf-status').innerHTML = `Error uploading PDF: ${error.message}`;
    }
});

// Clear PDF context
document.getElementById('clear-pdf-btn').addEventListener('click', async function() {
    try {
        const response = await fetch('http://localhost:8001/clear-pdf', {
            method: 'POST'
        });
        
        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }
        
        document.getElementById('pdf-upload').value = '';
        document.getElementById('file-name').textContent = 'No file selected';
        document.getElementById('pdf-status').innerHTML = '';
        document.getElementById('pdf-controls').classList.remove('pdf-active');
        
        // Add a system message about clearing the PDF
        addBotMessage("PDF context has been cleared. I'll no longer reference it in my responses.");
        
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('pdf-status').innerHTML = `Error clearing PDF: ${error.message}`;
    }
});

// Handle message submission
document.getElementById('submit').addEventListener('click', async function() {
    sendMessage();
});

// Also trigger submit on Enter key
document.getElementById('prompt').addEventListener('keyup', function(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
});

// Function to send user messages and get bot responses
async function sendMessage() {
    const inputText = document.getElementById("prompt").value;
    if (!inputText) {
        alert("Please enter a message");
        return;
    }

    // Clear the input box
    document.getElementById("prompt").value = "";

    // Display user message
    addUserMessage(inputText);

    // Prepare the prompt for the API request
    const formdata = new FormData();
    formdata.append('prompt', inputText);
    formdata.append('session_id', sessionId);

    // Show typing indicator
    const typingIndicator = addTypingIndicator();

    // Fetch chatbot response
    try {
        const response = await fetch('http://localhost:8001/answer', {
            method: 'POST',
            body: formdata,
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }

        // Remove typing indicator
        typingIndicator.remove();

        const jsonResponse = await response.json();
        let chatbotResponse = jsonResponse['response'];
        
        // Format the response properly
        chatbotResponse = formatResponse(chatbotResponse);
        
        // Display chatbot response
        addBotMessage(chatbotResponse);

    } catch (error) {
        console.error('Error:', error);
        // Remove typing indicator if there was an error
        if (typingIndicator) typingIndicator.remove();
        addBotMessage(`I'm sorry, I encountered an error: ${error.message}. Please try again.`);
    }
}

// Helper function to add a user message to the conversation
function addUserMessage(text) {
    const userMessageDiv = document.createElement("div");
    userMessageDiv.className = "message user-message";
    userMessageDiv.innerHTML = `<p>${escapeHtml(text)}</p>`;
    document.getElementById("conversation").appendChild(userMessageDiv);
    scrollToBottom();
}

// Helper function to add a bot message to the conversation
function addBotMessage(text) {
    const botMessageDiv = document.createElement("div");
    botMessageDiv.className = "message bot-message";
    botMessageDiv.innerHTML = formatResponse(text);
    document.getElementById("conversation").appendChild(botMessageDiv);
    scrollToBottom();
}

// Add typing indicator
function addTypingIndicator() {
    const indicator = document.createElement("div");
    indicator.className = "message bot-message typing-indicator";
    indicator.innerHTML = "<p>Eugenie is typing...</p>";
    document.getElementById("conversation").appendChild(indicator);
    scrollToBottom();
    return indicator;
}

// Function to format response with proper paragraphs and styling
// function formatResponse(text) {
//     // Remove any code block indicators
//     text = text.replace(/```html|```/g, '');
    
//     // Ensure paragraphs are properly formatted
//     text = text.replace(/\n\n/g, '</p><p>');
//     text = text.replace(/\n/g, '<br>');
    
//     // If text doesn't start with a paragraph tag, wrap it in one
//     if (!text.startsWith('<p>')) {
//         text = `<p>${text}</p>`;
//     }
    
//     // If text doesn't end with a paragraph tag, add it
//     if (!text.endsWith('</p>')) {
//         text = `${text}</p>`;
//     }
    
//     return text;
// }

// Escape HTML characters to prevent XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Auto-scroll to the latest message
function scrollToBottom() {
    const conversation = document.getElementById("conversation");
    conversation.scrollTop = conversation.scrollHeight;
}

// Function to format response with proper paragraphs and styling
function formatResponse(text) {
    // Remove any code block indicators
    text = text.replace(/```html|```/g, '');
    
    // Convert bullet points (lines starting with * or - followed by space)
    text = text.replace(/^(\s*[\*\-]\s+)/gm, '<li>');
    text = text.replace(/^<li>(.*?)$/gm, '<li>$1</li>');
    
    // Wrap consecutive list items in <ul> tags
    text = text.replace(/(<li>.*?<\/li>\n)+/g, function(match) {
        return '<ul>' + match + '</ul>';
    });
    
    // Handle emphasis (text between ** or *)
    text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    text = text.replace(/\*(.*?)\*/g, '<em>$1</em>');
    
    // Handle paragraphs
    // First split by double newlines (paragraph breaks)
    const paragraphs = text.split(/\n\n+/);
    
    // Process each paragraph
    const processedParagraphs = paragraphs.map(para => {
        // If it's already a list, don't wrap it in <p> tags
        if (para.includes('<ul>')) {
            return para;
        }
        // Otherwise, wrap it in <p> tags
        return `<p>${para.replace(/\n/g, '<br>')}</p>`;
    });
    
    // Join the processed paragraphs
    return processedParagraphs.join('');
}