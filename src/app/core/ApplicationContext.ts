import IServiceFactory from './IServiceFactory';
import {Router} from './router/Router';
import IAppModule from "./IAppModule";
import IConfig from "./IConfig";
import IService from "./IService";

/**
 * 어플리케이션 컨텍스트이다.
 * 어플리케이션 생명주기를 관리한다.
 */
class ApplicationContext implements IServiceFactory<any> {
    /**
     * 환경정보
     */
    private config: IConfig;

    /**
     * 어플리케이션 모듈 목록
     */
    private appModules: Map<string, IAppModule> = new Map<string, IAppModule>();

    /**
     * 서비스 목록
     */
    private services: Map<string, IService> = new Map<string, IService>();

    /**
     * 라우터
     */
    private router: Router;

    constructor() {}

    initialize() {}

    public setConfig(config: IConfig): void {
        this.config = config;
    }

    public getConfig(): IConfig {
        return this.config;
    }

    public setModules(modules: Map<string, IAppModule>): void {
        this.appModules = modules;
    }

    public getModule(name: string): IAppModule {
        return this.appModules.get(name);
    }

    public setService(services: Map<string, IService>): void {
        this.services = services;
    }

    public getService(name: string): IService {
        return this.services.get(name);
    }

    public setRouter(router: Router): void {
        this.router = router;
    }

    public getRouter(): Router {
        return this.router;
    }

    registerService(serviceName: string, servie: any): void {
        throw new Error("not imlements abstract metnod");
    }

    provideService(serviceName: string): any {
        throw new Error("not imlements abstract metnod");
    }


}

//use to singleton
export const applicationContext = new ApplicationContext();