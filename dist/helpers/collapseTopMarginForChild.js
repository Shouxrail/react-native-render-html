"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = collapseTopMarginForChild;
const getCollapsedMarginTop_1 = __importDefault(require("./getCollapsedMarginTop"));
function isCollapsible(tnode) {
    return tnode.type === 'block' || tnode.type === 'phrasing';
}
/**
 * Compute top collapsed margin for the nth {@link TNode}-child of a list of
 * TNodes.
 *
 * @param n - The index for which the top margin should be collapsed.
 * @param tchildren - The list of {@link TNode} children.
 * @returns `null` when no margin collapsing should apply, a number otherwise.
 * @public
 */
function collapseTopMarginForChild(n, tchildren) {
    const childTnode = tchildren[n];
    if (isCollapsible(childTnode) && n > 0 && isCollapsible(tchildren[n - 1])) {
        return (0, getCollapsedMarginTop_1.default)(tchildren[n - 1], childTnode);
    }
    return null;
}
