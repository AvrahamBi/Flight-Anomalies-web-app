const { report } = require("./app");

// class Point {
//     constructor(x, y) {
//         this.x = x;
//         this.y = y;
//     }
//     getX() {return this.x; }
//     getY() { return this.y; }
// }
class Line {
    constructor(a, b) {
        this.a = a;
        this.b = b;
    }
    f(x) {
        return this.a * x + this.b;
    }
}
// class Circle {
//     constructor(center, radius) {
//         this.center = center;
//         this.radius = radius;
//     }
// }
// Probablity functions
function avg(x, size) {
    let sum = 0;
    for (let i = 0; i < size; i++) {
        sum += parseFloat(x[i]);
    }
    if (size * sum === 0) {
        return 0;
    }
    return sum / size;
}
function vars(x, size) {
    let av = avg(x, size);
    let sum = 0;
    for (let i = 0; i < size; i++) {
        let temp = Math.pow(parseFloat(x[i]), 2);
        sum += temp;
    }
    let val = sum / size;
    return val - (av * av);
}
function cov(x, y, size) {
    let covar, sum = 0;
    for (let i = 0; i < size; i++) {
        sum += (parseFloat(x[i]) - avg(x, size)) * (parseFloat(y[i]) - avg(y, size));
    }
    covar = sum / size;
    return covar;
}
function pearson(x, y, size) {
    /*let t = Math.sqrt(vars(x, size)) * Math.sqrt(vars(y, size));
    let temp = cov(x, y, size) / x;
    return temp;*/
    let result = cov(x, y, size) / (Math.sqrt(vars(x, size)) * Math.sqrt(vars(y, size)));
    return result;
}
function linear_reg(points, size) {
    let a, b;
    let x = [];
    let y = [];
    for (let i = 0; i < size; i++) {
        x[i] = points[i].x;
        y[i] = points[i].y;
    }
    a = cov(x, y, size) / vars(x, size);
    b = avg(y, size) - a * avg(x, size);
    return new Line(a, b);
}
function dev(p, l) {
    let fx;
    fx = l.f(p.x);
    return Math.abs(fx - p.y);
}
// minimal circle functions
// function dist(a, b) {
//     return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));
// }
// function trivialCircle2(p1, p2) {
//     let radius = dist(p1, p2) / 2;
//     let cx = (p1.x + p2.x) / 2;
//     let cy = (p1.y + p2.y) / 2;
//     let center = new Point(cx, cy);
//     return new Circle(center, radius);
// }
// function trivialCircle3(p1, p2, p3) {
//     let bx = p2.x - p1.x;
//     let by = p2.y - p1.y;
//     let cx = p3.x - p1.x;
//     let cy = p3.y - p1.y;
//
//     let B = bx * bx + by * by;
//     let C = cx * cx + cy * cy;
//     let D = bx * cy - by * cx;
//
//     let centerX = (cy * B - by * C) / (2 * D) + p1.x;
//     let centerY = (bx * C - cx * B) / (2 * D) + p1.y;
//
//     let center = new Point(centerX, centerY);
//     let radius = dist(center, p1);
//     return new Circle(center, radius);
// }
// function trivial(P) {
//     if (P.length === 0)
//         return new Circle(new Point(0, 0), 0);
//     else if (P.length === 1)
//         return new Circle(P[0], 0);
//     else if (P.length === 2)
//         return trivialCircle2(P[0], P[1]);
//
//     // maybe 2 of the points define a small circle that contains the 3ed point
//     let c = trivialCircle2(P[0], P[1]);
//     if (dist(P[2], c.center) <= c.radius)
//         return c;
//     c = trivialCircle2(P[0], P[2]);
//     if (dist(P[1], c.center) <= c.radius)
//         return c;
//     c = trivialCircle2(P[1], P[2]);
//     if (dist(P[0], c.center) <= c.radius)
//         return c;
//     // else find the unique circle from 3 points
//     return trivialCircle3(P[0], P[1], P[2]);
// }
// function minds(P, R, n) {
//
//     let element;
//     if (n === 0 || R.length === 3) {
//         return trivial(R);
//     }
//     let i = Math.floor(Math.random() * n) + 1;
//     let p = new Point(parseFloat(P[i].x), parseFloat(P[i].y)); // todo not sure if parse is needed
//
//     console.log("Line 136:", p);
//     element = P[i];
//     P[i] = P[n - 1];
//     P[n - 1] = element;
//
//     let c = minds(P, R, n - 1);
//
//     if (dist(p, c.center) <= c.radius)
//         return c;
//
//     R.push(p);
//
//     return minds(P, R, n - 1);
// }
// function findMinCircle(points, size) {
//     let list = [];
//     return minds(points, list, size);
// }
var Point = /** @class */ (function () {
    function Point(x, y) {
        this.x = x;
        this.y = y;
    }
    return Point;
}());
var Circle = /** @class */ (function () {
    function Circle(x, y, r) {
        this.x = x;
        this.y = y;
        this.r = r;
    }
    return Circle;
}());
/*
 * Returns the smallest circle that encloses all the given points. Runs in expected O(n) time, randomized.
 * Note: If 0 points are given, null is returned. If 1 point is given, a circle of radius 0 is returned.
 */
