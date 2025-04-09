"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_native_1 = require("@testing-library/react-native");
const utils_1 = require("./utils");
/**
 * https://github.com/meliorence/react-native-render-html/issues/257
 */
describe('HTML component', () => {
    it('should pass regression #257 regarding inline display CSS rules', () => {
        (0, utils_1.expectTranslatedInlineCSSToMatchObject)({
            cssInlineRules: 'display: inline-block;',
            render: react_native_1.render,
            reactNativeStyle: {}
        });
    });
});
