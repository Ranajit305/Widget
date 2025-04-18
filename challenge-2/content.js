// Static data (in production, this would come from an API or background script)
const companyData = {
  "companyName": "TechCorp",
  "matchScore": 86,
  "accountStatus": "Target"
};

// Create and inject widget
function createWidget() {
  // Create widget container
  const widget = document.createElement('div');
  widget.id = 'lpe-widget';
  widget.className = 'lpe-widget';
  
  // Create widget header with toggle button
  const header = document.createElement('div');
  header.className = 'lpe-header';
  
  const title = document.createElement('h3');
  title.textContent = 'Company Insights';
  
  const toggleBtn = document.createElement('button');
  toggleBtn.className = 'lpe-toggle';
  toggleBtn.textContent = '−';
  toggleBtn.title = 'Hide/Show';
  toggleBtn.addEventListener('click', toggleWidget);
  
  header.appendChild(title);
  header.appendChild(toggleBtn);
  
  // Create widget content
  const content = document.createElement('div');
  content.className = 'lpe-content';
  
  // Company name
  const companyName = document.createElement('div');
  companyName.className = 'lpe-company-name';
  companyName.innerHTML = `<strong>${companyData.companyName}</strong>`;
  
  // Match score
  const matchScore = document.createElement('div');
  matchScore.className = 'lpe-match-score';
  
  const scoreLabel = document.createElement('div');
  scoreLabel.className = 'lpe-score-label';
  scoreLabel.textContent = 'Match Score:';
  
  const scoreValue = document.createElement('div');
  scoreValue.className = 'lpe-score-value';
  scoreValue.textContent = `${companyData.matchScore}/100`;
  
  const progressContainer = document.createElement('div');
  progressContainer.className = 'lpe-progress-container';
  
  const progressBar = document.createElement('div');
  progressBar.className = 'lpe-progress-bar';
  progressBar.style.width = `${companyData.matchScore}%`;
  
  progressContainer.appendChild(progressBar);
  
  matchScore.appendChild(scoreLabel);
  matchScore.appendChild(scoreValue);
  matchScore.appendChild(progressContainer);
  
  // Account status
  const accountStatus = document.createElement('div');
  accountStatus.className = 'lpe-account-status';
  
  const statusLabel = document.createElement('div');
  statusLabel.className = 'lpe-status-label';
  statusLabel.textContent = 'Account Status:';
  
  const statusTag = document.createElement('span');
  statusTag.className = 'lpe-status-tag';
  statusTag.classList.add(companyData.accountStatus === 'Target' ? 'lpe-target' : 'lpe-not-target');
  statusTag.textContent = companyData.accountStatus;
  
  accountStatus.appendChild(statusLabel);
  accountStatus.appendChild(statusTag);
  
  // Assemble widget
  content.appendChild(companyName);
  content.appendChild(matchScore);
  content.appendChild(accountStatus);
  
  widget.appendChild(header);
  widget.appendChild(content);
  
  // Add to page
  document.body.appendChild(widget);
  
  // Check stored visibility state
  chrome.storage.local.get(['widgetVisible'], function(result) {
    if (result.widgetVisible === false) {
      content.style.display = 'none';
      toggleBtn.textContent = '+';
    }
  });
}

// Toggle widget visibility
function toggleWidget() {
  const content = document.querySelector('.lpe-content');
  const toggleBtn = document.querySelector('.lpe-toggle');
  
  const isVisible = content.style.display !== 'none';
  
  if (isVisible) {
    content.style.display = 'none';
    toggleBtn.textContent = '+';
    chrome.storage.local.set({widgetVisible: false});
  } else {
    content.style.display = 'block';
    toggleBtn.textContent = '−';
    chrome.storage.local.set({widgetVisible: true});
  }
}

// Set widget visibility based on stored state or message
function setWidgetVisibility(isVisible) {
  const content = document.querySelector('.lpe-content');
  const toggleBtn = document.querySelector('.lpe-toggle');
  
  if (!content || !toggleBtn) return;
  
  if (isVisible) {
    content.style.display = 'block';
    toggleBtn.textContent = '−';
  } else {
    content.style.display = 'none';
    toggleBtn.textContent = '+';
  }
}

// Listen for messages from popup
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === 'toggleWidget') {
    setWidgetVisibility(request.visible);
    sendResponse({success: true});
  }
});

// Initialize widget when page is fully loaded
window.addEventListener('load', () => {
  // Wait a bit to ensure LinkedIn's dynamic content is loaded
  setTimeout(createWidget, 1500);
});