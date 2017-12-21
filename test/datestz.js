const expect = require('chai').expect;
import compareDatesTz from '../src/libs/dates/comparedates-tz';

describe('compareDatesTz', function(){
    var options = {
        sourceLang: 'ja',
        targetLang: 'en',
        sourceTimeZone: 'Asia/Tokyo',
        targetTimeZone: 'America/Los_Angeles',
        dateFormats: {
         'ja': [
             ['([0-9]{4})\\u5E74([0-1]?[0-9])\\u6708([0-3]?[0-9])\\u65E5', '{$1-$2-$3}'], // 2017年9月10日
             ['([0-2]?[0-9])[:\\uFF1A]([0-5][0-9]) ([0-1]?[0-9])\\/([0-3]?[0-9])', '{2018-$3-$4 $1:$2}'] // 21:59 09/10
            ],
        'en': [
            ['([1]?[0-9]:[0-5][0-9][ap]m), Apr(?:il)?\\.? ([0-3]?[0-9])', '{2018-04-$2 $1}'], // 12:30pm, Apr. 23
            ['Jan(?:uary)?\\.? ([0-3]?[0-9])', '{2018-1-$1}'], // Jan. 15
            ['([0-1]?[0-9])\\/([0-3]?[0-9]),? ([0-2]?[0-9]:[0-5][0-9][AP]M)', '{2018-$1-$2 $3}']  // 11/5, 16:59AM
            ]
        }
    };
    
    it('should return timeCheck_clean_source and timeCheck_clean_target keys in the accumulator', function(){
        var source = 'こんにちは、世界';
        var target = 'Hello, World!';
        var res = compareDatesTz(source, target, {}, {});
        expect(res[1]).to.be.an('object').that.has.all.keys('timeCheck_clean_target', 'timeCheck_clean_source');
    });
    it('should convert dates to {2017-01-01} format based on the given dateFormats object', function(){
        var source = '2016年2月１２日から開催';
        var target = 'starts Jan. 2';
        var res = compareDatesTz(source, target, options, {});
        var clean_source = res[1].timeCheck_clean_source;
        var clean_target = res[1].timeCheck_clean_target;
        
        expect(clean_source).to.equal('{2016-2-12}から開催');
        expect(clean_target).to.equal('starts {2018-1-2}');
    });
    it('should return null if there are matching dates', function(){
        var source = '14:30 4/20から開催';
        var target = 'starts 10:30pm, Apr. 19';
        var res = compareDatesTz(source, target, options, {});
        expect(res[0]).to.equal(null);
    });
    it.skip('should recognize that a date in the source does not exist in the target', function(){
       var source = 'イベント期間：21:59 01/10';
       var target = 'Event period: ';
       var res = compareDatesTz(source, target, options, {});
       expect(res[0]).to.equal('Source dates w/o match in target: <span class="text-date">Jan. 10 21:01 JST</span>');
    });
    it.skip('should recognize that a date in the target does not exist in the source', function(){
        var source = 'イベント期間：';
        var target = 'Event period: 9:59pm, Dec. 10';
        var res = compareDatesTz(source, target, options, {});
        expect(res[0]).to.equal('Target dates w/o match in source: <span class="text-date">Dec. 10</span>');
    });
    it('should not recognize ３日間 as a date, and leave the number in the clean string');
    it('should not recognize ２日連続 as a date, and leave the number in the clean string');
    it('should clean out some basic words with numeral kanji in them');
});