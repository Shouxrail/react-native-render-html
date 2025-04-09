"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_native_1 = require("react-native");
const react_native_2 = require("@testing-library/react-native");
const GenericPressable_1 = __importDefault(require("../GenericPressable"));
const RenderHTMLConfigProvider_1 = __importDefault(require("../RenderHTMLConfigProvider"));
const TRenderEngineProvider_1 = __importDefault(require("../TRenderEngineProvider"));
describe('GenericPressable', () => {
    it('should render TouchableHighlight by default', () => {
        (0, react_native_2.render)(react_1.default.createElement(GenericPressable_1.default, null));
    });
    it('should use provided GenericPressable', () => {
        const CustomGenericPressable = jest.fn(() => null);
        (0, react_native_2.render)(react_1.default.createElement(TRenderEngineProvider_1.default, null,
            react_1.default.createElement(RenderHTMLConfigProvider_1.default, { GenericPressable: CustomGenericPressable },
                react_1.default.createElement(GenericPressable_1.default, null))));
        expect(CustomGenericPressable).toHaveBeenCalled();
    });
    it('should render TouchableNativeFeedback on Android', () => {
        react_native_1.Platform.OS = 'android';
        (0, react_native_2.render)(react_1.default.createElement(GenericPressable_1.default, null));
    });
});
