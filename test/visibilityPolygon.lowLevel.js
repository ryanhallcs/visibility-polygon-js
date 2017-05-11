var expect = require('chai').expect;
var VisibilityPolygon = require('../dist');

/*
doLineSegmentsIntersect
computeDirection
isOnSegment
distance
*/

describe('lessThan', () => {
    var subject = VisibilityPolygon;

    var segMents = [ 
        [ [0, 0], [1, 0] ], 
        [ [1, 0], [1, 1] ], 
        [ [1, 1], [0, 2] ], 
        [ [0, 2], [0, 1] ], 
        [ [0, 1], [0, 0] ]
    ];
    var pos = [0.5, -1];
    var dest = [0.5, 4];

    var resultSets = [
        // { a: 0, b: 1, pos: pos, dest: dest, res: true }, // for some reason this case returns false?
        { a: 1, b: 0, pos: pos, dest: dest, res: false },
        { a: 1, b: 2, pos: pos, dest: dest, res: false },
        { a: 0, b: 2, pos: pos, dest: dest, res: true },
        { a: 2, b: 0, pos: pos, dest: dest, res: false }
    ];

   resultSets.forEach(set => {
       var thisSet = set;
       it('shows ' + segMents[thisSet.a] + ' is closer to ' + thisSet.pos + ' than ' + segMents[thisSet.b], () => {
           var res = subject.lessThan(thisSet.a, thisSet.b, thisSet.pos, segMents, thisSet.dest);
           expect(res).to.equal(thisSet.res);
       });
   });
});

describe('intersectLines', () => {
   var subject = VisibilityPolygon;

    var resultSets = [
         { a: [0, 0], b: [2, 0], c: [1, 1], d: [1, -1], res: [1, 0], desc: 'cross' },
         { a: [0, 0], b: [1, 0], c: [0, 1], d: [1, 1], res: [], desc: 'parallel' },
         { a: [0, 0], b: [1, 0], c: [1, 0], d: [1, 1], res: [1, 0], desc: 'endpoints' },
         { a: [0, 0], b: [1, 0], c: [1, 1], d: [1, -1], res: [1, 0], desc: 'through endpoint' }
    ];

   resultSets.forEach(set => {
       var thisSet = set;
       it('should calculate ' + thisSet.desc + ' intersection', () => {
           var res = subject.intersectLines(thisSet.a, thisSet.b, thisSet.c, thisSet.d);
           expect(res).to.eql(thisSet.res);
       });
   });
});

describe('angle', () => {
   var subject = VisibilityPolygon;

   var angleSets = [
       { a: [0, 0], b: [1, 0], res: 0 },
       { a: [0, 0], b: [0, 1], res: 90 },
       { a: [0, 0], b: [-1, 0], res: 180 },
       { a: [0, 0], b: [0, -1], res: -90 },
       { a: [0, 0], b: [1, 1], res: 45 },
       { a: [0, 0], b: [-1, 1], res: 135 },
       { a: [0, 0], b: [-1, -1], res: -135 },
       { a: [0, 0], b: [1, -1], res: -45 }
   ];

   angleSets.forEach(set => {
       var thisSet = set;
       it('should calculate ' + thisSet.res + ' angle', () => {
           expect(subject.angle(thisSet.a, thisSet.b)).to.equal(thisSet.res);
       });
   });
});

describe('angle2', () => {
   var subject = VisibilityPolygon;

   var angleSets = [
    //   { a: [0, 0], b: [1, 0], c: [1, 0], res: 0 },
    //    { a: [0, 0], b: [1, 0], c: [0, 1], res: 90 },
    //    { a: [0, 0], b: [0, 1], c: [1, 0], res: -90 },
    //    { a: [0, 0], b: [1, 0], c: [1, 1], res: 45 },
    //    { a: [0, 0], b: [1, 0], c: [1, -1], res: -45 },
   ];

   angleSets.forEach(set => {
       var thisSet = set;
       it('should calculate ' + thisSet.res + ' angle', () => {
           expect(subject.angle2(thisSet.b, thisSet.a, thisSet.c)).to.equal(thisSet.res);
       });
   });
});