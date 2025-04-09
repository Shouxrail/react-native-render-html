export type DebugType = 'noSource' | 'contentWidth' | 'outdatedUriProp' | 'outdatedHtmlProp' | 'outdatedListPrefixRenderersProps' | 'outdatedImagesDimensions' | 'outdatedOnLinkPressProp' | 'outdatedEnableExperimentalPercentWidth' | 'outdatedIgnoreNodesFunction' | 'outdatedAlterNode' | 'outdatedAlterChildren' | 'outdatedAlterData' | 'outdatedComputeImagesMaxWidth' | 'outdatedTriggerTREInvalidation';
declare let debugMessage: Record<DebugType, string>;
export type DebugMessages = typeof debugMessage;
export default debugMessage;
