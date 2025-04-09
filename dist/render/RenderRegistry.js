"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lookupRecord_1 = __importDefault(require("../helpers/lookupRecord"));
const BRRenderer_1 = __importDefault(require("../renderers/BRRenderer"));
const WBRRenderer_1 = __importDefault(require("../renderers/WBRRenderer"));
const internalRenderers_1 = __importDefault(require("./internalRenderers"));
const internalTextRenderers = {
    br: BRRenderer_1.default,
    wbr: WBRRenderer_1.default
};
class RenderRegistry {
    constructor(customRenderers = {}, elementModels) {
        this.customRenderers = {};
        this.customRenderers = customRenderers;
        this.elementModels = elementModels;
    }
    getCustomRendererForTNode(tnode) {
        if (tnode.tagName in this.customRenderers) {
            const renderer = this.customRenderers[tnode.tagName];
            /* istanbul ignore next */
            if (typeof __DEV__ === 'boolean' && __DEV__) {
                // In DEV, check for discrepancies.
                const elementModel = this.elementModels[tnode.tagName];
                if (!elementModel) {
                    console.warn(`You are attempting to render a ${tnode.tagName} tag but you didn't provide an HTMLElementModel. Make sure you register a model for this tag in "customHTMLElementModels" prop. `);
                }
                else if (!tnode.matchContentModel(elementModel.contentModel)) {
                    console.warn(`You are attempting to render "${tnode.tagName}" of type "${tnode.displayName}", but the registered renderer is of content model type ${elementModel === null || elementModel === void 0 ? void 0 : elementModel.contentModel} which is incompatible with "${tnode.displayName}".`);
                }
            }
            return renderer;
        }
        return null;
    }
    getDefaultRendererForTNode(tnode) {
        if (tnode.tagName in internalRenderers_1.default) {
            //@ts-expect-error we know that the tagName is in the map
            return internalRenderers_1.default[tnode.tagName];
        }
        return null;
    }
    getInternalTextRenderer(tagName) {
        if ((0, lookupRecord_1.default)(internalTextRenderers, tagName)) {
            return internalTextRenderers[tagName];
        }
        return null;
    }
    getRendererConfigForTNode(tnode) {
        return {
            Custom: this.getCustomRendererForTNode(tnode),
            Default: this.getDefaultRendererForTNode(tnode)
        };
    }
}
exports.default = RenderRegistry;
