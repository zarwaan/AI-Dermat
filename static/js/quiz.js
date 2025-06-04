// document.getElementById('title').style.cursor="pointer";
// document.getElementById('title').addEventListener('click',function(){
//     window.open("/","_self")
// })

// import { addHeader } from "./header.js";

// addHeader(document.querySelector('.main'));

import { addHeader } from "./header.js";
addHeader(document.body);

const questions = [
    "How does your skin usually feel an hour after washing your face with a gentle cleanser?",
    "How often do you feel the need to apply a moisturizer?",
    "How does your skin react to new skincare products?",
    "What do your pores look like on your cheeks and nose?",
    "How frequently do you experience redness, stinging, or irritation on your face?",
    "How often do you experience breakouts (e.g., pimples, blackheads)?",
    "After applying a moisturizer, how does your skin feel?",
    "Do you notice any dark spots, freckles, or pigmentation issues?",
    "Which best describes your skin's texture?",
    "How frequently do you wear sunscreen?"
];

const options = [
    ["Tight and uncomfortable", "Smooth and balanced", "Shiny, especially on the forehead, nose, and chin", "Dry in some areas, oily in others"],
    ["Multiple times a day", "Once a day", "Only occasionally", "Rarely or never"],
    ["Often gets irritated or red", "Rarely has any reactions", "Breaks out easily", "Sensitive in some areas, but fine in others"],
    ["Very small or not visible", "Small and barely noticeable", "Large and noticeable", "Small on cheeks, larger on the nose and forehead"],
    ["Frequently", "Occasionally", "Rarely", "Only in certain areas"],
    ["Rarely or never", "Occasionally", "Frequently", "Only in certain areas (like T-zone)"],
    ["Still dry and needing more", "Perfectly comfortable and smooth", "A bit too oily or greasy", "Comfortable on some areas, but oily in others"],
    ["Yes, and I want to lighten them", "Yes, but I don't want to lighten them", "No pigmentation issues", "Some dark spots, but they don't bother me"],
    ["Rough or dry in most areas", "Smooth and balanced", "Oily or shiny in many areas", "Rough in some areas, smooth in others"],
    ["Daily, even indoors", "Only during outdoor activities", "Rarely or never", "Sometimes, mostly in summer or sunny days"]
];  

var questionDiv = document.getElementById('question');
var optionDiv = []
for(let i=1;i<5;i++){
    optionDiv.push(document.getElementById(`option${i}`));
}
questionDiv.innerHTML = questions[0];

optionDiv.forEach(function(option){
    option.addEventListener('click',function(){
        optionDiv.forEach(function(selectedoption){
            selectedoption.classList.remove('selected');
        })
        option.classList.add('selected');
    })
})
for(let i=1;i<5;i++){
    optionDiv[i-1].innerHTML = options[0][i-1];
}

var current = 0;

var nextBtn = document.getElementById('next');
var prevBtn = document.getElementById('previous');
var resultsBtn = document.getElementById('results');
var resultsDiv = document.getElementById('resultsDiv');
var progressBar = document.getElementById('progress-bar');

function updateProgressBar() {
    const progress = Math.round(((current + 1) / questions.length) * 100);
    progressBar.style.width = `${progress}%`;
    progressBar.setAttribute('aria-valuenow', progress);
    progressBar.textContent = `${current + 1}/${questions.length}`;
}

if(current===0)
    prevBtn.disabled = true;

function checkSelected(){
    for(let i=0;i<4;i++){
        if(optionDiv[i].classList.contains('selected'))
            return i;
    }
    return -1;
}

var answers = [];

nextBtn.addEventListener('click',function(){
    if(current===9){
        document.getElementById('quiz').style.display = 'none';
        document.getElementById('nav').style.display = 'none';
        document.querySelector('.progress-container').style.display = 'none';
        resultsDiv.style.display='block';
    }
    if(checkSelected()===-1){
        window.alert("Please select an option");
        return;
    }
    answers.push(checkSelected());
    current++;
    
    updateProgressBar();
        
    if(current!==0)
        prevBtn.disabled=false;
    questionDiv.innerHTML=questions[current];
    for(let i=0;i<4;i++){
        optionDiv[i].classList.remove('selected');
        optionDiv[i].innerHTML = options[current][i];
    }
    console.log(answers);
})

prevBtn.addEventListener('click',function(){
    answers.pop();
    current--;
    
    updateProgressBar();
    
    if(current===0)
        prevBtn.disabled=true;
    questionDiv.innerHTML=questions[current];
    for(let i=0;i<4;i++){
        optionDiv[i].classList.remove('selected');
        optionDiv[i].innerHTML = options[current][i];
    }
    console.log(answers);
})

