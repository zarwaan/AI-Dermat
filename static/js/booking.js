// // This function makes the consultation type cards selectable
// console.log("hi");
// function makeConsultationCardsSelectable() {
//     const optionCards = document.querySelectorAll('.option-card');
    
//     optionCards.forEach(card => {
//         // Add click event listener to each card
//         card.addEventListener('click', function() {
//             // Remove selected class from all cards
//             optionCards.forEach(c => {
//                 c.classList.remove('selected');
//                 c.style.backgroundColor = '';
//                 c.style.borderColor = '';
//             });
            
//             // Add selected class to clicked card
//             this.classList.add('selected');
//             this.style.backgroundColor = '#f0f9fc';
//             this.style.borderColor = '#5eabc7';
//         });
        
//         // Add hover effects
//         card.addEventListener('mouseover', function() {
//             if (!this.classList.contains('selected')) {
//                 this.style.borderColor = '#5eabc7';
//                 this.style.boxShadow = '0 0 0 1px #5eabc7';
//             }
//         });
        
//         card.addEventListener('mouseout', function() {
//             if (!this.classList.contains('selected')) {
//                 this.style.borderColor = '#e0e0e0';
//                 this.style.boxShadow = 'none';
//             }
//         });
//     });
// }

// // Enhance the site with dark blue and orange accents
// function enhanceColorScheme() {
//     // Update header color
//     const header = document.querySelector('h1');
//     header.style.color = '#1d6a80';
    
//     // Update subtitle color
//     const subtitle = document.querySelector('.subtitle');
//     subtitle.style.color = '#f7a03e';
//     subtitle.style.fontWeight = 'bold';
    
//     // Update section headers
//     const sectionHeadings = document.querySelectorAll('.form-section h3');
//     sectionHeadings.forEach(heading => {
//         heading.style.color = '#1d6a80';
//         const span = heading.querySelector('span');
//         if (span) {
//             span.style.backgroundColor = '#f7a03e';
//         }
//     });
    
//     // Update consultation cards
//     const cards = document.querySelectorAll('.option-card');
//     cards.forEach(card => {
//         const heading = card.querySelector('h4');
//         if (heading) {
//             heading.style.color = '#1d6a80';
//         }
        
//         // Add orange border on hover
//         card.addEventListener('mouseover', function() {
//             if (!this.classList.contains('selected')) {
//                 this.style.borderColor = '#f7a03e';
//                 this.style.boxShadow = '0 0 0 1px #f7a03e';
//             }
//         });
        
//         card.addEventListener('mouseout', function() {
//             if (!this.classList.contains('selected')) {
//                 this.style.borderColor = '#e0e0e0';
//                 this.style.boxShadow = 'none';
//             }
//         });
        
//         // Change selected card style
//         card.addEventListener('click', function() {
//             // Remove selected class from all cards
//             cards.forEach(c => {
//                 c.classList.remove('selected');
//                 c.style.backgroundColor = '';
//                 c.style.borderColor = '';
//             });
            
//             // Add selected class to clicked card
//             this.classList.add('selected');
//             this.style.backgroundColor = '#f0f9fc';
//             this.style.borderColor = '#f7a03e';
//             this.style.boxShadow = '0 0 0 1px #f7a03e';
//         });
//     });
    
//     // Update calendar
//     const calendarHeader = document.querySelector('.calendar-header');
//     if (calendarHeader) {
//         calendarHeader.style.backgroundColor = '#1d6a80';
//     }
    
//     // Update confirm booking button
//     const confirmBtn = document.querySelector('.action-buttons .btn');
//     confirmBtn.style.backgroundColor = '#f7a03e';
//     confirmBtn.addEventListener('mouseover', function() {
//         this.style.backgroundColor = '#1d6a80';
//     });
//     confirmBtn.addEventListener('mouseout', function() {
//         this.style.backgroundColor = '#f7a03e';
//     });
    
//     // Add styling to time slots
//     const styleTimeSlots = function() {
//         const timeSlots = document.querySelectorAll('.time-slot');
//         timeSlots.forEach(slot => {
//             slot.addEventListener('mouseover', function() {
//                 if (!this.classList.contains('selected')) {
//                     this.style.borderColor = '#f7a03e';
//                     this.style.backgroundColor = '#fff3e6';
//                 }
//             });
            
//             slot.addEventListener('mouseout', function() {
//                 if (!this.classList.contains('selected')) {
//                     this.style.backgroundColor = '';
//                     this.style.borderColor = '#e0e0e0';
//                 }
//             });
            
//             slot.addEventListener('click', function() {
//                 document.querySelectorAll('.time-slot').forEach(s => {
//                     s.classList.remove('selected');
//                     s.style.backgroundColor = '';
//                     s.style.color = '';
//                     s.style.borderColor = '#e0e0e0';
//                 });
                
//                 this.classList.add('selected');
//                 this.style.backgroundColor = '#f7a03e';
//                 this.style.color = 'white';
//                 this.style.borderColor = '#f7a03e';
//             });
//         });
//     };
    
//     // Apply time slot styling initially and after calendar changes
//     styleTimeSlots();
    
//     // Add a mutation observer to detect when new time slots are added
//     const observer = new MutationObserver(function(mutations) {
//         mutations.forEach(function(mutation) {
//             if (mutation.addedNodes.length) {
//                 styleTimeSlots();
//             }
//         });
//     });
    
//     // Start observing the calendar section for changes
//     const targetNode = document.querySelector('.calendar-section');
//     if (targetNode) {
//         observer.observe(targetNode, { childList: true, subtree: true });
//     }
// }

// // Handle the selected image file (MODIFIED: now handles only one image)
// function handleFiles(files) {
//     // Check if the preview container already exists
//     let previewContainer = document.querySelector('.image-preview');
    
//     if (!previewContainer) {
//         // Create preview container if it doesn't exist
//         previewContainer = document.createElement('div');
//         previewContainer.className = 'image-preview';
//         previewContainer.style.display = 'flex';
//         previewContainer.style.flexWrap = 'wrap';
//         previewContainer.style.gap = '10px';
//         previewContainer.style.marginTop = '20px';
//         uploadArea.after(previewContainer);
//     } else {
//         // Clear existing preview if any
//         previewContainer.innerHTML = '';
//     }
    
//     // Take only the first file from the selection
//     if (files.length > 0) {
//         const file = files[0];
//         if (!file.type.match('image.*')) {
//             alert('Please select an image file.');
//             return;
//         }
        
//         const reader = new FileReader();
//         reader.onload = function(e) {
//             const previewWrapper = document.createElement('div');
//             previewWrapper.style.position = 'relative';
//             previewWrapper.style.width = '100%';
//             previewWrapper.style.maxWidth = '300px';
//             previewWrapper.style.margin = '0 auto';
            
//             const preview = document.createElement('img');
//             preview.src = e.target.result;
//             preview.style.width = '100%';
//             preview.style.height = 'auto';
//             preview.style.borderRadius = '4px';
//             preview.style.objectFit = 'cover';
//             preview.style.aspectRatio = '1/1';
//             preview.style.border = '2px solid #5eabc7';
            
//             const removeBtn = document.createElement('button');
//             removeBtn.innerHTML = '×';
//             removeBtn.style.position = 'absolute';
//             removeBtn.style.top = '5px';
//             removeBtn.style.right = '5px';
//             removeBtn.style.backgroundColor = 'rgba(255,255,255,0.7)';
//             removeBtn.style.border = 'none';
//             removeBtn.style.borderRadius = '50%';
//             removeBtn.style.width = '22px';
//             removeBtn.style.height = '22px';
//             removeBtn.style.cursor = 'pointer';
//             removeBtn.style.display = 'flex';
//             removeBtn.style.justifyContent = 'center';
//             removeBtn.style.alignItems = 'center';
            
//             removeBtn.addEventListener('click', function() {
//                 previewWrapper.remove();
//                 if (document.querySelectorAll('.image-preview img').length === 0) {
//                     previewContainer.remove();
//                 }
//                 // Reset the button text
//                 const uploadButton = uploadArea.querySelector('.btn');
//                 uploadButton.textContent = "Upload Image";
//                 uploadButton.style.backgroundColor = "#1d6a80";
//             });
            
//             previewWrapper.appendChild(preview);
//             previewWrapper.appendChild(removeBtn);
//             previewContainer.appendChild(previewWrapper);
//         };
        
//         reader.readAsDataURL(file);
        
//         // Update upload button text
//         const uploadButton = uploadArea.querySelector('.btn');
//         uploadButton.textContent = "Replace Image";
//         uploadButton.style.backgroundColor = "#f7a03e";
//     }
// }

// function setupImageUpload() {
//     const uploadArea = document.querySelector('.upload-area');
//     const uploadButton = uploadArea.querySelector('.btn');
    
