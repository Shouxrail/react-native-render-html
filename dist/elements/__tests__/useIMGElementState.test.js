"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_hooks_1 = require("@testing-library/react-hooks");
const react_performance_testing_1 = require("react-performance-testing");
const useIMGElementState_1 = __importDefault(require("../useIMGElementState"));
const react_native_1 = require("react-native");
describe('useIMGElementState', () => {
    const props = {
        contentWidth: 300,
        source: { uri: 'https://foo.bar/600x300' },
        initialDimensions: { width: 30, height: 30 },
        computeMaxWidth: (contentWidth) => contentWidth
    };
    it('should render at most twice when width and height physical dimensions are not provided, prior and after fetching physical dimensions', () => __awaiter(void 0, void 0, void 0, function* () {
        const { renderCount } = (0, react_performance_testing_1.perf)(react_1.default);
        (0, react_hooks_1.renderHook)(() => (0, useIMGElementState_1.default)(props));
        yield (0, react_performance_testing_1.wait)(() => {
            expect(renderCount.current.TestComponent.value).toBeLessThan(2);
        });
    }));
    it('should use Image.getSizeWithHeaders when source has `headers`', () => __awaiter(void 0, void 0, void 0, function* () {
        const { renderCount } = (0, react_performance_testing_1.perf)(react_1.default);
        const source = { uri: 'http://via.placeholder.com/640x360', headers: {} };
        const localProps = Object.assign(Object.assign({}, props), { source });
        (0, react_hooks_1.renderHook)(() => (0, useIMGElementState_1.default)(localProps));
        yield (0, react_performance_testing_1.wait)(() => {
            expect(renderCount.current.TestComponent.value).toBeLessThan(2);
        });
        expect(react_native_1.Image.getSizeWithHeaders).toHaveBeenCalled();
    }));
    it('should render once when width and height physical dimensions are provided, bypassing the fetching of physical dimensions', () => __awaiter(void 0, void 0, void 0, function* () {
        const { renderCount } = (0, react_performance_testing_1.perf)(react_1.default);
        (0, react_hooks_1.renderHook)(() => (0, useIMGElementState_1.default)(Object.assign(Object.assign({}, props), { width: 600, height: 300 })));
        yield (0, react_performance_testing_1.wait)(() => {
            expect(renderCount.current.TestComponent.value).toBe(1);
        });
    }));
    it('should start in loading state with dimensions set to initialDimensions', () => __awaiter(void 0, void 0, void 0, function* () {
        const { result } = (0, react_hooks_1.renderHook)(() => (0, useIMGElementState_1.default)(props));
        expect(result.current.type).toEqual('loading');
        expect(result.current.dimensions).toMatchObject({
            width: 30,
            height: 30
        });
    }));
    it('should update to success state with dimensions set to scaled physical image dimensions', () => __awaiter(void 0, void 0, void 0, function* () {
        const { result, waitForNextUpdate } = (0, react_hooks_1.renderHook)(() => (0, useIMGElementState_1.default)(props));
        yield waitForNextUpdate();
        expect(result.current.type).toEqual('success');
        expect(result.current.dimensions).toMatchObject({
            width: 300,
            height: 150
        });
    }));
    it('should support cachedNaturalDimensions prop', () => __awaiter(void 0, void 0, void 0, function* () {
        react_native_1.Image.getSizeWithHeaders = jest.fn();
        const { result } = (0, react_hooks_1.renderHook)(() => (0, useIMGElementState_1.default)(Object.assign(Object.assign({}, props), { cachedNaturalDimensions: {
                width: 600,
                height: 300
            } })));
        expect(result.current.type).toEqual('success');
        expect(result.current.dimensions).toMatchObject({
            width: 300,
            height: 150
        });
        expect(react_native_1.Image.getSizeWithHeaders).not.toHaveBeenCalled();
    }));
});
