"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = useNormalizedUrl;
const DocumentMetadataProvider_1 = require("../context/DocumentMetadataProvider");
const normalizeResourceLocator_1 = __importDefault(require("../helpers/normalizeResourceLocator"));
/**
 * This hook transforms relative and protocol-relative URLs to absolute URLs as
 * per {@link https://tools.ietf.org/html/rfc1808 | RFC1808}. The base URL is
 * determined by the `<base />` element, `source.uri` or `source.baseUrl`.
 *
 * @remarks
 * - If there is no `baseUrl` and the initial URL is relative, this hook will
 *   return the initial URL.
 * - If the initial URL is absolute, this hook will return this initial URL.
 *
 * @param initialUrl - The URL before normalization.
 *
 * @public
 */
function useNormalizedUrl(initialUrl) {
    const { baseUrl } = (0, DocumentMetadataProvider_1.useDocumentMetadata)();
    return (0, normalizeResourceLocator_1.default)(initialUrl, baseUrl);
}