//     // Add a note about one image upload
//     const uploadNote = document.createElement('p');
//     uploadNote.textContent = "Please upload one image";
//     uploadNote.style.color = "#1d6a80";
//     uploadNote.style.fontStyle = "italic";
//     uploadArea.appendChild(uploadNote);
    
//     // Update button styling to match brand colors
//     uploadButton.style.backgroundColor = "#1d6a80";
//     uploadButton.style.transition = "background-color 0.3s";
//     uploadButton.addEventListener('mouseover', function() {
//         this.style.backgroundColor = "#f7a03e";
//     });
//     uploadButton.addEventListener('mouseout', function() {
//         this.style.backgroundColor = "#1d6a80";
//     });
    
//     const fileInput = document.createElement('input');
//     fileInput.type = 'file';
//     fileInput.multiple = false; // Ensure single file selection
//     fileInput.accept = 'image/*';
//     fileInput.style.display = 'none';
//     uploadArea.appendChild(fileInput);
    
//     // Click on button or upload area triggers file selection
//     uploadButton.addEventListener('click', function(e) {
//         e.preventDefault();
//         fileInput.click();
//     });
    
//     uploadArea.addEventListener('click', function(e) {
//         if (e.target !== uploadButton && !e.target.closest('.image-preview')) {
//             fileInput.click();
//         }
//     });
    
//     // Drag and drop functionality
//     uploadArea.addEventListener('dragover', function(e) {
//         e.preventDefault();
//         uploadArea.style.backgroundColor = '#e6f2f5';
//         uploadArea.style.borderColor = '#1d6a80';
//     });
    
//     uploadArea.addEventListener('dragleave', function(e) {
//         e.preventDefault();
//         uploadArea.style.backgroundColor = '#f5f5f5';
//         uploadArea.style.borderColor = '#5eabc7';
//     });
    
//     uploadArea.addEventListener('drop', function(e) {
//         e.preventDefault();
//         uploadArea.style.backgroundColor = '#f5f5f5';
//         uploadArea.style.borderColor = '#5eabc7';
        
//         // Take just the first file from drop
//         if (e.dataTransfer.files.length > 0) {
//             const droppedFile = [e.dataTransfer.files[0]];
//             handleFiles(droppedFile);
//         }
//     });
    
//     fileInput.addEventListener('change', function() {
//         if (this.files.length > 0) {
//             handleFiles(this.files);
//         }
//     });
// }

// // CONSOLIDATED CALENDAR FUNCTIONS
// function initializeCalendar() {
//     // Initial placeholder message
//     const addPlaceholderMessage = function() {
//         // Remove existing time slots section initially
//         const existingTimeSlots = document.querySelector('.time-slots-container');
//         if (existingTimeSlots) {
//             existingTimeSlots.remove();
//         }
        
//         // Add placeholder message to select a date first
//         const calendarSection = document.querySelector('.calendar-section');
//         let placeholderMessage = document.querySelector('.date-selection-message');
        
//         if (!placeholderMessage) {
//             placeholderMessage = document.createElement('div');
//             placeholderMessage.className = 'date-selection-message';
//             placeholderMessage.textContent = 'Please select a date to view available time slots';
//             placeholderMessage.style.marginTop = '20px';
//             placeholderMessage.style.textAlign = 'center';
//             placeholderMessage.style.color = '#666';
//             placeholderMessage.style.padding = '20px';
//             placeholderMessage.style.backgroundColor = '#f5f5f5';
//             placeholderMessage.style.borderRadius = '8px';
            
//             calendarSection.appendChild(placeholderMessage);
//         }
//     };
    
//     // Create main calendar interface
//     const createCalendar = function() {
//         const calendarSection = document.querySelector('.calendar-section');
//         const existingCalendar = document.querySelector('.calendar');
//         if (existingCalendar) {
//             existingCalendar.remove();
//         }
        
//         // Create calendar wrapper
//         const calendarWrapper = document.createElement('div');
//         calendarWrapper.className = 'calendar-wrapper';
//         calendarWrapper.style.position = 'relative';
        
//         // Get current date and create calendar
//         const today = new Date();
//         let currentMonth = today.getMonth();
//         let currentYear = today.getFullYear();
        
//         renderCalendar(currentMonth, currentYear);
//         calendarSection.prepend(calendarWrapper);
        
//         // Make calendar responsive
//         adjustCalendar();
//         window.addEventListener('resize', adjustCalendar);
        
//         // Function to render the calendar for a specific month and year
//         function renderCalendar(month, year) {
//             // Create calendar container
//             const calendar = document.createElement('div');
//             calendar.className = 'calendar';
//             calendar.style.marginBottom = '20px';
//             calendar.style.border = '1px solid #e0e0e0';
//             calendar.style.borderRadius = '8px';
//             calendar.style.overflow = 'hidden';
            
//             // Create calendar header
//             const header = document.createElement('div');
//             header.className = 'calendar-header';
//             header.style.backgroundColor = '#5eabc7';
//             header.style.color = 'white';
//             header.style.padding = '15px';
//             header.style.display = 'flex';
//             header.style.justifyContent = 'space-between';
//             header.style.alignItems = 'center';
            
//             const prevBtn = document.createElement('button');
//             prevBtn.className = 'btn-secondary';
//             prevBtn.innerHTML = '&lt;';
//             prevBtn.style.backgroundColor = 'rgba(255,255,255,0.2)';
//             prevBtn.style.border = 'none';
//             prevBtn.style.color = 'white';
//             prevBtn.style.padding = '5px 10px';
//             prevBtn.style.borderRadius = '4px';
//             prevBtn.style.cursor = 'pointer';
            
//             const nextBtn = document.createElement('button');
//             nextBtn.className = 'btn-secondary';
//             nextBtn.innerHTML = '&gt;';
//             nextBtn.style.backgroundColor = 'rgba(255,255,255,0.2)';
//             nextBtn.style.border = 'none';
//             nextBtn.style.color = 'white';
//             nextBtn.style.padding = '5px 10px';
//             nextBtn.style.borderRadius = '4px';
//             nextBtn.style.cursor = 'pointer';
            
//             const monthYearText = document.createElement('h4');
//             monthYearText.textContent = new Date(year, month).toLocaleString('default', { month: 'long', year: 'numeric' });
//             monthYearText.style.margin = '0';
            
//             header.appendChild(prevBtn);
//             header.appendChild(monthYearText);
//             header.appendChild(nextBtn);
//             calendar.appendChild(header);
            
//             // Create calendar grid
//             const grid = document.createElement('div');
//             grid.className = 'calendar-grid';
//             grid.style.display = 'grid';
//             grid.style.gridTemplateColumns = 'repeat(7, 1fr)';
            
//             // Add day names
//             const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
//             dayNames.forEach(day => {
//                 const dayNameElement = document.createElement('div');
//                 dayNameElement.className = 'calendar-day day-name';
//                 dayNameElement.textContent = day;
//                 dayNameElement.style.fontWeight = 'bold';
//                 dayNameElement.style.backgroundColor = '#f5f5f5';
//                 dayNameElement.style.padding = '10px';
//                 dayNameElement.style.textAlign = 'center';
//                 dayNameElement.style.borderBottom = '1px solid #e0e0e0';
//                 dayNameElement.style.borderRight = '1px solid #e0e0e0';
                
//                 // Apply different style to weekend day names
//                 if (day === 'Sun' || day === 'Sat') {
//                     dayNameElement.style.backgroundColor = '#e6e6e6';
//                     dayNameElement.style.color = '#999';
//                 }
                
//                 grid.appendChild(dayNameElement);
//             });
            
//             // Get first day of month and total days in month
//             const firstDay = new Date(year, month, 1).getDay();
//             const daysInMonth = new Date(year, month + 1, 0).getDate();
            
//             // Fill in empty cells before first day of month
//             for (let i = 0; i < firstDay; i++) {
//                 const emptyDay = document.createElement('div');
//                 emptyDay.className = 'calendar-day';
//                 emptyDay.style.padding = '10px';
//                 emptyDay.style.textAlign = 'center';
//                 emptyDay.style.borderBottom = '1px solid #e0e0e0';
//                 emptyDay.style.borderRight = '1px solid #e0e0e0';
//                 grid.appendChild(emptyDay);
//             }
            
//             // Fill in days of month
//             for (let i = 1; i <= daysInMonth; i++) {
//                 const dayElement = document.createElement('div');
//                 dayElement.className = 'calendar-day';
//                 dayElement.textContent = i;
//                 dayElement.style.padding = '10px';
//                 dayElement.style.textAlign = 'center';
//                 dayElement.style.borderBottom = '1px solid #e0e0e0';
//                 dayElement.style.borderRight = '1px solid #e0e0e0';
                
//                 // Check if date is in the past
//                 const currentDate = new Date(year, month, i);
//                 const now = new Date();
//                 now.setHours(0, 0, 0, 0);
                
//                 // Check if it's a weekend
//                 const dayOfWeek = currentDate.getDay();
//                 const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
                
