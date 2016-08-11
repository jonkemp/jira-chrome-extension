/* eslint-disable */

var test = require('tape'),
    sinon = require('sinon'),
    tabs = require('../tabs');

test('should call window.prompt and return the expected output', function(assert) {
  global.prompt = sinon.stub().returns('ABCDE');

  var idsFromPrompt = global.jiraChromeExt.getIDsFromPrompt();

  assert.equal(global.prompt.calledOnce, true, 'Expect prompt to be called once');
  assert.equal(global.prompt.getCall(0).args[0], 'Please enter the JIRA ticket number or numbers:', 'Expect prompt to be called with this message');
  assert.deepEqual(idsFromPrompt, ['ABCDE'], 'Expect an array with the correct value');
  assert.end();

  global.prompt.reset();
});

test('should return the correct path', function(assert) {
  var path = global.jiraChromeExt.getPath('ABCDE');

  assert.equal(path, 'https://sni-digital.atlassian.net/browse/ABCDE', 'Expect the correct JIRA url');
  assert.end();
});

test('should strip whitespace from input', function(assert) {
  var path = global.jiraChromeExt.getPath(' ABCDE');

  assert.equal(path, 'https://sni-digital.atlassian.net/browse/ABCDE', 'Expect the correct JIRA url');
  assert.end();
});

test('should work with a comma separated list', function(assert) {
  global.prompt = sinon.stub().returns('ABCDEFG,HIJKLMNOP');

  var idsFromPrompt = global.jiraChromeExt.getIDsFromPrompt();

  assert.deepEqual(idsFromPrompt, ['ABCDEFG', 'HIJKLMNOP'], 'Expect an array with the correct value');
  assert.end();

  global.prompt.reset();
});