// Initially: No boundary points known
function makeCircle(points) {
    // Clone list to preserve the caller's data, do Durstenfeld shuffle
    var shuffled = points.slice();
    for (var i = points.length - 1; i >= 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        j = Math.max(Math.min(j, i), 0);
        var temp = shuffled[i];
        shuffled[i] = shuffled[j];
        shuffled[j] = temp;
    }
    // Progressively add points to circle or recompute circle
    var c = null;
    shuffled.forEach(function (p, i) {
        if (c === null || !isInCircle(c, p))
            c = makeCircleOnePoint(shuffled.slice(0, i + 1), p);
    });
    return c;
}
// One boundary point known
function makeCircleOnePoint(points, p) {
    var c = new Circle(p.x, p.y, 0);
    points.forEach(function (q, i) {
        if (!isInCircle(c, q)) {
            if (c.r == 0)
                c = makeDiameter(p, q);
            else
                c = makeCircleTwoPoints(points.slice(0, i + 1), p, q);
        }
    });
    return c;
}
// Two boundary points known
function makeCircleTwoPoints(points, p, q) {
    var circ = makeDiameter(p, q);
    var left = null;
    var right = null;
    // For each point not in the two-point circle
    for (var _i = 0, points_1 = points; _i < points_1.length; _i++) {
        var r = points_1[_i];
        if (isInCircle(circ, r))
            continue;
        // Form a circumcircle and classify it on left or right side
        var cross = crossProduct(p.x, p.y, q.x, q.y, r.x, r.y);
        var c = makeCircumcircle(p, q, r);
        if (c === null)
            continue;
        else if (cross > 0 && (left === null || crossProduct(p.x, p.y, q.x, q.y, c.x, c.y) > crossProduct(p.x, p.y, q.x, q.y, left.x, left.y)))
            left = c;
        else if (cross < 0 && (right === null || crossProduct(p.x, p.y, q.x, q.y, c.x, c.y) < crossProduct(p.x, p.y, q.x, q.y, right.x, right.y)))
            right = c;
    }
    // Select which circle to return
    if (left === null && right === null)
        return circ;
    else if (left === null && right !== null)
        return right;
    else if (left !== null && right === null)
        return left;
    else if (left !== null && right !== null)
        return left.r <= right.r ? left : right;
    else
        throw "Assertion error";
}
function makeDiameter(a, b) {
    var cx = (a.x + b.x) / 2;
    var cy = (a.y + b.y) / 2;
    var r0 = distance(cx, cy, a.x, a.y);
    var r1 = distance(cx, cy, b.x, b.y);
    return new Circle(cx, cy, Math.max(r0, r1));
}
function makeCircumcircle(a, b, c) {
    // Mathematical algorithm from Wikipedia: Circumscribed circle
    var ox = (Math.min(a.x, b.x, c.x) + Math.max(a.x, b.x, c.x)) / 2;
    var oy = (Math.min(a.y, b.y, c.y) + Math.max(a.y, b.y, c.y)) / 2;
    var ax = a.x - ox;
    var ay = a.y - oy;
    var bx = b.x - ox;
    var by = b.y - oy;
    var cx = c.x - ox;
    var cy = c.y - oy;
    var d = (ax * (by - cy) + bx * (cy - ay) + cx * (ay - by)) * 2;
    if (d == 0)
        return null;
    var x = ox + ((ax * ax + ay * ay) * (by - cy) + (bx * bx + by * by) * (cy - ay) + (cx * cx + cy * cy) * (ay - by)) / d;
    var y = oy + ((ax * ax + ay * ay) * (cx - bx) + (bx * bx + by * by) * (ax - cx) + (cx * cx + cy * cy) * (bx - ax)) / d;
    var ra = distance(x, y, a.x, a.y);
    var rb = distance(x, y, b.x, b.y);
    var rc = distance(x, y, c.x, c.y);
    return new Circle(x, y, Math.max(ra, rb, rc));
}
/* Simple mathematical functions */
var MULTIPLICATIVE_EPSILON = 1 + 1e-14;
function isInCircle(c, p) {
    return c !== null && distance(p.x, p.y, c.x, c.y) <= c.r * MULTIPLICATIVE_EPSILON;
}
// Returns twice the signed area of the triangle defined by (x0, y0), (x1, y1), (x2, y2).
function crossProduct(x0, y0, x1, y1, x2, y2) {
    return (x1 - x0) * (y2 - y0) - (y1 - y0) * (x2 - x0);
}
function distance(x0, y0, x1, y1) {
    return Math.hypot(x0 - x1, y0 - y1);
}
if (!("hypot" in Math)) // Polyfill
    Math.hypot = function (x, y) { return Math.sqrt(x * x + y * y); };