//                 // Style weekends differently and make them unavailable
//                 if (isWeekend) {
//                     dayElement.style.backgroundColor = '#f5f5f5';
//                     dayElement.style.color = '#999';
//                     dayElement.style.textDecoration = 'line-through';
//                     dayElement.setAttribute('title', 'Weekend - Not Available');
//                 }
//                 // Make weekdays available (not weekends and not past days)
//                 else if (currentDate >= now) {
//                     dayElement.classList.add('available');
//                     dayElement.style.cursor = 'pointer';
                    
//                     // Highlight if today
//                     if (currentDate.getDate() === today.getDate() && 
//                         currentDate.getMonth() === today.getMonth() && 
//                         currentDate.getFullYear() === today.getFullYear()) {
//                         dayElement.style.backgroundColor = '#e6f2f5';
//                         dayElement.style.fontWeight = 'bold';
//                     }
                    
//                     dayElement.addEventListener('click', function() {
//                         // Remove selected class from all days
//                         document.querySelectorAll('.calendar-day.selected').forEach(day => {
//                             day.classList.remove('selected');
//                             day.style.backgroundColor = '';
//                             day.style.color = '';
//                         });
                        
//                         // Add selected class to clicked day
//                         this.classList.add('selected');
//                         this.style.backgroundColor = '#5eabc7';
//                         this.style.color = 'white';
                        
//                         // Remove placeholder message
//                         const placeholderMessage = document.querySelector('.date-selection-message');
//                         if (placeholderMessage) {
//                             placeholderMessage.remove();
//                         }
                        
//                         // Update time slots header
//                         const dateName = currentDate.toLocaleString('default', { month: 'long', day: 'numeric', year: 'numeric' });
//                         updateTimeSlots(dateName);
//                     });
                    
//                     dayElement.addEventListener('mouseover', function() {
//                         if (!this.classList.contains('selected')) {
//                             this.style.backgroundColor = '#e6f2f5';
//                         }
//                     });
                    
//                     dayElement.addEventListener('mouseout', function() {
//                         if (!this.classList.contains('selected')) {
//                             this.style.backgroundColor = '';
//                         }
//                     });
//                 }
                
//                 grid.appendChild(dayElement);
//             }
            
//             calendar.appendChild(grid);
            
//             // Event listeners for next/prev month
//             prevBtn.addEventListener('click', function() {
//                 let newMonth = month - 1;
//                 let newYear = year;
//                 if (newMonth < 0) {
//                     newMonth = 11;
//                     newYear--;
//                 }
                
//                 clearCalendar();
//                 renderCalendar(newMonth, newYear);
//             });
            
//             nextBtn.addEventListener('click', function() {
//                 let newMonth = month + 1;
//                 let newYear = year;
//                 if (newMonth > 11) {
//                     newMonth = 0;
//                     newYear++;
//                 }
                
//                 clearCalendar();
//                 renderCalendar(newMonth, newYear);
//             });
            
//             // Add to DOM
//             calendarWrapper.appendChild(calendar);
//         }
        
//         function clearCalendar() {
//             while (calendarWrapper.firstChild) {
//                 calendarWrapper.firstChild.remove();
//             }
//         }
//     };
    
//     // Adjust calendar for responsive design
//     const adjustCalendar = function() {
//         const calendarDays = document.querySelectorAll('.calendar-day');
        
//         if (window.innerWidth < 500) {
//             calendarDays.forEach(day => {
//                 day.style.padding = '5px';
//                 day.style.fontSize = '14px';
//             });
//         } else {
//             calendarDays.forEach(day => {
//                 day.style.padding = '10px';
//                 day.style.fontSize = '16px';
//             });
//         }
//     };
    
//     // Update time slots when a date is selected
//     const updateTimeSlots = function(selectedDate) {
//         // Remove existing time slots section
//         const existingTimeSlots = document.querySelector('.time-slots-container');
//         if (existingTimeSlots) {
//             existingTimeSlots.remove();
//         }
        
//         // Create container for time slots sections
//         const timeSlotsContainer = document.createElement('div');
//         timeSlotsContainer.className = 'time-slots-container';
//         timeSlotsContainer.style.marginTop = '20px';
        
//         // Create header for selected date
//         const timeHeader = document.createElement('h4');
//         timeHeader.textContent = `Available Time Slots for ${selectedDate || 'Selected Date'}`;
//         timeHeader.style.marginTop = '20px';
//         timeHeader.style.marginBottom = '15px';
        
//         // Create morning section
//         const morningSection = document.createElement('div');
//         morningSection.className = 'time-slot-section';
        
//         const morningHeader = document.createElement('h5');
//         morningHeader.textContent = 'Morning';
//         morningHeader.style.marginBottom = '10px';
//         morningHeader.style.color = '#5eabc7';
        
//         const morningSlots = document.createElement('div');
//         morningSlots.className = 'time-slots';
//         morningSlots.style.display = 'flex';
//         morningSlots.style.flexWrap = 'wrap';
//         morningSlots.style.gap = '10px';
//         morningSlots.style.marginBottom = '20px';
        
//         // Morning time slots
//         const morningTimes = ['8:00 AM', '8:30 AM', '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM'];
//         morningTimes.forEach(time => {
//             const slot = createTimeSlot(time);
//             morningSlots.appendChild(slot);
//         });
        
//         morningSection.appendChild(morningHeader);
//         morningSection.appendChild(morningSlots);
        
//         // Create afternoon section
//         const afternoonSection = document.createElement('div');
//         afternoonSection.className = 'time-slot-section';
        
//         const afternoonHeader = document.createElement('h5');
//         afternoonHeader.textContent = 'Afternoon';
//         afternoonHeader.style.marginBottom = '10px';
//         afternoonHeader.style.color = '#5eabc7';
        
//         const afternoonSlots = document.createElement('div');
//         afternoonSlots.className = 'time-slots';
//         afternoonSlots.style.display = 'flex';
//         afternoonSlots.style.flexWrap = 'wrap';
//         afternoonSlots.style.gap = '10px';
//         afternoonSlots.style.marginBottom = '20px';
        
//         // Afternoon time slots
//         const afternoonTimes = ['12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM'];
//         afternoonTimes.forEach(time => {
//             const slot = createTimeSlot(time);
//             afternoonSlots.appendChild(slot);
//         });
        
//         afternoonSection.appendChild(afternoonHeader);
//         afternoonSection.appendChild(afternoonSlots);
        
//         // Create evening section
//         const eveningSection = document.createElement('div');
//         eveningSection.className = 'time-slot-section';
        
//         const eveningHeader = document.createElement('h5');
//         eveningHeader.textContent = 'Evening';
//         eveningHeader.style.marginBottom = '10px';
//         eveningHeader.style.color = '#5eabc7';
        
//         const eveningSlots = document.createElement('div');
//         eveningSlots.className = 'time-slots';
//         eveningSlots.style.display = 'flex';
//         eveningSlots.style.flexWrap = 'wrap';
//         eveningSlots.style.gap = '10px';
        
//         // Evening time slots
//         const eveningTimes = ['4:00 PM', '4:30 PM', '5:00 PM', '5:30 PM', '6:00 PM', '6:30 PM', '7:00 PM'];
//         eveningTimes.forEach(time => {
//             const slot = createTimeSlot(time);
//             eveningSlots.appendChild(slot);
//         });
        
//         eveningSection.appendChild(eveningHeader);
//         eveningSection.appendChild(eveningSlots);
        
//         // Add all sections to container
//         timeSlotsContainer.appendChild(timeHeader);
//         timeSlotsContainer.appendChild(morningSection);
//         timeSlotsContainer.appendChild(afternoonSection);
//         timeSlotsContainer.appendChild(eveningSection);
        
//         // Add container to DOM
//         document.querySelector('.calendar-section').appendChild(timeSlotsContainer);
        
//         // Make time slots responsive
//         adjustTimeSlots();
//     };
    
//     // Helper function to create a time slot
//     const createTimeSlot = function(time) {
//         const slot = document.createElement('div');
//         slot.className = 'time-slot';
//         slot.textContent = time;
//         slot.style.padding = '8px 15px';
//         slot.style.border = '1px solid #e0e0e0';
//         slot.style.borderRadius = '20px';
//         slot.style.cursor = 'pointer';
        
//         slot.addEventListener('click', function() {
//             document.querySelectorAll('.time-slot').forEach(s => {
//                 s.classList.remove('selected');
//                 s.style.backgroundColor = '';
//                 s.style.color = '';
//                 s.style.borderColor = '#e0e0e0';
//             });
            
//             this.classList.add('selected');
//             this.style.backgroundColor = '#5eabc7';
//             this.style.color = 'white';
//             this.style.borderColor = '#5eabc7';
//         });
        
//         slot.addEventListener('mouseover', function() {
//             if (!this.classList.contains('selected')) {
//                 this.style.backgroundColor = '#f0f9fc';
//                 this.style.borderColor = '#5eabc7';
//             }
//         });
        
