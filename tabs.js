/* globals chrome */

'use strict';

(function(factory) {
  if (typeof module === 'object' && typeof module.exports === 'object') {
    var sinon = require('sinon');

    global.chrome = {
      browserAction: {
        onClicked: {
          addListener: sinon.stub()
        }
      },
      tabs: {
        create: sinon.stub()
      }
    };

    factory(global, global.chrome);
  } else {
    factory(window, window.chrome);
  }
}(function(window, chrome) {

  var openJIRAinNewTabs = window.openJIRAinNewTabs = function() {
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

}));
