"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_hooks_1 = require("@testing-library/react-hooks");
const TRenderEngineProvider_1 = require("../../TRenderEngineProvider");
describe('useAmbientTRenderEngine', () => {
    it('should warn user when there is no ambient TRenderEngine', () => {
        console.error = jest.fn();
        (0, react_hooks_1.renderHook)(() => (0, TRenderEngineProvider_1.useAmbientTRenderEngine)());
        expect(console.error).toHaveBeenCalledWith('TRenderEngineProvider is missing in the render tree.');
    });
});
