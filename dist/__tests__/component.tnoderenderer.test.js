"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_native_1 = require("@testing-library/react-native");
const RenderHTML_1 = __importDefault(require("../RenderHTML"));
describe('TNodeRenderer', () => {
    it('should warn user when a TNode is empty and unregistered', () => {
        global.console.warn = jest.fn();
        (0, react_native_1.render)(react_1.default.createElement(RenderHTML_1.default, { contentWidth: 0, source: { html: '<bluecircle/>' } }));
        expect(console.warn).toHaveBeenCalledWith(expect.stringContaining('There is no custom renderer registered for tag '));
    });
    it('should warn user when a TNode is empty and registered', () => {
        global.console.warn = jest.fn();
        (0, react_native_1.render)(react_1.default.createElement(RenderHTML_1.default, { contentWidth: 0, source: { html: '<meta/>' } }));
        expect(console.warn).toHaveBeenCalledWith(expect.stringContaining('tag is a valid HTML element but is not handled'));
    });
    it('should not warn user when a TNode is <head>', () => {
        global.console.warn = jest.fn((...args) => console.info(...args));
        (0, react_native_1.render)(react_1.default.createElement(RenderHTML_1.default, { contentWidth: 0, source: { html: '<head/>' } }));
        expect(console.warn).not.toHaveBeenCalled();
    });
    it('should not warn when __DEV__ is false', () => {
        //@ts-expect-error __DEV__ is defined by RN
        global.__DEV__ = false;
        global.console.warn = jest.fn();
        (0, react_native_1.render)(react_1.default.createElement(RenderHTML_1.default, { contentWidth: 0, source: { html: '<bluecircle/>' } }));
        expect(console.warn).not.toHaveBeenCalled();
        //@ts-expect-error __DEV__ is defined by RN
        global.__DEV__ = true;
    });
});
