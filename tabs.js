/* globals chrome */

'use strict';

function openJIRAinNewTabs() {
  var urlPrefix = 'https://sni-digital.atlassian.net/browse/',
    input = window.prompt('Please enter the JIRA ticket number or numbers:'),
    value;

  function newTab(path) {
    var validPath = path.trim();

    chrome.tabs.create({url: urlPrefix + validPath});
  }

  if (/,/.test(input)) {
    value = input.split(',');
  } else {
    value = input;
  }

  if (typeof value === 'string') {
    newTab(input);
  } else if (Array.isArray(value)) {
    value.forEach(newTab);
  }
}

// Called when the user clicks on the browser action.
chrome.browserAction.onClicked.addListener(openJIRAinNewTabs);
