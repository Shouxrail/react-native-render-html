"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const identity_1 = __importDefault(require("ramda/src/identity"));
const useProfiler = typeof __DEV__ === 'boolean' && __DEV__ && typeof performance === 'object'
    ? function useProfiler({ name, prop }) {
        const lastUpdate = (0, react_1.useRef)(0);
        const profile = (0, react_1.useCallback)(function onUpdate() {
            const now = performance.now();
            const diff = now - lastUpdate.current;
            if (diff < 60) {
                console.warn(`You seem to update ${prop ? `the ${prop} prop(s)` : 'props'} of the "${name ? name : 'RenderHTML'}" component in short periods of time, causing costly tree rerenders (last update was ${diff.toFixed(2)}ms ago). See https://stackoverflow.com/q/68966120/2779871`);
            }
            lastUpdate.current = now;
        }, [name, prop]);
        return profile;
    }
    : /* istanbul ignore next */
        function useProfiler() {
            return identity_1.default;
        };
exports.default = useProfiler;