//         slot.addEventListener('mouseout', function() {
//             if (!this.classList.contains('selected')) {
//                 this.style.backgroundColor = '';
//                 this.style.borderColor = '#e0e0e0';
//             }
//         });
        
//         return slot;
//     };
    
//     // Make time slots responsive
//     const adjustTimeSlots = function() {
//         const timeSlotsAll = document.querySelectorAll('.time-slots');
        
//         if (window.innerWidth < 768) {
//             timeSlotsAll.forEach(timeSlots => {
//                 const slots = timeSlots.querySelectorAll('.time-slot');
//                 slots.forEach(slot => {
//                     slot.style.flex = '0 0 calc(33.33% - 7px)';
//                     slot.style.textAlign = 'center';
//                     slot.style.marginBottom = '5px';
//                 });
//             });
//         } else if (window.innerWidth < 500) {
//             timeSlotsAll.forEach(timeSlots => {
//                 const slots = timeSlots.querySelectorAll('.time-slot');
//                 slots.forEach(slot => {
//                     slot.style.flex = '0 0 calc(50% - 5px)';
//                     slot.style.textAlign = 'center';
//                     slot.style.marginBottom = '5px';
//                 });
//             });
//         } else {
//             timeSlotsAll.forEach(timeSlots => {
//                 const slots = timeSlots.querySelectorAll('.time-slot');
//                 slots.forEach(slot => {
//                     slot.style.flex = '0 0 auto';
//                     slot.style.marginBottom = '0';
//                 });
//             });
//         }
//     };
    
//     // Position confirmation button on the right side
//     const adjustActionButtons = function() {
//         const actionButtons = document.querySelector('.action-buttons');
//         actionButtons.style.display = 'flex';
//         actionButtons.style.justifyContent = 'flex-end';
//         const confirmButton = actionButtons.querySelector('.btn');
                
//         if (window.innerWidth < 500) {
//             confirmButton.style.width = '100%';
//         } else {
//             confirmButton.style.width = 'auto';
//         }
//     }
//     // Execute all responsive functions
//     function initResponsive() {
//         setupImageUpload();
//         createResponsiveCalendar();
//         // Initial time slots setup
//         updateTimeSlots('Select a date');
//         adjustActionButtons();
        
//         // Global responsiveness
//         window.addEventListener('resize', function() {
//             adjustTimeSlots();
//             adjustActionButtons();
//         });
//     }
    
//     // Run on page load
//     initResponsive();
//     document.addEventListener('DOMContentLoaded', function(){

//     }
// }

        // This function makes the consultation type cards selectable