class TimeSeries {
    constructor(arr) {
        this.features = arr[0];
        this.csvMatrix = arr;
    }

    // method returns specific vector of given feature from the matrix
    getFeatureVector(x) {
        let line = [];
        for (let i = 1; i < this.csvMatrix.length; i++) { // to do changed index to 1
            line.push(this.csvMatrix[i][x]);
        }
        return line;
    }

    getFeatures() {
        return this.features;
    }

    // method get a feature string and returns its index
    getFeatureNum(featureName) {
        for (let i = 0; i < this.features.length; i++) {
            if (this.features[i] == featureName) {
                return i;
            }
        }
    }
}

class AnomalyReport {
    constructor(description, timeStep) {
        this.description = description;
        this.timeStep = timeStep;
    }
}

/*class TimeSeriesAnomalyDetector {
    constructor() { }
    // todo learn normal

}*/

class correlatedFeatures {
    constructor() {
        this.corrlation = 0;
        this.feature1 = '';
        this.feature2 = '';
        this.line_reg = 0;
        this.isStrongCorrelation = false;
        this.minimumCircle = 0;
        this.threshold = 0;
    }
}

class SimpleAnomalyDetector {
    constructor() {
        this.cf = [];
        this.correlationForDetect = null;
    }

    findThreshold(size, points) {
        let linearRegression = linear_reg(points, size);
        let finalDev = 0;
        let tempDev;
        for (let i = 0; i < size; i++) {
            let p = new Point(points[i].x, points[i].y);
            tempDev = dev(p, linearRegression);
            finalDev = Math.max(tempDev, finalDev);
        }
        return finalDev *= 1.1;
    }

