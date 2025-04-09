"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = normalizeResourceLocator;
const urijs_1 = __importDefault(require("urijs"));
/**
 * This function normalize relative and protocol-relative URLs to absolute
 * URLs as per {@link https://tools.ietf.org/html/rfc1808 | RFC1808}.
 *
 * @param url - The URL to normalize.
 * @param baseUrl - The base URL to resolve relative and protocol-relative URLs.
 */
function normalizeResourceLocator(url, baseUrl) {
    try {
        return baseUrl ? (0, urijs_1.default)(url).absoluteTo((0, urijs_1.default)(baseUrl)).href() : (0, urijs_1.default)(url).href();
    }
    catch (e) {
        return url;
    }
}
