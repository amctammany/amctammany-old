'use strict';

describe('Filter: groupBy', function () {

  // load the filter's module
  beforeEach(module('mctApp'));

  // initialize a new instance of the filter before each test
  var groupBy;
  beforeEach(inject(function ($filter) {
    groupBy = $filter('groupBy');
  }));


});
