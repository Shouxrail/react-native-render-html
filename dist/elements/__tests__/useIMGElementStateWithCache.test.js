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
const react_hooks_1 = require("@testing-library/react-hooks");
const useIMGElementStateWithCache_1 = __importDefault(require("../useIMGElementStateWithCache"));
const props = {
    contentWidth: 300,
    source: { uri: 'https://foo.bar/600x300' },
    initialDimensions: { width: 30, height: 30 },
    computeMaxWidth: (contentWidth) => contentWidth,
    tnode: {}
};
describe('useIMGElementStateWithCache', () => {
    it('should support cachedNaturalDimensions prop', () => __awaiter(void 0, void 0, void 0, function* () {
        const { result } = (0, react_hooks_1.renderHook)(() => (0, useIMGElementStateWithCache_1.default)(Object.assign(Object.assign({}, props), { cachedNaturalDimensions: {
                width: 600,
                height: 300
            } })));
        expect(result.current.type).toEqual('success');
        expect(result.current.dimensions).toMatchObject({
            width: 300,
            height: 150
        });
    }));
    it('should use default initial dimensions', () => {
        const { result } = (0, react_hooks_1.renderHook)(() => (0, useIMGElementStateWithCache_1.default)(Object.assign(Object.assign({}, props), { initialDimensions: undefined, cachedNaturalDimensions: {
                width: 600,
                height: 300
            } })));
        expect(result.current.type).toEqual('success');
    });
});
