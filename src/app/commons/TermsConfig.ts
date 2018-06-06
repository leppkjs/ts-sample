import IConfig from '../core/IConfig';

class TermsConfig implements IConfig {
    config: any;

    constructor (config: any) {
        this.config = config;
    }

    getItem (key: string): any {
        return (this.config as any)[key];
    }

    setItem (key: string, value: any): void {
        (this.config as any)[key] = value;
    }

}

export default TermsConfig;
