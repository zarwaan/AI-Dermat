// // Import statement commented out as in the original
// // import { addHeader } from "./header.js";

// import { addHeader } from "./header.js";
// addHeader(document.body);

// const input = document.getElementById('imageInput');
// const dragDropArea = document.querySelector(".drag-drop-area");
// const previewImage = document.getElementById('preview-image');
// const uploadButton = document.querySelector('.upload-button-cont .upload-btn');
// const responseElement = document.getElementById('response');
// let imagePresent = false;
// let hasInitialized = false; // Flag to track if first initialization already happened
// let uploadDialogOpen = false; // Track if file dialog is open

// // Prevent default drag behaviors on the whole document
// document.addEventListener('dragover', function(e) {
//     e.preventDefault();
// }, false);

// document.addEventListener('drop', function(e) {
//     e.preventDefault();
// }, false);

// // Drag and drop functionality
// dragDropArea.addEventListener('dragover', (ev) => {
//     ev.preventDefault();
//     dragDropArea.classList.add('dragged-over');
//     if (imagePresent) {
//         previewImage.style.opacity = '0.6';
//     }
// });

// dragDropArea.addEventListener('dragleave', () => {
//     dragDropArea.classList.remove('dragged-over');
//     if (imagePresent) {
//         previewImage.style.opacity = '1';
//     }
// });

// dragDropArea.addEventListener('drop', (ev) => {
//     ev.preventDefault();
//     ev.stopPropagation(); // Stop event propagation
    
//     dragDropArea.classList.remove('dragged-over');
//     if (imagePresent) {
//         previewImage.style.opacity = '1';
//     }
    
//     const file = ev.dataTransfer.files[0];
//     if (file && file.type.startsWith('image/')) {
//         // Use this approach to set the files
//         const dt = new DataTransfer();
//         dt.items.add(file);
//         input.files = dt.files;
        
//         showImagePreview({ files: [file] });
//     } else {
//         showError('Please upload an image file.');
//     }
// });

// // Completely remove and recreate the click handler for the drag area
// function setupDragAreaClickHandler() {
//     // Remove old click event listeners by cloning
//     const oldDragArea = dragDropArea;
//     const newDragArea = oldDragArea.cloneNode(true);
//     oldDragArea.parentNode.replaceChild(newDragArea, oldDragArea);
//     // oldDragArea.replaceWith(newDragArea);
    
//     // Add a single new click handler
//     newDragArea.addEventListener('click', function(ev) {
//         // Only open file dialog if user didn't click on preview image
//         if ((!imagePresent || ev.target !== previewImage) && !uploadDialogOpen) {
//             ev.preventDefault();
//             ev.stopPropagation();
            
//             uploadDialogOpen = true;
            
//             // Use a timeout to prevent double dialog issues
//             setTimeout(() => {
//                 input.click();
                
//                 // Reset flag after dialog should be closed
//                 setTimeout(() => {
//                     uploadDialogOpen = false;
//                 }, 1000);
//             }, 10);
//         }
//     });
    
//     return newDragArea;
// }

// // Clear any existing event listeners and set up a clean one for the input
// function setupInputChangeHandler() {
//     // Remove any existing handlers by cloning and replacing the element
//     const oldInput = input;
//     const newInput = oldInput.cloneNode(true);
//     oldInput.parentNode.replaceChild(newInput, oldInput);
//     // oldInput.replaceWith(newInput);
    
//     // Add a fresh handler
//     newInput.addEventListener('change', function(e) {
//         // Immediately prevent further clicks while processing
//         uploadDialogOpen = true;
        
//         showImagePreview(this);
        
//         // Reset flag after a delay
//         setTimeout(() => {
//             uploadDialogOpen = false;
//         }, 1000);
//     });
    
//     return newInput;
// }

// // Initialize event listeners only once
// function initialize() {
//     if (hasInitialized) return;
    
//     // Completely reset our event handlers
//     const newDragArea = setupDragAreaClickHandler();
//     const newInput = setupInputChangeHandler();
    
//     // Update our references globally
//     window.dragDropArea = newDragArea;
//     window.imageInput = newInput;
    
//     hasInitialized = true;
// }

// // Show image preview when file is selected
// function showImagePreview(input) {
//     const files = input.files;
//     if (!files || files.length === 0) return;
    
//     const file = files[0];
    
//     if (!file.type.startsWith('image/')) {
//         showError('Please select an image file.');
//         return;
//     }
    
//     imagePresent = true;
//     responseElement.innerHTML = '';
    
//     // Show the image preview
//     const reader = new FileReader();
//     reader.onload = function(e) {
//         const previewImg = document.getElementById('preview-image');
//         previewImg.src = e.target.result;
//         previewImg.style.display = 'block';
//         previewImg.style.animation = 'grow 0.5s';
        
