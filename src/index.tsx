import { Instance } from 'mobx-state-tree';
import { initSuitsFromConfig } from 'ide-lib-engine';

export * from './ServicePanel/config';
export * from './ServicePanel/';

import { ServicePanelCurrying } from './ServicePanel/';
import { configServicePanel } from './ServicePanel/config';

const {
    ComponentModel: ServicePanelModel,
    StoresModel: ServicePanelStoresModel,
    NormalComponent: ServicePanel,
    ComponentHOC: ServicePanelHOC,
    ComponentAddStore: ServicePanelAddStore,
    ComponentFactory: ServicePanelFactory
} = initSuitsFromConfig(ServicePanelCurrying,configServicePanel);

export {
    ServicePanelModel,
    ServicePanelStoresModel,
    ServicePanel,
    ServicePanelHOC,
    ServicePanelAddStore,
    ServicePanelFactory
};

export interface IServicePanelModel extends Instance<typeof ServicePanelModel> { }
