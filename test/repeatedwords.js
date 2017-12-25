const expect = require('chai').expect;
import findRepeatedWords from '../src/checks/repeatedwords';

describe('Find repeated words', function(){
   var options = {};
   
   describe('Return null if there is no error', function(){
       it('Empty string', function(){
           var target = '';
           var res = findRepeatedWords('', target, options, undefined);
           expect(res[0]).to.equal(null);
       });
       it('Lorem ipsum text', function(){
          var target = 'I like dogs and everybody else should like dogs, too.';
          var res = findRepeatedWords('', target, options, undefined);
          expect(res[0]).to.equal(null);
       });
   });
   
   describe('Find repeated words', function(){
       it('Find repeated words', function(){
        var target = 'This is is sample text.';
        var res = findRepeatedWords('', target, options, undefined);
        expect(res[0]).to.equal('Repeated words: is');
       });
       
       it('Ignore case and find repeated words', function(){
        var target = 'This this is sample text.';
        var res = findRepeatedWords('', target, options, undefined);
        expect(res[0]).to.equal('Repeated words: this');
       });
       
       it('Do not flag words in ignore list', function(){
           var target = 'This is a test, ha ha ha.';
           var res = findRepeatedWords('', target, options, undefined);
           expect(res[0]).to.equal(null);
       });
   });
   

});