//         // Hide upload icon and text when preview is shown
//         const currentDragArea = window.dragDropArea || dragDropArea;
//         const uploadIcon = currentDragArea.querySelector('svg');
//         const uploadText = currentDragArea.querySelector('.upload-text');
//         const uploadHint = currentDragArea.querySelector('.upload-hint');
        
//         if (uploadIcon) uploadIcon.style.display = 'none';
//         if (uploadText) uploadText.style.display = 'none';
//         if (uploadHint) uploadHint.style.display = 'none';
        
//         // Necessary to prevent dialog from reappearing
//         uploadDialogOpen = false;
//     };
    
//     reader.readAsDataURL(file);
// }

// // Reset the upload area to initial state
// function resetUpload() {
//     imagePresent = false;
//     input.value = '';
//     previewImage.style.display = 'none';
//     previewImage.src = '';
//     responseElement.innerHTML = '';
    
//     // Show upload elements again
//     const currentDragArea = window.dragDropArea || dragDropArea;
//     const uploadIcon = currentDragArea.querySelector('svg');
//     const uploadText = currentDragArea.querySelector('.upload-text');
//     const uploadHint = currentDragArea.querySelector('.upload-hint');
    
//     if (uploadIcon) uploadIcon.style.display = 'block';
//     if (uploadText) uploadText.style.display = 'block';
//     if (uploadHint) uploadHint.style.display = 'block';
// }

// // Upload image to server
// async function uploadImage() {
//     const file = input.files[0];

//     if (!file) {
//         showError('Please select an image file.');
//         return;
//     }

//     // Show loading spinner
//     responseElement.innerHTML = '<div class="spinner"></div>';
//     uploadButton.disabled = true;
//     uploadButton.innerText = 'Analyzing...';

//     const formData = new FormData();
//     formData.append('file', file);

//     try {
//         const response = await fetch('http://localhost:8000/predict', {
//             method: 'POST',
//             body: formData,
//         });

//         if (!response.ok) {
//             throw new Error(`Error: ${response.statusText}`);
//         }

//         const jsonResponse = await response.json();
        
//         // Format the response with better styling
//         responseElement.innerHTML = `
//             <div class="result-card">
//                 <div class="result-title">Analysis Result</div>
//                 <div class="result-class">
//                     <strong>Condition:</strong> ${jsonResponse['class']}
//                 </div>
//                 <div class="result-confidence">
//                     <strong>Confidence:</strong> ${(jsonResponse['confidence'] * 100).toFixed(1)}%
//                 </div>
//                 <button id="analyze-another" class="upload-btn" style="margin-top: 15px; width: 100%;">Analyze Another Image</button>
//             </div>
//         `;
        
//         // Add event listener to the "Analyze Another Image" button
//         document.getElementById('analyze-another').addEventListener('click', resetUpload);
        
//     } catch (error) {
//         console.error('Error:', error);
//         showError(`Error: ${error.message}`);
//     } finally {
//         uploadButton.disabled = false;
//         uploadButton.innerText = 'Analyze Image';
//     }
// }

// // Show error message
// function showError(message) {
//     responseElement.innerHTML = `<div class="error-message">${message}</div>`;
// }

// // Make sure uploadImage function is globally available
// window.uploadImage = uploadImage;

// // Completely reset all event handlers before attaching new ones
// function completeReset() {
//     hasInitialized = false;
//     uploadDialogOpen = false;
    
//     // Ensure we're using the latest references
//     const latestInput = document.getElementById('imageInput');
//     const latestDragArea = document.querySelector(".drag-drop-area");
    
//     // Completely clone and replace to remove all event listeners
//     const newInput = latestInput.cloneNode(true);
//     latestInput.parentNode.replaceChild(newInput, latestInput);
    
//     const newDragArea = latestDragArea.cloneNode(true);
//     latestDragArea.parentNode.replaceChild(newDragArea, latestDragArea);
    
//     // Update global references if needed
//     window.imageInput = newInput;
//     window.dragDropArea = newDragArea;
    
//     // Re-initialize
//     initialize();
// }

// // Initialize the page with fresh event handlers
// document.addEventListener('DOMContentLoaded', completeReset);

// // Call initialize immediately too, in case the DOM is already loaded
// completeReset();

// Import statement for header
import { addHeader } from "./header.js";
addHeader(document.body);

