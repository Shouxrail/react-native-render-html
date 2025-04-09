"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = mergeCollapsedMargins;
function mergeCollapsedMargins(collapsedMarginTop, nativeStyle) {
    if (typeof collapsedMarginTop !== 'number') {
        return nativeStyle;
    }
    return Object.assign(Object.assign({}, nativeStyle), { marginTop: collapsedMarginTop });
}
