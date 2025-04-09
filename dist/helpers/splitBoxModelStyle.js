"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = splitBoxModelStyle;
const pick_1 = __importDefault(require("ramda/src/pick"));
const omit_1 = __importDefault(require("ramda/src/omit"));
const borderBoxProps = [
    'backgroundColor',
    'borderBottomColor',
    'borderBottomLeftRadius',
    'borderBottomRightRadius',
    'borderBottomWidth',
    'borderLeftColor',
    'borderLeftWidth',
    'borderRightColor',
    'borderRightWidth',
    'borderStyle',
    'borderTopColor',
    'borderTopLeftRadius',
    'borderTopRightRadius',
    'borderTopWidth',
    'paddingBottom',
    'paddingLeft',
    'paddingRight',
    'paddingTop',
    'marginBottom',
    'marginLeft',
    'marginRight',
    'marginTop'
];
const pickBorderBox = (0, pick_1.default)(borderBoxProps);
const omitBorderBox = (0, omit_1.default)(borderBoxProps);
/**
 * A utility to separate box model styles and other styles. Useful when one wants
 * to wrap a text element in a view to benefit from padding vertical,
 * borders... etc.
 *
 * @param styles - The native styles to split.
 */
function splitBoxModelStyle(style) {
    return {
        boxModelStyle: pickBorderBox(style),
        otherStyle: omitBorderBox(style)
    };
}
