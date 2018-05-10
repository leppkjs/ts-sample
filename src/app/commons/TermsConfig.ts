import IConfig from '../core/IConfig';


class TermsConfig implements IConfig {
    config: any;

    constructor(config: any){
        this.config = config;
    }

    getItem(key: string): any {
        return (<any>this.config)[key];
    }

    setItem(key: string, value: any): void {
        (<any>this.config)[key] = value;
    }

}

export default TermsConfig;