import LocalizationService from './localizationService';

export default class Registry {
    static instance: Registry;
    instances: Map<string, any> = new Map();

    constructor() {
        const localizationService = new LocalizationService();

        this.addPrivateClassInstance(LocalizationService.className, localizationService);
    }

    getPrivateInstance(instanceName: string) {
        return this.instances.get(instanceName);
    }

    addPrivateClassInstance(className: string, classInstance: any) {
        this.instances.set(className, classInstance);
    }

    static getInstance(instanceName: string) {
        return Registry.get().getPrivateInstance(instanceName);
    }

    static get(): Registry {
        if (!this.instance) {
            this.instance = new Registry();
        }
        return this.instance;
    }
}
