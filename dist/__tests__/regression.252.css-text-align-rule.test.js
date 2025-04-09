"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_native_1 = require("@testing-library/react-native");
const utils_1 = require("./utils");
function testTranslation(cssValue, rnValue) {
    it(`sould translate ${cssValue} value to ${rnValue}`, () => {
        (0, utils_1.expectTranslatedInlineCSSValueToEqual)({
            cssInlineRules: `text-align: ${cssValue};`,
            render: react_native_1.render,
            reactNativePropStyleName: 'textAlign',
            value: rnValue
        });
    });
}
/**
 * https://github.com/meliorence/react-native-render-html/issues/252
 */
describe('HTML component', () => {
    describe('should pass regression #252 regarding inline text-align CSS rules', () => {
        testTranslation('left', 'left');
        testTranslation('right', 'right');
        testTranslation('auto', 'auto');
        testTranslation('justify', 'justify');
        testTranslation('center', 'center');
        testTranslation('start', undefined);
        testTranslation('end', undefined);
        testTranslation('justify-all', undefined);
    });
});