    learnNormal(timeSeries, hybridOrReg) {
        console.log("Starting learn Algo");
        if (hybridOrReg == "hybrid") {
            this.correlationForDetect = 0.5;
        } else {
            this.correlationForDetect = 0.9;
        }
        let numOfFeatures = timeSeries.getFeatures().length;
        let numOfLines = timeSeries.getFeatureVector(0).length;
        for (let i = 0; i < numOfFeatures; i++) {
            
            let currentCF = new correlatedFeatures();
            currentCF.corrlation = 0;
            let featureVector1 = timeSeries.getFeatureVector(i);
            for (let j = i + 1; j < numOfFeatures; j++) {
                let featureVector2 = timeSeries.getFeatureVector(j);
                let currentPearson = pearson(featureVector1, featureVector2, numOfLines);
                if ((currentCF.corrlation < currentPearson) && (this.correlationForDetect <= currentPearson)) { // todo here the difference between hybrid and regression
                    let points = [];
                    for (let x = 0; x < numOfLines; x++) {
                        points.push(new Point(timeSeries.getFeatureVector(i)[x], timeSeries.getFeatureVector(j)[x]));
                    }
                    if (0.9 <= currentPearson) {
                        currentCF.feature1 = timeSeries.getFeatures()[i];
                        currentCF.feature2 = timeSeries.getFeatures()[j];
                        currentCF.corrlation = currentPearson;
                        currentCF.line_reg = linear_reg(points, numOfLines);
                        currentCF.isStrongCorrelation = true;
                        currentCF.threshold = this.findThreshold(numOfLines, points);
                    } else {
                        currentCF.feature1 = timeSeries.getFeatures()[i];
                        currentCF.feature2 = timeSeries.getFeatures()[j];
                        currentCF.corrlation = currentPearson;
                        currentCF.lin_reg = linear_reg(points, numOfLines);
                        currentCF.isStrongCorrelation = false;
                        console.log("386");
                        currentCF.minimumCircle = makeCircle(points);
                        console.log("388");
                        currentCF.threshold = currentCF.minimumCircle.r * 1.1;
                    }
                }
            }
            if (this.correlationForDetect <= currentCF.corrlation) { this.cf.push(currentCF); }
        }
    }

    detect(timeSeries) {
        console.log("Starting Detect Algo");
        let reports = [];
        for (let i = 0; i < this.cf.length; i++) {
            let numOfFeature1 = timeSeries.getFeatureNum(this.cf[i].feature1);
            let numOfFeature2 = timeSeries.getFeatureNum(this.cf[i].feature2);
            let featureVector1 = timeSeries.getFeatureVector(numOfFeature1);
            let featureVector2 = timeSeries.getFeatureVector(numOfFeature2);
            if (this.cf[i].isStrongCorrelation) {
                for (let j = 1; j < featureVector1.length; j++) {
                    let p = new Point(featureVector1[j], featureVector2[j]);
                    let deviation = dev(p, this.cf[i].line_reg);
                    if (this.cf[i].threshold < deviation) {
                        let description = this.cf[i].feature1 + "-" + this.cf[i].feature2;
                        reports.push(new AnomalyReport(description, j + 1));
                    }
                }
                // if feature has a weak correlation
            } else {
                for (let j = 0; j < featureVector1.length; j++) {
                    let p = new Point(featureVector1[j], featureVector2[j]);
                    console.log("418");
                    let centerOfCircle = new Point(this.cf[i].minimumCircle.x, this.cf[i].minimumCircle.y);
                    let deviation = this.getDistance(p, centerOfCircle);
                    console.log("421");
                    if (this.cf[i].threshold < deviation) {
                        let description = this.cf[i].feature1 + "-" + this.cf[i].feature2;
                        console.log("424");
                        reports.push(new AnomalyReport(description, j + 1)); // todo maybe j without +1
                    }
                }
            }
        }
        return reports;
    }

    getDistance(p1, p2) {
        return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
    }

    getNormalModel() {
        return this.cf;
    }
}


function learnAlgo(LearnArr, DetectArr, model_type) {
    
    let learnTs = new TimeSeries(LearnArr);
    let detectTs = new TimeSeries(DetectArr);
    let detector = new SimpleAnomalyDetector();
    detector.learnNormal(learnTs, model_type);
    let reports = detector.detect(detectTs);
    // convert reports into wanted format of [[13, "Aileron - Degree"], [68, "Latitude - Compass Degree"]]
    let result = [];
    for (let i = 0; i < reports.length; i++) {
        let anomaly = [];
        anomaly.push(reports[i].timeStep);
        anomaly.push(reports[i].description);
        result.push(anomaly);
    }
    return result
}
module.exports.learnAlgo = learnAlgo
//