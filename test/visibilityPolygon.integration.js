var expect = require('chai').expect;
var VisibilityPolygon = require('../src');
VisibilityPolygon.init();

describe('compute', () => {
    var subject = VisibilityPolygon;
    
    it ('should compute multiple times without error', () => {
        var polygons = [];
        polygons.push([ [10, 10],[20, 10],[20, 20],[10, 20] ]);
        polygons.push([ [30, 100],[100, 100],[100, 140],[30, 140] ]);
        polygons.push([ [80, 10],[100, 10],[100, 20],[80, 20] ]);
        var position = [60, 60];

        var segments = subject.convertToSegments(polygons);
        segments = subject.breakIntersections(segments);
        for (var i = 0; i < 3; i++)
            expect(() => subject.compute(position, segments)).to.not.throw;
    });
    
    it ('should compute mutliple times with same output', () => {
        var polygons = [];
        polygons.push([ [10, 10],[20, 10],[20, 20],[10, 20] ]);
        polygons.push([ [30, 100],[100, 100],[100, 140],[30, 140] ]);
        polygons.push([ [80, 10],[100, 10],[100, 20],[80, 20] ]);
        var position = [60, 60];

        var segments = subject.convertToSegments(polygons);
        segments = subject.breakIntersections(segments);
        var res = subject.compute(position, segments);
        for (var i = 0; i < 3; i++)
            expect(subject.compute(position, segments)).to.eql(res);
    });
});