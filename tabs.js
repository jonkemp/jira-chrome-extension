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
    var input = window.prompt('Please enter the JIRA ticket number or numbers:');

    function getPath(path) {
      var urlPrefix = 'https://sni-digital.atlassian.net/browse/',
          validPath = path.trim();

      return urlPrefix + validPath;
    }

    function newTab(path) {
      chrome.tabs.create({url: getPath(path)});
    }

    if (/,/.test(input)) {
      input.split(',').forEach(newTab);
    } else {
      newTab(input);
    }
  }

  // Called when the user clicks on the browser action.
  chrome.browserAction.onClicked.addListener(openJIRAinNewTabs);

}));