import { addHeader } from "./header.js";
addHeader(document.body);        
        
        
        function makeConsultationCardsSelectable() {
            const optionCards = document.querySelectorAll('.option-card');
            
            optionCards.forEach(card => {
                // Add click event listener to each card
                card.addEventListener('click', function() {
                    // Remove selected class from all cards
                    optionCards.forEach(c => {
                        c.classList.remove('selected');
                        c.style.backgroundColor = '';
                        c.style.borderColor = '';
                    });
                    
                    // Add selected class to clicked card
                    this.classList.add('selected');
                    this.style.backgroundColor = '#f0f9fc';
                    this.style.borderColor = '#5eabc7';
                });
                
                // Add hover effects
                card.addEventListener('mouseover', function() {
                    if (!this.classList.contains('selected')) {
                        this.style.borderColor = '#5eabc7';
                        this.style.boxShadow = '0 0 0 1px #5eabc7';
                    }
                });
                
                card.addEventListener('mouseout', function() {
                    if (!this.classList.contains('selected')) {
                        this.style.borderColor = '#e0e0e0';
                        this.style.boxShadow = 'none';
                    }
                });
            });
        }
        
        // Modify the calendar function to better handle weekends and time slots
        function improveCalendarAndTimeSlots() {
            // Remove existing time slots section initially
            const existingTimeSlots = document.querySelector('.time-slots-container');
            if (existingTimeSlots) {
                existingTimeSlots.remove();
            }
            
            // Add placeholder message to select a date first
            const calendarSection = document.querySelector('.calendar-section');
            const placeholderMessage = document.createElement('div');
            placeholderMessage.className = 'date-selection-message';
            placeholderMessage.textContent = 'Please select a date to view available time slots';
            placeholderMessage.style.marginTop = '20px';
            placeholderMessage.style.textAlign = 'center';
            placeholderMessage.style.color = '#666';
            placeholderMessage.style.padding = '20px';
            placeholderMessage.style.backgroundColor = '#f5f5f5';
            placeholderMessage.style.borderRadius = '8px';
            
            calendarSection.appendChild(placeholderMessage);
        }
        // Enhance the site with dark blue and orange accents
        function enhanceColorScheme() {
            // Update header color
            const header = document.querySelector('h1');
            header.style.color = '#1d6a80';
            
            // Update subtitle color
            const subtitle = document.querySelector('.subtitle');
            subtitle.style.color = '#f7a03e';
            subtitle.style.fontWeight = 'bold';
            
            // Update section headers
            const sectionHeadings = document.querySelectorAll('.form-section h3');
            sectionHeadings.forEach(heading => {
                heading.style.color = '#1d6a80';
                const span = heading.querySelector('span');
                if (span) {
                    span.style.backgroundColor = '#f7a03e';
                }
            });
            
            // Update consultation cards
            const cards = document.querySelectorAll('.option-card');
            cards.forEach(card => {
                const heading = card.querySelector('h4');
                if (heading) {
                    heading.style.color = '#1d6a80';
                }
                
                // Add orange border on hover
                card.addEventListener('mouseover', function() {
                    if (!this.classList.contains('selected')) {
                        this.style.borderColor = '#f7a03e';
                        this.style.boxShadow = '0 0 0 1px #f7a03e';
                    }
                });
                
                card.addEventListener('mouseout', function() {
                    if (!this.classList.contains('selected')) {
                        this.style.borderColor = '#e0e0e0';
                        this.style.boxShadow = 'none';
                    }
                });
                
                // Change selected card style
                card.addEventListener('click', function() {
                    // Remove selected class from all cards
                    cards.forEach(c => {
                        c.classList.remove('selected');
                        c.style.backgroundColor = '';
                        c.style.borderColor = '';
                    });
                    
                    // Add selected class to clicked card
                    this.classList.add('selected');
                    this.style.backgroundColor = '#f0f9fc';
                    this.style.borderColor = '#f7a03e';
                    this.style.boxShadow = '0 0 0 1px #f7a03e';
                });
            });
            
            // Update calendar
            const calendarHeader = document.querySelector('.calendar-header');
            if (calendarHeader) {
                calendarHeader.style.backgroundColor = '#1d6a80';
            }
            
            // Update confirm booking button
            const confirmBtn = document.querySelector('.action-buttons .btn');
            confirmBtn.style.backgroundColor = '#f7a03e';
            confirmBtn.addEventListener('mouseover', function() {
                this.style.backgroundColor = '#1d6a80';
            });
            confirmBtn.addEventListener('mouseout', function() {
                this.style.backgroundColor = '#f7a03e';
            });
            
            // Add styling to time slots
            const styleTimeSlots = function() {
                const timeSlots = document.querySelectorAll('.time-slot');
                timeSlots.forEach(slot => {
                    slot.addEventListener('mouseover', function() {
                        if (!this.classList.contains('selected')) {
                            this.style.borderColor = '#f7a03e';
                            this.style.backgroundColor = '#fff3e6';
                        }
                    });
                    
                    slot.addEventListener('mouseout', function() {
                        if (!this.classList.contains('selected')) {
                            this.style.backgroundColor = '';
                            this.style.borderColor = '#e0e0e0';
                        }
                    });
                    
                    slot.addEventListener('click', function() {
                        document.querySelectorAll('.time-slot').forEach(s => {
                            s.classList.remove('selected');
                            s.style.backgroundColor = '';
                            s.style.color = '';
                            s.style.borderColor = '#e0e0e0';
                        });
                        
                        this.classList.add('selected');
                        this.style.backgroundColor = '#f7a03e';
                        this.style.color = 'white';
                        this.style.borderColor = '#f7a03e';
                    });
                });
            };
            
            // Apply time slot styling initially and after calendar changes
            styleTimeSlots();
            
            // Add a mutation observer to detect when new time slots are added
            const observer = new MutationObserver(function(mutations) {
                mutations.forEach(function(mutation) {
                    if (mutation.addedNodes.length) {
                        styleTimeSlots();
                    }
                });
            });
            
            // Start observing the calendar section for changes
            const targetNode = document.querySelector('.calendar-section');
            if (targetNode) {
                observer.observe(targetNode, { childList: true, subtree: true });
            }
        }
        // Handle the selected image files
        function handleFiles(files) {
            // Check if the preview container already exists
            let previewContainer = document.querySelector('.image-preview');
            
            if (!previewContainer) {
                // Create preview container if it doesn't exist
                previewContainer = document.createElement('div');
                previewContainer.className = 'image-preview';
                previewContainer.style.display = 'flex';
                previewContainer.style.flexWrap = 'wrap';
                previewContainer.style.gap = '10px';
                previewContainer.style.marginTop = '20px';
                uploadArea.after(previewContainer);
            }
            
            // Check total image count (existing + new)
            const existingImagesCount = previewContainer.querySelectorAll('img').length;
            const newImagesCount = files.length;
            
            if (existingImagesCount + newImagesCount > 5) {
                alert(`You can only upload a maximum of 5 images. You already have ${existingImagesCount} image(s).`);
                return;
            }
            
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                if (!file.type.match('image.*')) {
                    continue;
                }
                
                const reader = new FileReader();
                reader.onload = (function(theFile) {
                    return function(e) {
                        const previewWrapper = document.createElement('div');
                        previewWrapper.style.position = 'relative';
                        previewWrapper.style.width = 'calc(20% - 8px)';
                        previewWrapper.style.minWidth = '100px';
                        
                        const preview = document.createElement('img');
                        preview.src = e.target.result;
                        preview.style.width = '100%';
                        preview.style.height = 'auto';
                        preview.style.borderRadius = '4px';
                        preview.style.objectFit = 'cover';
                        preview.style.aspectRatio = '1/1';
                        preview.style.border = '2px solid #5eabc7';
                        
                        const removeBtn = document.createElement('button');
                        removeBtn.innerHTML = '×';
                        removeBtn.style.position = 'absolute';
                        removeBtn.style.top = '5px';
                        removeBtn.style.right = '5px';
                        removeBtn.style.backgroundColor = 'rgba(255,255,255,0.7)';
                        removeBtn.style.border = 'none';
                        removeBtn.style.borderRadius = '50%';
                        removeBtn.style.width = '22px';
                        removeBtn.style.height = '22px';
                        removeBtn.style.cursor = 'pointer';
                        removeBtn.style.display = 'flex';
                        removeBtn.style.justifyContent = 'center';
                        removeBtn.style.alignItems = 'center';
                        
                        removeBtn.addEventListener('click', function() {
                            previewWrapper.remove();
                            if (document.querySelectorAll('.image-preview img').length === 0) {
                                previewContainer.remove();
                            }
                        });
                        
                        previewWrapper.appendChild(preview);
                        previewWrapper.appendChild(removeBtn);
                        previewContainer.appendChild(previewWrapper);
                    };
                })(file);
                
                reader.readAsDataURL(file);
            }
            
            // Update upload button text to reflect images can be added one by one
            const uploadButton = uploadArea.querySelector('.btn');
            uploadButton.textContent = "Add More Images";
            uploadButton.style.backgroundColor = "#f7a03e";
            
            // Add counter showing how many more images can be added
            updateImageCounter(previewContainer);
        }
        
        // Add a counter to show how many more images can be uploaded
        function updateImageCounter(previewContainer) {
            let counterElement = document.querySelector('.image-counter');
            
            if (!counterElement) {
                counterElement = document.createElement('div');
                counterElement.className = 'image-counter';
                counterElement.style.marginTop = '10px';
                counterElement.style.textAlign = 'center';
                counterElement.style.color = '#1d6a80';
                counterElement.style.fontWeight = 'bold';
                previewContainer.after(counterElement);
            }
            
            const currentCount = previewContainer.querySelectorAll('img').length;
            counterElement.textContent = `${currentCount}/5 images uploaded`;
        }
        
        // function setupImageUpload() {
        //     const uploadArea = document.querySelector('.upload-area');
        //     const uploadButton = uploadArea.querySelector('.btn');
            
        //     // Add a note about one-by-one upload
        //     const uploadNote = document.createElement('p');
        //     uploadNote.textContent = "You can upload images one by one, up to 5 total";
        //     uploadNote.style.color = "#1d6a80";
        //     uploadNote.style.fontStyle = "italic";
        //     uploadArea.appendChild(uploadNote);
            
        //     // Update button styling to match brand colors
        //     uploadButton.style.backgroundColor = "#1d6a80";
        //     uploadButton.style.transition = "background-color 0.3s";
        //     uploadButton.addEventListener('mouseover', function() {
        //         this.style.backgroundColor = "#f7a03e";
        //     });
        //     uploadButton.addEventListener('mouseout', function() {
        //         this.style.backgroundColor = "#1d6a80";
        //     });
            
        //     const fileInput = document.createElement('input');
        //     fileInput.type = 'file';
        //     fileInput.multiple = false; // Change to single file selection
        //     fileInput.accept = 'image/*';
        //     fileInput.style.display = 'none';
        //     uploadArea.appendChild(fileInput);
            
        //     // Click on button or upload area triggers file selection
        //     uploadButton.addEventListener('click', function(e) {
        //         e.preventDefault();
        //         fileInput.click();
        //     });
            
        //     uploadArea.addEventListener('click', function(e) {
        //         if (e.target !== uploadButton && !e.target.closest('.image-preview')) {
        //             fileInput.click();
        //         }
        //     });
            
        //     // Drag and drop functionality
        //     uploadArea.addEventListener('dragover', function(e) {
        //         e.preventDefault();
        //         uploadArea.style.backgroundColor = '#e6f2f5';
        //         uploadArea.style.borderColor = '#1d6a80';
        //     });
            
        //     uploadArea.addEventListener('dragleave', function(e) {
        //         e.preventDefault();
        //         uploadArea.style.backgroundColor = '#f5f5f5';
        //         uploadArea.style.borderColor = '#5eabc7';
        //     });
            
        //     uploadArea.addEventListener('drop', function(e) {
        //         e.preventDefault();
        //         uploadArea.style.backgroundColor = '#f5f5f5';
        //         uploadArea.style.borderColor = '#5eabc7';
                
        //         // Convert FileList to Array to handle one file at a time
        //         const droppedFiles = Array.from(e.dataTransfer.files).slice(0, 1);
        //         handleFiles(droppedFiles);
        //     });
            
        //     fileInput.addEventListener('change', function() {
        //         if (this.files.length > 0) {
        //             handleFiles(this.files);
        //         }
        //     });
        // }
                // Add this script at the end of the body tag in your HTML
                document.addEventListener('DOMContentLoaded', function() {
                    makeConsultationCardsSelectable();
                    improveCalendarAndTimeSlots();
                    enhanceColorScheme();
                    // 1. Make upload image button functional
                    // function setupImageUpload() {
                    //     const uploadArea = document.querySelector('.upload-area');
                    //     const uploadButton = uploadArea.querySelector('.btn');
                    //     const fileInput = document.createElement('input');
                    //     fileInput.type = 'file';
                    //     fileInput.multiple = true;
                    //     fileInput.accept = 'image/*';
                    //     fileInput.style.display = 'none';
                    //     uploadArea.appendChild(fileInput);
                        
                    //     // Click on button or upload area triggers file selection
                    //     uploadButton.addEventListener('click', function(e) {
                    //         e.preventDefault();
                    //         fileInput.click();
                    //     });
                        
                    //     uploadArea.addEventListener('click', function(e) {
                    //         if (e.target !== uploadButton) {
                    //             fileInput.click();
                    //         }
                    //     });
                        
                    //     // Drag and drop functionality
                    //     uploadArea.addEventListener('dragover', function(e) {
                    //         e.preventDefault();
                    //         uploadArea.style.backgroundColor = '#e6f2f5';
                    //         uploadArea.style.borderColor = '#5eabc7';
                    //     });
                        
                    //     uploadArea.addEventListener('dragleave', function(e) {
                    //         e.preventDefault();
                    //         uploadArea.style.backgroundColor = '#f5f5f5';
                    //         uploadArea.style.borderColor = '#5eabc7';
                    //     });
                        
                    //     uploadArea.addEventListener('drop', function(e) {
                    //         e.preventDefault();
                    //         uploadArea.style.backgroundColor = '#f5f5f5';
                    //         uploadArea.style.borderColor = '#5eabc7';
                            
                    //         const files = e.dataTransfer.files;
                    //         handleFiles(files);
                    //     });
                        
                    //     fileInput.addEventListener('change', function() {
                    //         handleFiles(this.files);
                    //     });
                        
                    //     // Handle the selected image files
                    //     function handleFiles(files) {
                    //         if (files.length > 5) {
                    //             alert('Please select a maximum of 5 images.');
                    //             return;
                    //         }
                            
                    //         // Remove any existing preview
                    //         const existingPreview = document.querySelector('.image-preview');
                    //         if (existingPreview) {
                    //             existingPreview.remove();
                    //         }
                            
                    //         // Create preview container
                    //         const previewContainer = document.createElement('div');
                    //         previewContainer.className = 'image-preview';
                    //         previewContainer.style.display = 'flex';
                    //         previewContainer.style.flexWrap = 'wrap';
                    //         previewContainer.style.gap = '10px';
                    //         previewContainer.style.marginTop = '20px';
                            
                    //         for (let i = 0; i < files.length; i++) {
                    //             const file = files[i];
                    //             if (!file.type.match('image.*')) {
                    //                 continue;
                    //             }
                                
                    //             const reader = new FileReader();
                    //             reader.onload = (function(theFile) {
                    //                 return function(e) {
                    //                     const previewWrapper = document.createElement('div');
                    //                     previewWrapper.style.position = 'relative';
                    //                     previewWrapper.style.width = 'calc(20% - 8px)';
                    //                     previewWrapper.style.minWidth = '100px';
                                        
                    //                     const preview = document.createElement('img');
                    //                     preview.src = e.target.result;
                    //                     preview.style.width = '100%';
                    //                     preview.style.height = 'auto';
                    //                     preview.style.borderRadius = '4px';
                    //                     preview.style.objectFit = 'cover';
                    //                     preview.style.aspectRatio = '1/1';
                                        
                    //                     const removeBtn = document.createElement('button');
                    //                     removeBtn.innerHTML = '×';
                    //                     removeBtn.style.position = 'absolute';
                    //                     removeBtn.style.top = '5px';
                    //                     removeBtn.style.right = '5px';
                    //                     removeBtn.style.backgroundColor = 'rgba(255,255,255,0.7)';
                    //                     removeBtn.style.border = 'none';
                    //                     removeBtn.style.borderRadius = '50%';
                    //                     removeBtn.style.width = '22px';
                    //                     removeBtn.style.height = '22px';
                    //                     removeBtn.style.cursor = 'pointer';
                    //                     removeBtn.style.display = 'flex';
                    //                     removeBtn.style.justifyContent = 'center';
                    //                     removeBtn.style.alignItems = 'center';
                                        
                    //                     removeBtn.addEventListener('click', function() {
                    //                         previewWrapper.remove();
                    //                         if (document.querySelectorAll('.image-preview img').length === 0) {
                    //                             previewContainer.remove();
                    //                         }
                    //                     });
                                        
                    //                     previewWrapper.appendChild(preview);
                    //                     previewWrapper.appendChild(removeBtn);
                    //                     previewContainer.appendChild(previewWrapper);
                    //                 };
                    //             })(file);
                                
                    //             reader.readAsDataURL(file);
                    //         }
                            
                    //         uploadArea.after(previewContainer);
                            
                    //         // Add responsive handling for preview images
                    //         function adjustPreviewImages() {
                    //             const previewWrappers = document.querySelectorAll('.image-preview > div');
                    //             if (window.innerWidth < 768) {
                    //                 previewWrappers.forEach(wrapper => {
                    //                     wrapper.style.width = 'calc(33.33% - 7px)';
                    //                 });
                    //             } else if (window.innerWidth < 500) {
                    //                 previewWrappers.forEach(wrapper => {
                    //                     wrapper.style.width = 'calc(50% - 5px)';
                    //                 });
                    //             } else {
                    //                 previewWrappers.forEach(wrapper => {
                    //                     wrapper.style.width = 'calc(20% - 8px)';
                    //                 });
                    //             }
                    //         }
                            
                    //         adjustPreviewImages();
                    //         window.addEventListener('resize', adjustPreviewImages);
                    //     }
                    // }
        
                    function adjustConsultationCards() {
                        const container = document.querySelector('.consultation-options');
                        const cards = document.querySelectorAll('.option-card');
                        
                        if (window.innerWidth < 768) {
                            container.style.flexDirection = 'column';
                            cards.forEach(card => {
                                card.style.minWidth = '100%';
                            });
                        } else {
                            container.style.flexDirection = 'row';
                            cards.forEach(card => {
                                card.style.minWidth = '200px';
                            });
                        }
                    }
                
                    
                    // 2. Create responsive calendar with real dates and multiple months
                    function createResponsiveCalendar() {
                        const calendarSection = document.querySelector('.calendar-section');
                        const existingCalendar = document.querySelector('.calendar');
                        if (existingCalendar) {
                            existingCalendar.remove();
                        }
                        
                        // Create calendar wrapper
                        const calendarWrapper = document.createElement('div');
                        calendarWrapper.className = 'calendar-wrapper';
                        calendarWrapper.style.position = 'relative';
                        
                        // Get current date and create calendar
                        const today = new Date();
                        let currentMonth = today.getMonth();
                        let currentYear = today.getFullYear();
                        
                        function renderCalendar(month, year) {
                            // Create calendar container
                            const calendar = document.createElement('div');
                            calendar.className = 'calendar';
                            calendar.style.marginBottom = '20px';
                            calendar.style.border = '1px solid #e0e0e0';
                            calendar.style.borderRadius = '8px';
                            calendar.style.overflow = 'hidden';
                            
                            // Create calendar header
                            const header = document.createElement('div');
                            header.className = 'calendar-header';
                            header.style.backgroundColor = '#5eabc7';
                            header.style.color = 'white';
                            header.style.padding = '15px';
                            header.style.display = 'flex';
                            header.style.justifyContent = 'space-between';
                            header.style.alignItems = 'center';
                            
                            const prevBtn = document.createElement('button');
                            prevBtn.className = 'btn-secondary';
                            prevBtn.innerHTML = '&lt;';
                            prevBtn.style.backgroundColor = 'rgba(255,255,255,0.2)';
                            prevBtn.style.border = 'none';
                            prevBtn.style.color = 'white';
                            prevBtn.style.padding = '5px 10px';
                            prevBtn.style.borderRadius = '4px';
                            prevBtn.style.cursor = 'pointer';
                            
                            const nextBtn = document.createElement('button');
                            nextBtn.className = 'btn-secondary';
                            nextBtn.innerHTML = '&gt;';
                            nextBtn.style.backgroundColor = 'rgba(255,255,255,0.2)';
                            nextBtn.style.border = 'none';
                            nextBtn.style.color = 'white';
                            nextBtn.style.padding = '5px 10px';
                            nextBtn.style.borderRadius = '4px';
                            nextBtn.style.cursor = 'pointer';
                            
                            const monthYearText = document.createElement('h4');
                            monthYearText.textContent = new Date(year, month).toLocaleString('default', { month: 'long', year: 'numeric' });
                            monthYearText.style.margin = '0';
                            
                            header.appendChild(prevBtn);
                            header.appendChild(monthYearText);
                            header.appendChild(nextBtn);
                            calendar.appendChild(header);
                            
                            // Create calendar grid
                            const grid = document.createElement('div');
                            grid.className = 'calendar-grid';
                            grid.style.display = 'grid';
                            grid.style.gridTemplateColumns = 'repeat(7, 1fr)';
                            
                            // Add day names
                            const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
                            dayNames.forEach(day => {
                                const dayNameElement = document.createElement('div');
                                dayNameElement.className = 'calendar-day day-name';
                                dayNameElement.textContent = day;
                                dayNameElement.style.fontWeight = 'bold';
                                dayNameElement.style.backgroundColor = '#f5f5f5';
                                dayNameElement.style.padding = '10px';
                                dayNameElement.style.textAlign = 'center';
                                dayNameElement.style.borderBottom = '1px solid #e0e0e0';
                                dayNameElement.style.borderRight = '1px solid #e0e0e0';
                                
                                // Apply different style to weekend day names
                                if (day === 'Sun' || day === 'Sat') {
                                    dayNameElement.style.backgroundColor = '#e6e6e6';
                                    dayNameElement.style.color = '#999';
                                }
                                
                                grid.appendChild(dayNameElement);
                            });
                            
                            // Get first day of month and total days in month
                            const firstDay = new Date(year, month, 1).getDay();
                            const daysInMonth = new Date(year, month + 1, 0).getDate();
                            
                            // Fill in empty cells before first day of month
                            for (let i = 0; i < firstDay; i++) {
                                const emptyDay = document.createElement('div');
                                emptyDay.className = 'calendar-day';
                                emptyDay.style.padding = '10px';
                                emptyDay.style.textAlign = 'center';
                                emptyDay.style.borderBottom = '1px solid #e0e0e0';
                                emptyDay.style.borderRight = '1px solid #e0e0e0';
                                grid.appendChild(emptyDay);
                            }
                            
                            // Fill in days of month
                            for (let i = 1; i <= daysInMonth; i++) {
                                const dayElement = document.createElement('div');
                                dayElement.className = 'calendar-day';
                                dayElement.textContent = i;
                                dayElement.style.padding = '10px';
                                dayElement.style.textAlign = 'center';
                                dayElement.style.borderBottom = '1px solid #e0e0e0';
                                dayElement.style.borderRight = '1px solid #e0e0e0';
                                
                                // Check if date is in the past
                                const currentDate = new Date(year, month, i);
                                const now = new Date();
                                now.setHours(0, 0, 0, 0);
                                
                                // Check if it's a weekend
                                const dayOfWeek = currentDate.getDay();
                                const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
                                
                                // Style weekends differently and make them unavailable
                                if (isWeekend) {
                                    dayElement.style.backgroundColor = '#f5f5f5';
                                    dayElement.style.color = '#999';
                                    dayElement.style.textDecoration = 'line-through';
                                    dayElement.setAttribute('title', 'Weekend - Not Available');
                                }
                                // Make weekdays available (not weekends and not past days)
                                else if (currentDate >= now) {
                                    dayElement.classList.add('available');
                                    dayElement.style.cursor = 'pointer';
                                    
                                    // Highlight if today
                                    if (currentDate.getDate() === today.getDate() && 
                                        currentDate.getMonth() === today.getMonth() && 
                                        currentDate.getFullYear() === today.getFullYear()) {
                                        dayElement.style.backgroundColor = '#e6f2f5';
                                        dayElement.style.fontWeight = 'bold';
                                    }
                                    
                                    dayElement.addEventListener('click', function() {
                                        // Remove selected class from all days
                                        document.querySelectorAll('.calendar-day.selected').forEach(day => {
                                            day.classList.remove('selected');
                                            day.style.backgroundColor = '';
                                            day.style.color = '';
                                        });
                                        
                                        // Add selected class to clicked day
                                        this.classList.add('selected');
                                        this.style.backgroundColor = '#5eabc7';
                                        this.style.color = 'white';
                                        
                                        // Remove placeholder message
                                        const placeholderMessage = document.querySelector('.date-selection-message');
                                        if (placeholderMessage) {
                                            placeholderMessage.remove();
                                        }
                                        
                                        // Update time slots header
                                        const dateName = currentDate.toLocaleString('default', { month: 'long', day: 'numeric', year: 'numeric' });
                                        updateTimeSlots(dateName);
                                    });
                                    
                                    dayElement.addEventListener('mouseover', function() {
                                        if (!this.classList.contains('selected')) {
                                            this.style.backgroundColor = '#e6f2f5';
                                        }
                                    });
                                    
                                    dayElement.addEventListener('mouseout', function() {
                                        if (!this.classList.contains('selected')) {
                                            this.style.backgroundColor = '';
                                        }
                                    });
                                }
                                
                                grid.appendChild(dayElement);
                            }
                            
                            calendar.appendChild(grid);
                            
                            // Event listeners for next/prev month
                            prevBtn.addEventListener('click', function() {
                                let newMonth = month - 1;
                                let newYear = year;
                                if (newMonth < 0) {
                                    newMonth = 11;
                                    newYear--;
                                }
                                
                                clearCalendar();
                                renderCalendar(newMonth, newYear);
                            });
                            
                            nextBtn.addEventListener('click', function() {
                                let newMonth = month + 1;
                                let newYear = year;
                                if (newMonth > 11) {
                                    newMonth = 0;
                                    newYear++;
                                }
                                
                                clearCalendar();
                                renderCalendar(newMonth, newYear);
                            });
                            
                            // Add to DOM
                            calendarWrapper.appendChild(calendar);
                        }
                        
                        function clearCalendar() {
                            while (calendarWrapper.firstChild) {
                                calendarWrapper.firstChild.remove();
                            }
                        }
                        
                        renderCalendar(currentMonth, currentYear);
                        calendarSection.prepend(calendarWrapper);
                        
                        // Make calendar responsive
                        function adjustCalendar() {
                            const calendarDays = document.querySelectorAll('.calendar-day');
                            
                            if (window.innerWidth < 500) {
                                calendarDays.forEach(day => {
                                    day.style.padding = '5px';
                                    day.style.fontSize = '14px';
                                });
                            } else {
                                calendarDays.forEach(day => {
                                    day.style.padding = '10px';
                                    day.style.fontSize = '16px';
                                });
                            }
                        }
                        
                        adjustCalendar();
                        window.addEventListener('resize', adjustCalendar);
                    }
                    
                    // 3. Create more time slots divided into afternoon and evening
                    async function updateTimeSlots(selectedDate) {
                        const dateArray = selectedDate.split(' ');
                        dateArray[1] = dateArray[1].substring(0,dateArray[1].length-1);
                        let temp = dateArray[0];
                        dateArray[0] = dateArray[1];
                        dateArray[1] = temp;

                        console.log(dateArray);

                        const bookedtimes = await getBookings(dateArray);
                        console.log(bookedtimes);
                        // Remove existing time slots section
                        const existingTimeSlots = document.querySelector('.time-slots-container');
                        if (existingTimeSlots) {
                            existingTimeSlots.remove();
                        }

                        // Create container for time slots sections
                        const timeSlotsContainer = document.createElement('div');
                        timeSlotsContainer.className = 'time-slots-container';
                        timeSlotsContainer.style.marginTop = '20px';
                        
                        // Create header for selected date
                        const timeHeader = document.createElement('h4');
                        timeHeader.textContent = `Available Time Slots for ${selectedDate || 'Selected Date'}`;
                        timeHeader.style.marginTop = '20px';
                        timeHeader.style.marginBottom = '15px';
                        
                        // Create morning section
                        const morningSection = document.createElement('div');
                        morningSection.className = 'time-slot-section';
                        
                        const morningHeader = document.createElement('h5');
                        morningHeader.textContent = 'Morning';
                        morningHeader.style.marginBottom = '10px';
                        morningHeader.style.color = '#5eabc7';
                        
                        const morningSlots = document.createElement('div');
                        morningSlots.className = 'time-slots';
                        morningSlots.style.display = 'flex';
                        morningSlots.style.flexWrap = 'wrap';
                        morningSlots.style.gap = '10px';
                        morningSlots.style.marginBottom = '20px';
                        
                        // Morning time slots
                        const morningTimes = ['8:00 AM', '8:30 AM', '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM'];
                        morningTimes.forEach(time => {
                            const slot = createTimeSlot(time,bookedtimes);
                            morningSlots.appendChild(slot);
                        });
                        
                        morningSection.appendChild(morningHeader);
                        morningSection.appendChild(morningSlots);
                        
                        // Create afternoon section
                        const afternoonSection = document.createElement('div');
                        afternoonSection.className = 'time-slot-section';
                        
                        const afternoonHeader = document.createElement('h5');
                        afternoonHeader.textContent = 'Afternoon';
                        afternoonHeader.style.marginBottom = '10px';
                        afternoonHeader.style.color = '#5eabc7';
                        
                        const afternoonSlots = document.createElement('div');
                        afternoonSlots.className = 'time-slots';
                        afternoonSlots.style.display = 'flex';
                        afternoonSlots.style.flexWrap = 'wrap';
                        afternoonSlots.style.gap = '10px';
                        afternoonSlots.style.marginBottom = '20px';
                        
                        // Afternoon time slots
                        const afternoonTimes = ['12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM'];
                        afternoonTimes.forEach(time => {
                            const slot = createTimeSlot(time,bookedtimes);
                            afternoonSlots.appendChild(slot);
                        });
                        
                        afternoonSection.appendChild(afternoonHeader);
                        afternoonSection.appendChild(afternoonSlots);
                        
                        // Create evening section
                        const eveningSection = document.createElement('div');
                        eveningSection.className = 'time-slot-section';
                        
                        const eveningHeader = document.createElement('h5');
                        eveningHeader.textContent = 'Evening';
                        eveningHeader.style.marginBottom = '10px';
                        eveningHeader.style.color = '#5eabc7';
                        
                        const eveningSlots = document.createElement('div');
                        eveningSlots.className = 'time-slots';
                        eveningSlots.style.display = 'flex';
                        eveningSlots.style.flexWrap = 'wrap';
                        eveningSlots.style.gap = '10px';
                        
                        // Evening time slots
                        const eveningTimes = ['4:00 PM', '4:30 PM', '5:00 PM', '5:30 PM', '6:00 PM', '6:30 PM', '7:00 PM'];
                        eveningTimes.forEach(time => {
                            const slot = createTimeSlot(time,bookedtimes);
                            eveningSlots.appendChild(slot);
                        });
                        
                        eveningSection.appendChild(eveningHeader);
                        eveningSection.appendChild(eveningSlots);
                        
                        // Add all sections to container
                        timeSlotsContainer.appendChild(timeHeader);
                        timeSlotsContainer.appendChild(morningSection);
                        timeSlotsContainer.appendChild(afternoonSection);
                        timeSlotsContainer.appendChild(eveningSection);
                        
                        // Add container to DOM
                        document.querySelector('.calendar-section').appendChild(timeSlotsContainer);
                        
                        // Make time slots responsive
                        adjustTimeSlots();
                    }
                    
                    // Helper function to create a time slot
                    function createTimeSlot(time,bookedtimes) {
                        const slot = document.createElement('div');
                        slot.className = 'time-slot';
                        slot.textContent = time;
                        slot.style.padding = '8px 15px';
                        slot.style.border = '1px solid #e0e0e0';
                        slot.style.borderRadius = '20px';
                        slot.style.cursor = 'pointer';

                        if(bookedtimes.includes(time)){
                            slot.style.pointerEvents = 'none';
                            slot.style.opacity = 0.5;
                        }
                        
                        slot.addEventListener('click', function() {
                            document.querySelectorAll('.time-slot').forEach(s => {
                                s.classList.remove('selected');
                                s.style.backgroundColor = '';
                                s.style.color = '';
                                s.style.borderColor = '#e0e0e0';
                            });
                            
                            this.classList.add('selected');
                            this.style.backgroundColor = '#5eabc7';
                            this.style.color = 'white';
                            this.style.borderColor = '#5eabc7';
                        });
                        
                        slot.addEventListener('mouseover', function() {
                            if (!this.classList.contains('selected')) {
                                this.style.backgroundColor = '#f0f9fc';
                                this.style.borderColor = '#5eabc7';
                            }
                        });
                        
                        slot.addEventListener('mouseout', function() {
                            if (!this.classList.contains('selected')) {
                                this.style.backgroundColor = '';
                                this.style.borderColor = '#e0e0e0';
                            }
                        });
                        
                        return slot;
                    }
                    
                    // 4. Position confirmation button on the right side 
                    function adjustActionButtons() {
                        const actionButtons = document.querySelector('.action-buttons');
                        actionButtons.style.display = 'flex';
                        actionButtons.style.justifyContent = 'flex-end';
                        
                        const confirmButton = actionButtons.querySelector('.btn');
                        
                        if (window.innerWidth < 500) {
                            confirmButton.style.width = '100%';
                        } else {
                            confirmButton.style.width = 'auto';
                        }
                    }
                    
                    // Make time slots responsive
                    function adjustTimeSlots() {
                        const timeSlotsAll = document.querySelectorAll('.time-slots');
                        
                        if (window.innerWidth < 768) {
                            timeSlotsAll.forEach(timeSlots => {
                                const slots = timeSlots.querySelectorAll('.time-slot');
                                slots.forEach(slot => {
                                    slot.style.flex = '0 0 calc(33.33% - 7px)';
                                    slot.style.textAlign = 'center';
                                    slot.style.marginBottom = '5px';
                                });
                            });
                        } else if (window.innerWidth < 500) {
                            timeSlotsAll.forEach(timeSlots => {
                                const slots = timeSlots.querySelectorAll('.time-slot');
                                slots.forEach(slot => {
                                    slot.style.flex = '0 0 calc(50% - 5px)';
                                    slot.style.textAlign = 'center';
                                    slot.style.marginBottom = '5px';
                                });
                            });
                        } else {
                            timeSlotsAll.forEach(timeSlots => {
                                const slots = timeSlots.querySelectorAll('.time-slot');
                                slots.forEach(slot => {
                                    slot.style.flex = '0 0 auto';
                                    slot.style.marginBottom = '0';
                                });
                            });
                        }
                    }
                    
                    // Execute all responsive functions
                    function initResponsive() {
                        // setupImageUpload();
                        createResponsiveCalendar();
                        // Initial time slots setup
                        // updateTimeSlots('Select a date');
                        adjustActionButtons();
                        
                        // Global responsiveness
                        window.addEventListener('resize', function() {
                            adjustTimeSlots();
                            adjustActionButtons();
                        });
                    }
                    
                    // Run on page load
                    initResponsive();
                })

                document.addEventListener('DOMContentLoaded', function () {
                    const confirmButton = document.querySelector('.action-buttons .btn');
                
                    confirmButton.addEventListener('click', async function () {
                        // Get selected consultation type
                        const selectedConsultation = document.querySelector('.option-card.selected');
                        const consultationType = selectedConsultation ? selectedConsultation.querySelector('h4').innerText : null;
                
                        // Get selected date
                        const selectedDate = document.querySelector('.calendar-day.selected');
                        const date = selectedDate ? selectedDate.innerText : null;

                        const monthSelector = document.querySelector('.calendar-section .calendar .calendar-header h4');
                        const monthYear = monthSelector ? monthSelector.innerText.split(' ') : [null,null];
                
                        // Get selected time slot
                        const selectedTimeSlot = document.querySelector('.time-slot.selected');
                        const timeSlot = selectedTimeSlot ? selectedTimeSlot.innerText : null;
                
                        // Get other user inputs
                        const contactNumber = document.querySelector('input[type="tel"]').value;
                        const dob = document.querySelector('input[type="date"]').value;
                        const medications = document.querySelector('textarea[placeholder="List any medications you are currently taking"]').value;
                        const allergies = document.querySelector('textarea[placeholder="List any known allergies, including medication allergies"]').value;
                        const pastConditions = document.querySelector('textarea[placeholder="Describe any past skin conditions or treatments"]').value;
                        const symptomDescription = document.querySelector('textarea[placeholder="Please describe your skin concerns in detail"]').value;
                        const symptomDuration = document.querySelector('select').value;
                
                        // Print all collected data
                        

                        const bookingDetails = {
                            doctorId: 1,
                            consultationType: consultationType, 
                            date: date, 
                            month: monthYear[0], 
                            year: monthYear[1], 
                            timeSlot: timeSlot, 
                            symptoms: symptomDescription, 
                            symptomDuration: symptomDuration
                        }

                        for(let key in bookingDetails){
                            if(!bookingDetails[key]){
                                return setErrorMessage('Please fill all required fields!');
                            }
                        }

                        if(!medications || !allergies || !pastConditions){
                            return setErrorMessage('Please head over to profile and fill necessary medical history!');
                        }

                        // console.log("Booking Details:");
                        // console.log("Consultation Type:", consultationType);
                        // console.log("Selected Date:", date);
                        // console.log("Selected month:", monthYear[0]);
                        // console.log("Selected Year: ",monthYear[1]);
                        // console.log("Selected Time Slot:", timeSlot);
                        // console.log("Contact Number:", contactNumber);
                        // console.log("Date of Birth:", dob);
                        // console.log("Current Medications:", medications);
                        // console.log("Known Allergies:", allergies);
                        // console.log("Past Skin Conditions or Treatments:", pastConditions);
                        // console.log("Symptom Description:", symptomDescription);
                        // console.log("Duration of Symptoms:", symptomDuration);

                        await book(bookingDetails);
                    });
                });

