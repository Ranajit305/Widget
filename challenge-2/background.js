// Initialize default settings when extension is installed
chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.local.set({widgetVisible: true}, function() {
    console.log('LinkedIn Profile Enhancer installed with default settings');
  });
});

// Handle tab updates to ensure widget visibility is consistent
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  if (changeInfo.status === 'complete' && tab.url && tab.url.includes('linkedin.com/in/')) {
    chrome.storage.local.get(['widgetVisible'], function(result) {
      const isVisible = result.widgetVisible !== false;
      chrome.tabs.sendMessage(tabId, {
        action: 'toggleWidget',
        visible: isVisible
      });
    });
  }
});

// Listen for messages from popup or content scripts
chrome.runtime.onMessage.addListener(function(request, sendResponse) {
  if (request.action === 'getCompanyData') {
    sendResponse({
      companyName: "TechCorp",
      matchScore: 86,
      accountStatus: "Target"
    });
    return true;
  }
});