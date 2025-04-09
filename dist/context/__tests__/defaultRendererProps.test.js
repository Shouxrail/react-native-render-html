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
Object.defineProperty(exports, "__esModule", { value: true });
const react_native_1 = require("react-native");
const defaultRendererProps_1 = require("../defaultRendererProps");
describe('defaultRendererProps', () => {
    describe('defaultAOnPress', () => {
        it('should not throw', () => __awaiter(void 0, void 0, void 0, function* () {
            react_native_1.Linking.canOpenURL = jest.fn(() => __awaiter(void 0, void 0, void 0, function* () { return false; }));
            yield expect((0, defaultRendererProps_1.defaultAOnPress)({}, 'hi')).resolves.not.toThrow();
            react_native_1.Linking.canOpenURL = jest.fn(() => __awaiter(void 0, void 0, void 0, function* () { return true; }));
            yield expect((0, defaultRendererProps_1.defaultAOnPress)({}, 'https://domain.com')).resolves.not.toThrow();
        }));
    });
});
