export default {
  ja: [
    ['\u30C8\u30EA\u30D7\u30EB', ' 3 '], // トリプル
    ['\u30C0\u30D6\u30EB', ' 2 '], // ダブル
    ['\u5343', '000 '], // 千
    ['(\\d+)\\.(\\d)\u4E07', '$1$2000 '], // 1.3万
    ['\u4E07', '0000 '], // 万 TODO: Add in (?:[0-9])
    ['(\\d+)\\.(\\d)\u5104', '$1$20000000 '], // 億
    ['(\\d)\u5104', '$100000000 '], // 億
    ['1\u3064\u76EE', ''], // 1つ目
    ['\u2460', '1 '], // ①
    ['\u2461', '2 '],
    ['\u2462', '3 '],
    ['\u2463', '4 '],
    ['\u2464', '5 '],
    ['\u2465', '6 '],
    ['\u7B2C\u4E00', '1 '], // 第一
    ['\u7B2C\u4E8C', '2 '],
    ['\u7B2C\u4E09', '3 '],
    ['\u7B2C\u56DB', '4 '],
    ['\u7B2C\u4E94', '5 '],
    ['[1]?[0-9]\u6708', 'month'],
    ['\u5343\u8F09\u4E00\u9047', ''],
  ],
  en: [
    ['doubl', ' 2 '],
    ['second\\s', ' 2 '],
    ['twice', ' 2 '],
    ['third', ' 3 '],
    ['tripl', ' 3 '],
    ['quadrupl', ' 4 '],
    ['quintupl', ' 5 '],
    ['thousand', ' 000 '],
    ['(\\d+)\\.(\\d)\\smillion', '$1$200000'],
    ['(\\d+)\\smillion', ' $1000000 '],
    ['(\\d+)\\.(\\d)\\sbillion', '$1$200000000'],
    ['(\\d+)\\sbillion', ' $1000000000 '],
  ],
  es: [
    ['doble', ' 2 '],
    ['triple', ' 3 '],
    ['(\\d+),(\\d)\\smillones', '$1$200000'],
    ['(\\d+)\\smillon', ' $1000000 '],
  ],
};
