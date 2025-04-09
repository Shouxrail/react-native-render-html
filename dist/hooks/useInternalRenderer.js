"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = useInternalRenderer;
const IMGElement_1 = __importDefault(require("../elements/IMGElement"));
const OLElement_1 = __importDefault(require("../elements/OLElement"));
const ULElement_1 = __importDefault(require("../elements/ULElement"));
const ARenderer_1 = require("../renderers/ARenderer");
const IMGRenderer_1 = require("../renderers/IMGRenderer");
const OLRenderer_1 = require("../renderers/OLRenderer");
const ULRenderer_1 = require("../renderers/ULRenderer");
const specialRenderersConfig = {
    img: {
        hook: IMGRenderer_1.useIMGElementProps,
        Element: IMGElement_1.default
    },
    ol: {
        hook: OLRenderer_1.useOLElementProps,
        Element: OLElement_1.default
    },
    ul: {
        hook: ULRenderer_1.useULElementProps,
        Element: ULElement_1.default
    },
    a: {
        hook: ARenderer_1.useAElementProps,
        Element: undefined
    }
};
function hasSpecialInternalRenderer(tagName) {
    return tagName in specialRenderersConfig;
}
/**
 * Resuse internal renderers logic for infinite customization!
 *
 * @remarks `tagName` must be invariant, i.e. it cannot change. You would
 * otherwise break the rules of hooks.
 *
 * @param tagName - **Invariant** The tag name to extend.
 * @param props - The props passed to the custom renderer.
 * @typeParam T - The name of the tag to target.
 * @returns An object with two fields: `Renderer` (the internal react
 * component) and `rendererProps`, the internal component props.
 *
 * @public
 */
function useInternalRenderer(tagName, props) {
    const { TDefaultRenderer } = props, rendererProps = __rest(props, ["TDefaultRenderer"]);
    if (hasSpecialInternalRenderer(tagName)) {
        return {
            Renderer: specialRenderersConfig[tagName].Element || TDefaultRenderer,
            rendererProps: specialRenderersConfig[tagName].hook(props)
        };
    }
    return {
        Renderer: TDefaultRenderer,
        rendererProps
    };
}
