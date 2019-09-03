#!/usr/bin/env node
import objToStr from './render';

/*  const beforeFile = '/home/konstantin/js_project/__tests__/__fixtures__/compareTest/before.json';
const afterFile = '/home/konstantin/js_project/__tests__/__fixtures__/compareTest/after.json';  */
const before1 = {
  common: {
    setting1: 'Value 1',
    setting2: '200',
    setting3: true,
    setting6: {
      key: 'value',
    },
  },
  group1: {
    baz: 'bas',
    foo: 'bar',
    nest: {
      key: 'value',
    },
  },
  group2: {
    abc: '12345',
  },
};
const before2 = {
  common: {
    follow: false,
    setting1: 'Value 1',
    setting3: {
      key: 'value',
    },
    setting4: 'blah blah',
    setting5: {
      key5: 'value5',
    },
    setting6: {
      key: 'value',
      ops: 'vops',
    },
  },

  group1: {
    foo: 'bar',
    baz: 'bars',
    nest: 'str',
  },

  group3: {
    fee: '100500',
  },
};

const before3 = {
  timeout: 20,
  verbose: true,
  host: 'hexlet.io',
};
const before4 = {};

console.log(objToStr(before1));
console.log(objToStr(before2));
console.log(objToStr(before3));
console.log(objToStr(before4));
