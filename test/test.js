/* eslint-disable */

var assert = require('assert'),
    sinon = require('sinon'),
    tabs = require('../tabs');

describe('jira-chrome-extension', function() {
  describe('#openJIRAinNewTabs()', function() {
    it('should call window.prompt and return the expected output', function() {
      global.prompt = sinon.stub().returns('ABCDE');

      var idsFromPrompt = global.jiraChromeExt.getIDsFromPrompt();

      assert.equal(global.prompt.calledOnce, true);
      assert.equal(global.prompt.getCall(0).args[0], 'Please enter the JIRA ticket number or numbers:');
      assert.deepEqual(idsFromPrompt, ['ABCDE']);

      global.prompt.reset();
    });

    it('should return the correct path', function() {
      var path = global.jiraChromeExt.getPath('ABCDE');

      assert.equal(path, 'https://sni-digital.atlassian.net/browse/ABCDE');
    });

    it('should strip whitespace from input', function() {
      var path = global.jiraChromeExt.getPath(' ABCDE');

      assert.equal(path, 'https://sni-digital.atlassian.net/browse/ABCDE');
    });

    it('should work with a comma separated list', function() {
      global.prompt = sinon.stub().returns('ABCDEFG,HIJKLMNOP');

      var idsFromPrompt = global.jiraChromeExt.getIDsFromPrompt();

      assert.deepEqual(idsFromPrompt, ['ABCDEFG', 'HIJKLMNOP']);

      global.prompt.reset();
    });
  });
});
