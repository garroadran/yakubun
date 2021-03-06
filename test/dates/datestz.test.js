/* global describe, it */
/* eslint no-unused-expressions: off */
import { expect } from 'chai';
import compareDatesTz from '../../src/checks/dates/comparedates-tz';

describe('compareDatesTz', () => {
  const options = {
    sourceLang: 'ja',
    targetLang: 'en',
    sourceTimeZone: 'Asia/Tokyo',
    targetTimeZone: 'America/Los_Angeles',
    dateFormats: {
      ja: [
        ['([0-9]{4})\\u5E74([0-1]?[0-9])\\u6708([0-3]?[0-9])\\u65E5', '{$1-$2-$3}'], // 2017年9月10日
        ['([0-2]?[0-9])[:\\uFF1A]([0-5][0-9]) ([0-1]?[0-9])\\/([0-3]?[0-9])', '{2018-$3-$4 $1:$2}'], // 21:59 09/10
      ],
      en: [
        ['([1]?[0-9]:[0-5][0-9][ap]m), Jan(?:il)?\\.? ([0-3]?[0-9])', '{2018-01-$2 $1}'], // 12:30pm, Jan. 23
        ['([1]?[0-9]:[0-5][0-9][ap]m), Apr(?:il)?\\.? ([0-3]?[0-9])', '{2018-04-$2 $1}'], // 12:30pm, Apr. 23
        ['Jan(?:uary)?\\.? ([0-3]?[0-9])', '{2018-1-$1}'], // Jan. 15
        ['([0-1]?[0-9])\\/([0-3]?[0-9]),? ([0-2]?[0-9]:[0-5][0-9][AP]M)', '{2018-$1-$2 $3}'], // 11/5, 16:59AM
      ],
    },
  };

  it('should return timeCheck_clean_source and timeCheck_clean_target keys in the accumulator', () => {
    const source = 'こんにちは、世界';
    const target = 'Hello, World!';
    const res = compareDatesTz(source, target, {}, {});
    expect(res[1]).to.be.an('object').that.has.all.keys('timeCheck_clean_target', 'timeCheck_clean_source');
  });
  it('should convert dates to {2017-01-01} format based on the given dateFormats object', () => {
    const source = '2016年2月12日から開催';
    const target = 'starts Jan. 2';
    const res = compareDatesTz(source, target, options, {});
    const cleanSource = res[1].timeCheck_clean_source;
    const cleanTarget = res[1].timeCheck_clean_target;

    expect(cleanSource).to.equal('{2016-2-12}から開催');
    expect(cleanTarget).to.equal('starts {2018-1-2}');
  });
  it('should not raise errors if there are matching dates', () => {
    const source = '14:30 4/20から開催';
    const target = 'starts 10:30pm, Apr. 19';
    const res = compareDatesTz(source, target, options, {});
    expect(res[0].hasError).to.be.false;
  });
  it('should recognize that a date in the source does not exist in the target', () => {
    const source = 'イベント期間：21:59 01/10';
    const target = 'Event period: ';
    const [res] = compareDatesTz(source, target, options, {});
    expect(res.hasError).to.be.true;
  });
  it('should recognize that a date in the target does not exist in the source', () => {
    const source = 'イベント期間：';
    const target = 'Event period: 9:59pm, Apr. 10';
    const [res] = compareDatesTz(source, target, options, {});
    expect(res.hasError).to.be.true;
  });
  it('Return identified dates in the results object', () => {
    const [res] = compareDatesTz('イベント期間： 23:59 1/11', 'The event starts at 11:59pm, Jan. 11', options, {});

    expect(res.hasError).to.be.true;
    expect(res.sourceDates.map(x => x.format('MM-DD'))).to.deep.equal(['01-11']);
    expect(res.targetDates.map(x => x.format('MM-DD'))).to.deep.equal(['01-11']);
  });
  it('Return empty array if there are no dates', () => {
    const [res] = compareDatesTz('bogus', 'fake', options, {});
    const now = new Date();
    const year = now.getFullYear();

    expect(res.hasError).to.be.false;
    expect(res.sourceDates).to.deep.equal([]);
    expect(res.targetDates).to.deep.equal([]);
  });
});
