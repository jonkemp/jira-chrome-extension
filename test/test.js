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

      assert.equal(global.prompt.calledOnce, true);
      assert.equal(global.prompt.getCall(0).args[0], 'Please enter the JIRA ticket number or numbers:');
    });

    it('should call newTab with expected input', function() {
      global.openJIRAinNewTabs();

      assert.equal(global.chrome.tabs.create.calledOnce, true);
      assert.deepEqual(global.chrome.tabs.create.getCall(0).args[0], {url:'https://sni-digital.atlassian.net/browse/ABCDE'});
    });

    it('should strip whitespace from input', function() {
      global.prompt = sinon.stub().returns(' ABCDE');

      global.openJIRAinNewTabs();

      assert.equal(global.chrome.tabs.create.calledOnce, true);
      assert.deepEqual(global.chrome.tabs.create.getCall(0).args[0], {url:'https://sni-digital.atlassian.net/browse/ABCDE'});
    });

    it('should work with a comma separated list', function() {
      global.prompt = sinon.stub().returns('ABCDEFG,HIJKLMNOP');

      global.openJIRAinNewTabs();

      assert.equal(global.chrome.tabs.create.callCount, 2);
      assert.deepEqual(global.chrome.tabs.create.getCall(0).args[0], {url:'https://sni-digital.atlassian.net/browse/ABCDEFG'});
      assert.deepEqual(global.chrome.tabs.create.getCall(1).args[0], {url:'https://sni-digital.atlassian.net/browse/HIJKLMNOP'});
    });
  });
});