// Enhanced results button event listener from quiz2.js
resultsBtn.addEventListener('click',function(){
    document.getElementById('welcome').style.display='none';
    document.getElementById('results').style.display='none';
    var drySensitiveScore = 0;
    var oilyScore = 0;
    var combinationScore = 0;
    var result;
    
    answers.forEach((answer, index) => {
        // Score calculation logic
        switch(index) {
            case 0:
                if (answer === 0) drySensitiveScore++;
                else if (answer === 1) combinationScore++;
                else if (answer === 2) oilyScore++;
                else if (answer === 3) combinationScore++;
                break;
            case 1:
                if (answer === 0) drySensitiveScore++;
                else if (answer === 1) combinationScore++;
                else if (answer === 2) oilyScore++;
                else if (answer === 3) oilyScore++;
                break;
            case 2:
                if (answer === 0) drySensitiveScore++;
                else if (answer === 1) combinationScore++;
                else if (answer === 2) oilyScore++;
                else if (answer === 3) combinationScore++;
                break;
            case 3:
                if (answer === 0) drySensitiveScore++;
                else if (answer === 1) combinationScore++;
                else if (answer === 2) oilyScore++;
                else if (answer === 3) combinationScore++;
                break;
            case 4:
                if (answer === 0) drySensitiveScore++;
                else if (answer === 1) combinationScore++;
                else if (answer === 2) oilyScore++;
                else if (answer === 3) combinationScore++;
                break;
            case 5:
                if (answer === 0) drySensitiveScore++;
                else if (answer === 1) combinationScore++;
                else if (answer === 2) oilyScore++;
                else if (answer === 3) combinationScore++;
                break;
            case 6:
                if (answer === 0) drySensitiveScore++;
                else if (answer === 1) combinationScore++;
                else if (answer === 2) oilyScore++;
                else if (answer === 3) combinationScore++;
                break;
            case 7:
                if (answer === 0) drySensitiveScore++;
                else if (answer === 1) drySensitiveScore++;
                else if (answer === 2) oilyScore++;
                else if (answer === 3) combinationScore++;
                break;
            case 8:
                if (answer === 0) drySensitiveScore++;
                else if (answer === 1) combinationScore++;
                else if (answer === 2) oilyScore++;
                else if (answer === 3) combinationScore++;
                break;
            case 9:
                if (answer === 0) drySensitiveScore++;
                else if (answer === 1) combinationScore++;
                else if (answer === 2) oilyScore++;
                else if (answer === 3) combinationScore++;
                break;
        }
    });
    
    // Calculate percentages for the chart
    const total = drySensitiveScore + oilyScore + combinationScore;
    const dryPercent = Math.round((drySensitiveScore / total) * 100);
    const oilyPercent = Math.round((oilyScore / total) * 100);
    const combiPercent = Math.round((combinationScore / total) * 100);
    
    // Determine skin type and create styled results
    if (drySensitiveScore >= oilyScore && drySensitiveScore >= combinationScore) {
        result = `
        <div class="results-header">
            <i class="bi bi-moisture skin-icon" style="color: #219EBC;"></i>
            <h1>Your Skin Type is Dry and Sensitive</h1>
            <div class="type-description">Your skin is prone to dryness and irritation, so gentle and hydrating products will help maintain comfort and balance.</div>
        </div>
        
        <div class="skin-score-chart">
            <div class="chart-container">
                <div class="chart-bar">
                    <div class="bar-section dry-bar" style="width: ${dryPercent}%;" title="Dry & Sensitive: ${dryPercent}%"></div>
                    <div class="bar-section oily-bar" style="width: ${oilyPercent}%;" title="Oily: ${oilyPercent}%"></div>
                    <div class="bar-section combi-bar" style="width: ${combiPercent}%;" title="Combination: ${combiPercent}%"></div>
                </div>
                <div class="chart-labels">
                    <span class="chart-label dry-label">Dry & Sensitive ${dryPercent}%</span>
                    <span class="chart-label oily-label">Oily ${oilyPercent}%</span>
                    <span class="chart-label combi-label">Combination ${combiPercent}%</span>
                </div>
            </div>
        </div>
        
        <div class="routine-container">
            <div class="routine-column">
                <div class="routine-header">
                    <i class="bi bi-brightness-high"></i>
                    <h4>Morning Routine</h4>
                </div>
                <ul class="routine-steps">
                    <li><span class="step-number">1</span> <strong>Gentle Hydrating Cleanser</strong> – Use a cleanser with hydrating ingredients like hyaluronic acid to avoid stripping your skin.</li>
                    <li><span class="step-number">2</span> <strong>Hydrating Toner</strong> – Choose a toner to lock in moisture and prep your skin for other products.</li>
                    <li><span class="step-number">3</span> <strong>Hyaluronic Acid Serum</strong> – This serum helps attract moisture, keeping your skin hydrated throughout the day.</li>
                    <li><span class="step-number">4</span> <strong>Rich Moisturizer</strong> – A cream with ceramides can strengthen your skin barrier and prevent water loss.</li>
                    <li><span class="step-number">5</span> <strong>SPF 30+ Sunscreen</strong> – Use a broad-spectrum sunscreen that is gentle on sensitive skin.</li>
                </ul>
            </div>
            
            <div class="routine-column">
                <div class="routine-header">
                    <i class="bi bi-moon"></i>
                    <h4>Evening Routine</h4>
                </div>
                <ul class="routine-steps">
                    <li><span class="step-number">1</span> <strong>Gentle Hydrating Cleanser</strong> – Repeat the cleansing step.</li>
                    <li><span class="step-number">2</span> <strong>Calming Serum</strong> – A serum with niacinamide can help soothe redness and reduce sensitivity.</li>
                    <li><span class="step-number">3</span> <strong>Night Cream</strong> – Opt for a heavier moisturizer with ceramides or squalane to support overnight skin repair.</li>
                </ul>
            </div>
        </div>
        
        <div class="tips-container">
            <h4><i class="bi bi-lightbulb"></i> Pro Tips for Dry & Sensitive Skin</h4>
            <ul class="skin-tips">
                <li>Avoid hot water when washing your face as it can strip natural oils</li>
                <li>Consider using a humidifier in your bedroom to add moisture to the air</li>
                <li>Look for products labeled "fragrance-free" rather than "unscented"</li>
                <li>Hydrating sheet masks can be used 1-2 times per week for extra moisture</li>
            </ul>
        </div>
        
        <div class="next-steps">
            <div class="action-buttons">
                <button class="btn results" onclick="window.print()"><i class="bi bi-printer"></i> Print Results</button>
            </div>
        </div>`;
        
    } else if (oilyScore >= drySensitiveScore && oilyScore >= combinationScore) {
        result = `
        <div class="results-header">
            <i class="bi bi-droplet-fill skin-icon" style="color: #219EBC;"></i>
            <h1>Your Skin Type is Oily</h1>
            <div class="type-description">Your skin produces excess oil, often leading to shine and breakouts. Oil-controlling and non-comedogenic products are ideal for you.</div>
        </div>
        
        <div class="skin-score-chart">
            <div class="chart-container">
                <div class="chart-bar">
                    <div class="bar-section dry-bar" style="width: ${dryPercent}%;" title="Dry & Sensitive: ${dryPercent}%"></div>
                    <div class="bar-section oily-bar" style="width: ${oilyPercent}%;" title="Oily: ${oilyPercent}%"></div>
                    <div class="bar-section combi-bar" style="width: ${combiPercent}%;" title="Combination: ${combiPercent}%"></div>
                </div>
                <div class="chart-labels">
                    <span class="chart-label dry-label">Dry & Sensitive ${dryPercent}%</span>
                    <span class="chart-label oily-label">Oily ${oilyPercent}%</span>
                    <span class="chart-label combi-label">Combination ${combiPercent}%</span>
                </div>
            </div>
        </div>
        
        <div class="routine-container">
            <div class="routine-column">
                <div class="routine-header">
                    <i class="bi bi-brightness-high"></i>
                    <h4>Morning Routine</h4>
                </div>
                <ul class="routine-steps">
                    <li><span class="step-number">1</span> <strong>Salicylic Acid Cleanser</strong> – Start with a gentle salicylic acid cleanser to help clear pores and control oil.</li>
                    <li><span class="step-number">2</span> <strong>Oil-Free Toner</strong> – Use a toner with witch hazel or niacinamide to control shine.</li>
                    <li><span class="step-number">3</span> <strong>Light Gel Moisturizer</strong> – Opt for a non-comedogenic gel moisturizer to avoid clogging pores.</li>
                    <li><span class="step-number">4</span> <strong>SPF 30+ Sunscreen</strong> – A mattifying sunscreen keeps your skin protected without adding shine.</li>
                </ul>
            </div>
            
            <div class="routine-column">
                <div class="routine-header">
                    <i class="bi bi-moon"></i>
                    <h4>Evening Routine</h4>
                </div>
                <ul class="routine-steps">
                    <li><span class="step-number">1</span> <strong>Salicylic Acid Cleanser</strong> – Repeat the morning cleansing step.</li>
                    <li><span class="step-number">2</span> <strong>Retinol Serum</strong> – Use a retinol serum 2-3 times a week to regulate oil production and support skin renewal.</li>
                    <li><span class="step-number">3</span> <strong>Light Gel Moisturizer</strong> – Reapply a light moisturizer to maintain hydration.</li>
                </ul>
            </div>
        </div>
        
        <div class="tips-container">
            <h4><i class="bi bi-lightbulb"></i> Pro Tips for Oily Skin</h4>
            <ul class="skin-tips">
                <li>Use blotting papers throughout the day to absorb excess oil</li>
                <li>Look for products labeled "oil-free" and "non-comedogenic"</li>
                <li>Clay masks 1-2 times weekly can help reduce oiliness</li>
                <li>Don't skip moisturizer – doing so can actually increase oil production</li>
            </ul>
        </div>
        
        <div class="next-steps">
            <div class="action-buttons">
                <button class="btn results" onclick="window.print()"><i class="bi bi-printer"></i> Print Results</button>
            </div>
        </div>`;
        
    } else if (combinationScore >= drySensitiveScore && combinationScore >= oilyScore) {
        result = `
        <div class="results-header">
            <i class="bi bi-circle-half skin-icon" style="color: #219EBC;"></i>
            <h1>Your Skin Type is Combination</h1>
            <div class="type-description">With both oily and dry areas, your skin benefits from a balanced approach with products tailored to different zones.</div>
        </div>
        
        <div class="skin-score-chart">
            <div class="chart-container">
                <div class="chart-bar">
                    <div class="bar-section dry-bar" style="width: ${dryPercent}%;" title="Dry & Sensitive: ${dryPercent}%"></div>
                    <div class="bar-section oily-bar" style="width: ${oilyPercent}%;" title="Oily: ${oilyPercent}%"></div>
                    <div class="bar-section combi-bar" style="width: ${combiPercent}%;" title="Combination: ${combiPercent}%"></div>
                </div>
                <div class="chart-labels">
                    <span class="chart-label dry-label">Dry & Sensitive ${dryPercent}%</span>
                    <span class="chart-label oily-label">Oily ${oilyPercent}%</span>
                    <span class="chart-label combi-label">Combination ${combiPercent}%</span>
                </div>
            </div>
        </div>
        
        <div class="routine-container">
            <div class="routine-column">
                <div class="routine-header">
                    <i class="bi bi-brightness-high"></i>
                    <h4>Morning Routine</h4>
                </div>
                <ul class="routine-steps">
                    <li><span class="step-number">1</span> <strong>Gentle Foaming Cleanser</strong> – Choose a mild foaming cleanser to cleanse without drying out the skin.</li>
                    <li><span class="step-number">2</span> <strong>Hydrating Toner</strong> – A toner with aloe or rose water can provide light hydration.</li>
                    <li><span class="step-number">3</span> <strong>Non-Comedogenic Moisturizer</strong> – Apply a light, gel-based moisturizer on oily areas and a slightly richer product on dry areas.</li>
                    <li><span class="step-number">4</span> <strong>SPF 30+ Sunscreen</strong> – A matte sunscreen can help control shine without clogging pores.</li>
                </ul>
            </div>
            
            <div class="routine-column">
                <div class="routine-header">
                    <i class="bi bi-moon"></i>
                    <h4>Evening Routine</h4>
                </div>
                <ul class="routine-steps">
                    <li><span class="step-number">1</span> <strong>Foaming Cleanser</strong> – Use the same cleanser as in the morning.</li>
                    <li><span class="step-number">2</span> <strong>Exfoliating Serum</strong> – 1-2 times a week, apply a glycolic acid serum to prevent clogged pores.</li>
                    <li><span class="step-number">3</span> <strong>Light Moisturizer</strong> – Reapply a lightweight moisturizer for balanced hydration.</li>
                </ul>
            </div>
        </div>
        
        <div class="tips-container">
            <h4><i class="bi bi-lightbulb"></i> Pro Tips for Combination Skin</h4>
            <ul class="skin-tips">
                <li>Multi-masking (using different masks on different areas) can be effective</li>
                <li>Consider using lighter products on your T-zone and richer ones on cheeks</li>
                <li>Seasonal changes may require adjusting your routine</li>
                <li>Gentle exfoliation 1-2 times weekly helps keep all zones balanced</li>
            </ul>
        </div>
        
        <div class="next-steps">
            <div class="action-buttons">
                <button class="btn results" onclick="window.print()"><i class="bi bi-printer"></i> Print Results</button>
            </div>
        </div>`;
        
    } else {
        result = `<h1>Unable to determine skin type, scores are too close.</h1>
        <p>Your results show a very balanced distribution between different skin types. This suggests you may have normal skin or your skin condition might vary significantly depending on external factors.</p>
        <p>We recommend consulting with a dermatologist for a more personalized assessment.</p>`;
    }
    
    // Display the results
    document.getElementById('resultsBox').innerHTML = result;
    
    // Animate bar chart filling
    setTimeout(() => {
        const barSections = document.querySelectorAll('.bar-section');
        barSections.forEach(section => {
            const width = section.style.width;
            section.style.width = '0%';
            setTimeout(() => {
                section.style.width = width;
            }, 100);
        });
    }, 100);
});

// Initialize progress bar
updateProgressBar();