import { expect } from 'chai';
import compareDates from '../../src/checks/dates/comparedates';

describe('compareDates', function(){
    var options = {
        sourceLang: 'ja',
        targetLang: 'en',
        dateFormats: {
         'ja': [
             ['([0-9]{4})\\u5E74([0-1]?[0-9])\\u6708([0-3]?[0-9])\\u65E5', '{$1-$2-$3}'], // 2017年9月10日
             ['([0-2]?[0-9])[:\\uFF1A]([0-5][0-9]) ([0-1]?[0-9])\\/([0-3]?[0-9])', '{2017-$3-$4 $1:$2}'] // 21:59 09/10
            ],
        'en': [
            ['([1]?[0-9]:[0-5][0-9][ap]m), Dec(?:ember)?\\.? ([0-3]?[0-9])', '{2018-12-$2 $1}'], // 12:30pm, Dec. 23
            ['Jan(?:uary)?\\.? ([0-3]?[0-9])', '{2018-1-$1}'], // Jan. 15
            ['([0-1]?[0-9])\\/([0-3]?[0-9]),? ([0-2]?[0-9]:[0-5][0-9][AP]M)', '{2018-$1-$2 $3}'],  // 11/5, 16:59AM
            ['GMT\\+9', ' ']
            ]
        }
    };
    
    it('should always return timeCheck_clean_source and timeCheck_clean_target keys in the accumulator', function(){
        var source = 'こんにちは、世界';
        var target = 'Hello, World!';
        var res = compareDates(source, target, {}, {});
        expect(res[1]).to.be.an('object').that.has.all.keys('timeCheck_clean_target', 'timeCheck_clean_source');
    });
    it('should convert dates to {2017-01-01} format based on the given dateFormats object', function(){
        var source = '2018年１月２日から開催';
        var target = 'starts Jan. 2';
        var res = compareDates(source, target, options, {});
        var clean_source = res[1].timeCheck_clean_source;
        var clean_target = res[1].timeCheck_clean_target;
        
        expect(clean_source).to.equal('{2018-1-2}から開催');
        expect(clean_target).to.equal('starts {2018-1-2}');
    });
    it('should convert all months and days and times into two-digit format');
    it('should return no error if there are matching dates', function(){
        var source = '2018年１月２日から開催';
        var target = 'starts Jan. 2';
        var [res] = compareDates(source, target, options, {});
        expect(res.hasError).to.be.false;
    });
    it('should recognize that a date in the source does not exist in the target', function(){
       var source = 'イベント期間：21:59 01/10';
       var target = 'Event period: ';
       var [res] = compareDates(source, target, options, {});
       expect(res.hasError).to.be.true;
    });
    it('should recognize that a date in the target does not exist in the source', function(){
        var source = 'イベント期間：';
        var target = 'Event period: 9:59pm, Dec. 10';
        var [res] = compareDates(source, target, options, {});
        expect(res.hasError).to.be.true;
    });
    it('should not recognize ３日間 as a date, and leave the number in the clean string');
    it('should not recognize ２日連続 as a date, and leave the number in the clean string');
    it('should clean out some basic words with numeral kanji in them');
    it('Return detected dates in the results object', () => {
       const source = 'イベント期間：20:59 2/21 から　2018年3月20日まで';
       const target = 'Event from 8:59pm, Dec. 21 to Jan. 20';
       const [res] = compareDates(source, target, options, {});
       expect(res.sourceDates).to.be.an('array').that.has.lengthOf(2);
       expect(res.targetDates).to.be.an('array').that.has.lengthOf(2);
    });
});


