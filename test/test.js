/* eslint-disable */

var assert = require('assert'),
    sinon = require('sinon'),
    tabs = require('../tabs');

describe('jira-chrome-extension', function() {
  beforeEach(function() {
    global.prompt = sinon.stub().returns('ABCDE');
  });

  afterEach(function() {
    global.prompt.reset();
    global.chrome.tabs.create.reset();
  });

  describe('#openJIRAinNewTabs()', function() {
    it('should call window.prompt with expected message', function() {
      global.openJIRAinNewTabs();

      assert.ok(global.prompt.calledOnce);
      assert.ok(global.prompt.calledWith('Please enter the JIRA ticket number or numbers:'));
    });

    it('should call newTab with expected input', function() {
      var openJIRAinNewTabs = global.openJIRAinNewTabs();

      assert.ok(global.chrome.tabs.create.calledOnce);
      assert.ok(global.chrome.tabs.create.calledWith({url:'https://sni-digital.atlassian.net/browse/ABCDE'}));
    });

    it('should strip whitespace from input', function() {
      global.prompt = sinon.stub().returns(' ABCDE');

      var openJIRAinNewTabs = global.openJIRAinNewTabs();

      assert.ok(global.chrome.tabs.create.calledOnce);
      assert.ok(global.chrome.tabs.create.calledWith({url:'https://sni-digital.atlassian.net/browse/ABCDE'}));
    });

    it('should work with a comma separated list', function() {
      global.prompt = sinon.stub().returns('ABCDEFG,HIJKLMNOP');

      var openJIRAinNewTabs = global.openJIRAinNewTabs();

      assert.equal(global.chrome.tabs.create.callCount, 2);
      assert.ok(global.chrome.tabs.create.getCall(0).calledWith({url:'https://sni-digital.atlassian.net/browse/ABCDEFG'}));
      assert.ok(global.chrome.tabs.create.getCall(1).calledWith({url:'https://sni-digital.atlassian.net/browse/HIJKLMNOP'}));
    });
  });
});
