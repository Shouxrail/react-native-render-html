"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = useTTree;
const react_1 = require("react");
const ttreeEventsContext_1 = __importDefault(require("../context/ttreeEventsContext"));
const SharedPropsProvider_1 = require("../context/SharedPropsProvider");
const TRenderEngineProvider_1 = require("../TRenderEngineProvider");
function useTTreeChangeEffect(ttree) {
    const { onTTreeChange } = (0, react_1.useContext)(ttreeEventsContext_1.default);
    const { debug } = (0, SharedPropsProvider_1.useSharedProps)();
    const updateNumber = (0, react_1.useRef)(0);
    (0, react_1.useEffect)(() => {
        onTTreeChange === null || onTTreeChange === void 0 ? void 0 : onTTreeChange.call(null, ttree);
        if (debug && typeof __DEV__ === 'boolean' && __DEV__) {
            console.info(`Transient Render Tree update ${++updateNumber.current}:\n${ttree.snapshot({
                withNodeIndex: false,
                withStyles: false
            })}`);
        }
    }, [ttree, onTTreeChange, debug]);
}
/**
 * @internal
 */
function useTTree(props) {
    const { document } = props;
    const trenderEngine = (0, TRenderEngineProvider_1.useAmbientTRenderEngine)();
    const ttree = (0, react_1.useMemo)(() => typeof document === 'string'
        ? trenderEngine.buildTTree(document)
        : trenderEngine.buildTTreeFromDoc(document), [document, trenderEngine]);
    useTTreeChangeEffect(ttree);
    return ttree;
}
