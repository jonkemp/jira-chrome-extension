'use strict';

(function(factory) {
  if (typeof module === 'object' && typeof module.exports === 'object') {
    var noop = function() {};

    global.chrome = {
      browserAction: {
        onClicked: {
          addListener: noop
        }
      },
      tabs: {
        create: noop
      }
    };

    factory(global, global.chrome);
  } else {
    factory(window, window.chrome);
  }
}(function(window, chrome) {

  function getIDsFromPrompt() {
    var ids,
        input = window.prompt('Please enter the JIRA ticket number or numbers:');

    if (/,/.test(input)) {
      ids = input.split(',');
    } else {
      ids = [ input ];
    }

    return ids;
  }

  function getPath(id) {
    var urlPrefix = 'https://sni-digital.atlassian.net/browse/',
        validId = id.trim();

    return urlPrefix + validId;
  }

  function newTab(url) {
    chrome.tabs.create({ url: url });
  }

  function openJIRAinNewTabs() {
    var jiraIds = getIDsFromPrompt(),
        jiraURLs = jiraIds.map(getPath);

    jiraURLs.forEach(newTab);
  }

  // Called when the user clicks on the browser action.
  chrome.browserAction.onClicked.addListener(openJIRAinNewTabs);

  window.jiraChromeExt = {
    getIDsFromPrompt: getIDsFromPrompt,
    getPath: getPath,
    newTab: newTab,
    openJIRAinNewTabs: openJIRAinNewTabs
  };
}));
