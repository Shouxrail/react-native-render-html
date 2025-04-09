"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_native_1 = require("@testing-library/react-native");
const utils_1 = require("./utils");
/**
 * https://github.com/meliorence/react-native-render-html/issues/361
 */
describe('HTML component', () => {
    it('should pass regression #361 regarding inline margin CSS rules', () => {
        (0, utils_1.expectTranslatedInlineCSSRuleTo)({
            cssInlineRules: 'margin: none;',
            render: react_native_1.render,
            test: (style) => expect(style.margin).toBeUndefined()
        });
    });
});