function setErrorMessage(message){
    document.getElementById('error-text').textContent = message;
}

async function fetchUserData() {
    const response = await fetch('/get-user-details',{
        method: "GET",
        headers: {
            'content-type': 'application/json'
        }
    });
    const result = await response.json();
    if(response.ok) return result['result'][0]
    return null
}

async function fetchMedicalHistory() {
    const response = await fetch('/get-medical-history',{
        method: "GET",
        headers: {
            'content-type': 'application/json'
        }
    });
    const result = await response.json();
    if(response.ok && result['result'].length>0) return result['result'][0]
    else return {
        current_medication: '', known_allergies: '', past_information: ''
    }
}

async function loadUserData() {
    const ud = await fetchUserData();
    const mh = await fetchMedicalHistory();
    document.querySelector('textarea[placeholder="List any medications you are currently taking"]').value
        = mh.current_medication;
    document.querySelector('textarea[placeholder="List any known allergies, including medication allergies"]').value
        = mh.known_allergies;
    document.querySelector('textarea[placeholder="Describe any past skin conditions or treatments"]').value
        = mh.past_information;
    document.getElementById('full-name').value = ud.first_name + ' ' + ud.last_name;
    document.getElementById('email').value = ud.email;
    document.getElementById('contact').value = ud.contact;
    document.getElementById('dob').value = ud.date_of_birth;
}

