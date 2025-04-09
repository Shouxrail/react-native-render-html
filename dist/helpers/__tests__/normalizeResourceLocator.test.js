"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const normalizeResourceLocator_1 = __importDefault(require("../normalizeResourceLocator"));
describe('normalizeResourceLocator', () => {
    it('should handle empty resource', () => {
        expect((0, normalizeResourceLocator_1.default)('', '')).toEqual('');
    });
    it('should handle empty base', () => {
        expect((0, normalizeResourceLocator_1.default)('https://foo.bar/baz', '')).toEqual('https://foo.bar/baz');
    });
    it('should handle absolute URLs', () => {
        expect((0, normalizeResourceLocator_1.default)('https://absolute.org/foo.jpg', 'https://bar.com')).toEqual('https://absolute.org/foo.jpg');
    });
    it('should handle relative URLs with relative paths (1)', () => {
        expect((0, normalizeResourceLocator_1.default)('../foo.jpg', 'https://bar.com')).toEqual('https://bar.com/foo.jpg');
    });
    it('should handle relative URLs with relative paths (2)', () => {
        expect((0, normalizeResourceLocator_1.default)('foo.jpg', 'https://bar.com/baz/')).toEqual('https://bar.com/baz/foo.jpg');
    });
    it('should handle relative URLs with absolute paths', () => {
        expect((0, normalizeResourceLocator_1.default)('/foo.jpg', 'https://bar.com/baz')).toEqual('https://bar.com/foo.jpg');
    });
    it('should handle protocol-relative URLs of same origin', () => {
        expect((0, normalizeResourceLocator_1.default)('//bar.com/baz', 'https://bar.com/')).toEqual('https://bar.com/baz');
    });
    it('should handle protocol-relative URLs of distinct origins', () => {
        expect((0, normalizeResourceLocator_1.default)('//bar.com/baz', 'https://foo.com/')).toEqual('https://bar.com/baz');
    });
    it('should pass regression #', () => {
        expect((0, normalizeResourceLocator_1.default)('https://www.androidpolice.com/wp-content/uploads/2020/09/30/chromecast-2_U8JJw5Ncykak-728x410.jpg', '')).toEqual('https://www.androidpolice.com/wp-content/uploads/2020/09/30/chromecast-2_U8JJw5Ncykak-728x410.jpg');
    });
});
