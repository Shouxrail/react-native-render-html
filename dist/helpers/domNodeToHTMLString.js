"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = domNodeToHTMLString;
const stringify_entities_1 = __importDefault(require("stringify-entities"));
const transient_render_engine_1 = require("@native-html/transient-render-engine");
function renderOpeningTag(tag, attributes) {
    const strAttributes = [];
    Object.keys(attributes).forEach((key) => {
        strAttributes.push(`${key}="${(0, stringify_entities_1.default)(`${attributes[key]}`)}"`);
    });
    return `<${tag}${strAttributes.length ? ' ' : ''}${strAttributes.join(' ')}>`;
}
/**
 * Convert a DOM node to its HTML representation.
 *
 * @param root - The root to stringify.
 * @param reporter - An optional function which will receive every
 * parsed node as 1st argument, the depth as 2d argument and the converted html
 * as 3d argument.
 */
function domNodeToHTMLString(root, reporter, depth = 0) {
    let html = '';
    if ((0, transient_render_engine_1.isDomElement)(root)) {
        const strChildren = root.children.reduce((prev, curr) => {
            const convertedNode = domNodeToHTMLString(curr, reporter, depth + 1);
            return `${prev}${convertedNode}`;
        }, '');
        html = `${renderOpeningTag(root.tagName, root.attribs)}${strChildren}</${root.tagName}>`;
    }
    else if ((0, transient_render_engine_1.isDomText)(root)) {
        const text = (0, stringify_entities_1.default)(root.data);
        html = text;
    }
    typeof reporter === 'function' && reporter(root, depth, html);
    return html;
}