await loadUserData();

async function book(bookingDetails){
    const response = await fetch('/book-appointment',{
        method: "POST",
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(bookingDetails)
    });
    const result = await response.json();
    let sent;
    if(response.ok){
        if(document.getElementById('email-toggle').checked){
            sent = await sendComfirmationEmail(bookingDetails);
        }
        else{
            console.log('wont send email');
        }
        alert(`Appointment booked! ${document.getElementById('email-toggle').checked ? 
                                    sent ? "Please check your email for confirmation details.":
                                    "Email could not be sent":
                                    ""}`);
        window.open('/',"_self");
    }
    else{
        setErrorMessage(result['message']);
    }
}

async function getBookings(dateArray) {
    const date = dateArray[0],month=dateArray[1],year=dateArray[2];
    const response = await fetch('/booked-times',{
        method: "POST",
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({date,month,year})
    });
    const result = await response.json();
    if(response.ok)
        return result['result'].map(obj => obj.time_slot);
    else{
        console.log(result);
        return [];
    }
}

async function sendComfirmationEmail(bookingDetails){
    const ud = await fetchUserData();
    const emailDetails = {...bookingDetails,...ud};
    const response = await fetch('/send-email-confirmation',{
        method: "POST",
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(emailDetails)
    });
    const result = await response.json();
    if(response.ok){
        return true
    }
    else{
        console.log(result);
        return false;
    }
}