document.addEventListener('DOMContentLoaded', function() {
    // Get all necessary elements
    const input = document.getElementById('imageInput'); 
    const dragDropArea = document.querySelector(".drag-drop-area");
    const previewImage = document.getElementById('preview-image');
    const uploadButton = document.getElementById('analyzeBtn');
    const responseElement = document.getElementById('response');
    let imagePresent = false;
    let uploadDialogOpen = false; // Track if file dialog is open

    // Prevent default drag behaviors
    document.addEventListener('dragover', function(e) {
        e.preventDefault();
    }, false);

    document.addEventListener('drop', function(e) {
        e.preventDefault();
    }, false);

    // Drag and drop functionality
    dragDropArea.addEventListener('dragover', (ev) => {
        ev.preventDefault();
        dragDropArea.classList.add('dragged-over');
        if (imagePresent) {
            previewImage.style.opacity = '0.6';
        }
    });

    dragDropArea.addEventListener('dragleave', () => {
        dragDropArea.classList.remove('dragged-over');
        if (imagePresent) {
            previewImage.style.opacity = '1';
        }
    });

    dragDropArea.addEventListener('drop', (ev) => {
        ev.preventDefault();
        ev.stopPropagation();
        
        dragDropArea.classList.remove('dragged-over');
        if (imagePresent) {
            previewImage.style.opacity = '1';
        }
        
        const file = ev.dataTransfer.files[0];
        if (file && file.type.startsWith('image/')) {
            const dt = new DataTransfer();
            dt.items.add(file);
            input.files = dt.files;
            
            showImagePreview();
        } else {
            showError('Please upload an image file.');
        }
    });

    // Click handler for drag area
    dragDropArea.addEventListener('click', function(ev) {
        // Only open file dialog if user didn't click on preview image
        if ((!imagePresent || ev.target !== previewImage) && !uploadDialogOpen) {
            ev.preventDefault();
            ev.stopPropagation();
            
            uploadDialogOpen = true;
            
            setTimeout(() => {
                input.click();
                
                setTimeout(() => {
                    uploadDialogOpen = false;
                }, 1000);
            }, 10);
        }
    });

    // File input change handler
    input.addEventListener('change', function() {
        uploadDialogOpen = true;
        showImagePreview();
        
        setTimeout(() => {
            uploadDialogOpen = false;
        }, 1000);
    });

    // Analyze button click handler
    uploadButton.addEventListener('click', uploadImage);

    // Show image preview when file is selected
    function showImagePreview() {
        const files = input.files;
        if (!files || files.length === 0) return;
        
        const file = files[0];
        
        if (!file.type.startsWith('image/')) {
            showError('Please select an image file.');
            return;
        }
        
        imagePresent = true;
        responseElement.innerHTML = '';
        
        // Show the image preview
        const reader = new FileReader();
        reader.onload = function(e) {
            previewImage.src = e.target.result;
            previewImage.style.display = 'block';
            previewImage.style.animation = 'grow 0.5s';
            
            // Hide upload icon and text when preview is shown
            const uploadIcon = dragDropArea.querySelector('svg');
            const uploadText = dragDropArea.querySelector('.upload-text');
            const uploadHint = dragDropArea.querySelector('.upload-hint');
            
            if (uploadIcon) uploadIcon.style.display = 'none';
            if (uploadText) uploadText.style.display = 'none';
            if (uploadHint) uploadHint.style.display = 'none';
            
            uploadDialogOpen = false;
        };
        
        reader.readAsDataURL(file);
    }

    // Reset the upload area to initial state
    function resetUpload() {
        imagePresent = false;
        input.value = '';
        previewImage.style.display = 'none';
        previewImage.src = '';
        responseElement.innerHTML = '';
        
        // Show upload elements again
        const uploadIcon = dragDropArea.querySelector('svg');
        const uploadText = dragDropArea.querySelector('.upload-text');
        const uploadHint = dragDropArea.querySelector('.upload-hint');
        
        if (uploadIcon) uploadIcon.style.display = 'block';
        if (uploadText) uploadText.style.display = 'block';
        if (uploadHint) uploadHint.style.display = 'block';
    }

    // Upload image to server
    async function uploadImage() {
        const file = input.files[0];

        if (!file) {
            showError('Please select an image file.');
            return;
        }

        // Show loading spinner
        responseElement.innerHTML = '<div class="spinner"></div>';
        uploadButton.disabled = true;
        uploadButton.innerText = 'Analyzing...';

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await fetch('http://localhost:8000/predict', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }

            const jsonResponse = await response.json();
            
            // Format the response with better styling
            responseElement.innerHTML = `
                <div class="result-card">
                    <div class="result-title">Analysis Result</div>
                    <div class="result-class">
                        <strong>Condition:</strong> ${jsonResponse['class']}
                    </div>
                    <div class="result-confidence">
                        <strong>Confidence:</strong> ${(jsonResponse['confidence'] * 100).toFixed(1)}%
                    </div>
                    <button id="analyze-another" class="upload-btn" style="margin-top: 15px; width: 100%;">Analyze Another Image</button>
                </div>
            `;
            
            // Add event listener to the "Analyze Another Image" button
            document.getElementById('analyze-another').addEventListener('click', resetUpload);
            
        } catch (error) {
            console.error('Error:', error);
            showError(`Error: ${error.message}`);
        } finally {
            uploadButton.disabled = false;
            uploadButton.innerText = 'Analyze Image';
        }
    }

    // Show error message
    function showError(message) {
        responseElement.innerHTML = `<div class="error-message">${message}</div>`;
    }

    // Make functions globally available for debugging
    window.showImagePreview = showImagePreview;
    window.uploadImage = uploadImage;
    window.resetUpload = resetUpload;
});