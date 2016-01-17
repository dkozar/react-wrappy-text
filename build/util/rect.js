"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var intersects = exports.intersects = function intersects(rect1, rect2) {
    if (rect1.bottom < rect2.top) {
        return false;
    }
    if (rect2.bottom < rect1.top) {
        return false;
    }
    return true;
};