"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const getCollapsedMarginTop_1 = __importDefault(require("../getCollapsedMarginTop"));
function getNode(marginTop, marginBottom) {
    const node = {
        styles: {
            nativeBlockFlow: {},
            nativeBlockRet: {
                marginTop,
                marginBottom
            },
            nativeTextFlow: {},
            nativeTextRet: {},
            webTextFlow: {}
        }
    };
    return node;
}
function test(topMostBottomMargin, bottomMostTopMargin, expectedSum) {
    const topMost = getNode(undefined, topMostBottomMargin);
    const bottomMost = getNode(bottomMostTopMargin, undefined);
    const result = (0, getCollapsedMarginTop_1.default)(topMost, bottomMost);
    expect(result + topMostBottomMargin).toEqual(expectedSum);
}
describe('getCollapsedMarginTop', () => {
    it('should return null when bottommost has no margin top and topmost has no margin bottom', () => {
        const topmost = getNode(undefined, undefined);
        const bottommost = getNode(undefined, undefined);
        expect((0, getCollapsedMarginTop_1.default)(topmost, bottommost)).toBe(null);
    });
    it('should return null when bottommost has a margin top and topmost has no margins', () => {
        const topmost = getNode(undefined, undefined);
        const bottommost = getNode(10, undefined);
        expect((0, getCollapsedMarginTop_1.default)(topmost, bottommost)).toBe(null);
    });
    it('should total to the greater of both when the bottom most has a greater margin (1) ', () => {
        test(10, 20, 20);
    });
    it('should total to the greater of both when the top most has a greater margin', () => {
        test(20, 10, 20);
    });
    it('should total to the sum of both when the top most has a negative margin', () => {
        test(-10, 20, 10);
    });
    it('should total to the sum of both when the bottom most has a negative margin', () => {
        test(20, -10, 10);
    });
    it('should total to the minimum of both when both have a negative margin', () => {
        test(-20, -10, -20);
    });
});
