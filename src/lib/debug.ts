import { createDebuggers } from 'ide-lib-utils';
// 默认用名字导出
const { debugBase, debugComp, debugError, debugIO, debugInteract, debugMini, debugModel, debugRender } = createDebuggers('service-panel');

export {
    debugBase, debugComp, debugError, debugIO, debugInteract, debugMini, debugModel, debugRender
};
