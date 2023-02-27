![Argue yourself](https://raw.githubusercontent.com/trouchet/retoric/main/images/retoric_small.png)

# Retoric
[![Version](https://img.shields.io/npm/v/retoric.svg)](https://www.npmjs.com/package/retoric)
[![codecov](https://codecov.io/gh/trouchet/arqeo/branch/main/graph/badge.svg?token=55H8MVEJQJ)](https://codecov.io/gh/trouchet/arqeo)
[![downloads](https://img.shields.io/npm/dm/retoric)](https://www.npmjs.com/package/retoric)

## Concepts

This npm module aims to give a development tools to argue on artifact condition. The behavior emulates, for example, Typescript type-check. 

The object-concepts are:

1. __Reasoning__: an item or array that fulfills certain boolean-condition;
2. __Premise__: An axiomatic reasoning child;
3. __Conjunction__: A Reasoning child with decision or-operation;
4. __Disjunction__: A Reasoning child with decision and-operation;.

The properties-concepts are:

1. __key__: A string key-variable to ;
2. __description__: A string description of Reasoning object;
3. __value__: Either a boolean or a Reasoning artifact;

The callback-concepts are:

1. ___conclusionMap__: a boolean map for conclusion-reduce operation

## Use cases

The interested reader may access use-cases described above on test files available on code folders below: 

1. __Objects__: src/\_\_test\_\_/classes.test.js
2. __Checkers__: src/\_\_test\_\_/checkers.test.js

