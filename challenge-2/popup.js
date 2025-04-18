document.addEventListener('DOMContentLoaded', function() {
  const toggleWidget = document.getElementById('widget-toggle');
  
  // Get current widget visibility state
  chrome.storage.local.get(['widgetVisible'], function(result) {
    // Default to visible if not set
    toggleWidget.checked = result.widgetVisible !== false;
  });
  
  // Update storage and send message to content script when toggle changes
  toggleWidget.addEventListener('change', function() {
    const isVisible = toggleWidget.checked;
    
    // Save to storage
    chrome.storage.local.set({widgetVisible: isVisible}, function() {
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        if (tabs.length > 0 && tabs[0].url && tabs[0].url.includes('linkedin.com/in/')) {
          chrome.tabs.sendMessage(
            tabs[0].id, 
            {
              action: 'toggleWidget',
              visible: isVisible
            },
            function(response) {
              console.log('Toggle response:', response);
            }
          );
        }
      });
    });
  });
});