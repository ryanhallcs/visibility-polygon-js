var benchmark = require('benchmark');
var suite = new benchmark.Suite('compute tests');

var updated = require('../dist/index.js');
var original = require('../dist/original.js');

var polygons = [];
var box = [ [10, 10],[20, 10],[20, 20],[10, 20] ]
var df = 15;
var perRowCol = 20;
for (var i = 0; i < perRowCol; i ++)
  for (var j = 0; j < perRowCol; j++)
    polygons.push([
      [ box[0][0] + i * df, box[0][1] + j * df ],
      [ box[1][0] + i * df, box[1][1] + j * df ],
      [ box[2][0] + i * df, box[2][1] + j * df ],
      [ box[3][0] + i * df, box[3][1] + j * df ],
    ]);

var position = [ 100, 100];
updated.init();
var segmentMemo = [];
var outputMemo = [];

suite
.add('Updated#compute', function() {
  updated.convertToSegments(polygons, segmentMemo);
  updated.breakIntersections(segmentMemo, outputMemo);
  var visibility = updated.compute(position, outputMemo);
}, { maxTime: 20, delay: 0 })
.add('Original#compute', function() {
  var segments = original.convertToSegments(polygons);
  segments = original.breakIntersections(segments);
  var visibility = original.compute(position, segments);
}, { maxTime: 20, delay: 0 });

module.exports = suite;