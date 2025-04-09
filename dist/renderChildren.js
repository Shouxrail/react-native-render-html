"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = renderChildren;
const react_1 = __importDefault(require("react"));
const TNodeRenderer_1 = __importDefault(require("./TNodeRenderer"));
const collapseTopMarginForChild_1 = __importDefault(require("./helpers/collapseTopMarginForChild"));
const empty = {};
const mapCollapsibleChildren = (propsForChildren, renderChild, disableMarginCollapsing, childTnode, n, tchildren) => {
    const collapsedMarginTop = disableMarginCollapsing
        ? null
        : (0, collapseTopMarginForChild_1.default)(n, tchildren);
    const propsFromParent = Object.assign(Object.assign({}, propsForChildren), { collapsedMarginTop });
    const key = childTnode.nodeIndex;
    const childElement = react_1.default.createElement(TNodeRenderer_1.default, {
        propsFromParent,
        tnode: childTnode,
        key,
        renderIndex: n,
        renderLength: tchildren.length
    });
    return typeof renderChild === 'function'
        ? renderChild({
            key,
            childElement,
            index: n,
            childTnode,
            propsFromParent
        })
        : childElement;
};
function renderChildren({ tchildren, propsForChildren = empty, disableMarginCollapsing, renderChild }) {
    const elements = tchildren.map(mapCollapsibleChildren.bind(null, propsForChildren, renderChild, disableMarginCollapsing));
    return react_1.default.createElement(react_1.default.Fragment, null, elements);
}
