var assert = require('assert');

var controller = require('../controllers/conversion.controller');

// To have full coverage I need front end and e2e tests but for the purposes of this homework I am sticking to unit. :) 
// I also need to test edge cases more fully

describe("Conversion Controller", function() {
  describe("convertMarkdownToHtml", function() {
      it("should convert # to <h1>", function() {
        let result = controller.convertMarkdownToHtml('# Hello');
        assert.equal('<h1>Hello</h1>', result);
      });     

      it("should convert 6 #'s to <h6>", function() {
        let result = controller.convertMarkdownToHtml('###### Hello');
        assert.equal('<h6>Hello</h6>', result);
      });   

      it("should convert 7 #'s to <h6>", function() {
        let result = controller.convertMarkdownToHtml('####### Hello');
        assert.equal('<h6># Hello</h6>', result);
      }); 

      it("should add paragraph tags where no headers are present", function() {
        let result = controller.convertMarkdownToHtml('This is a paragraph [with an inline link](http://google.com). Neat, eh?');
        assert.equal('<p>This is a paragraph <a href="http://google.com">with an inline link</a>. Neat, eh?</p>', result);
      }); 

      it("should convert markdown links to HTML links", function() {
        let result = controller.convertMarkdownToHtml('## This is a header [with a link](http://yahoo.com)');
        assert.equal('<h2>This is a header <a href="http://yahoo.com">with a link</a></h2>', result);
      }); 
  });
});