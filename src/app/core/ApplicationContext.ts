import { Container } from "inversify";
import IServiceFactory from './IServiceFactory';
import {Router} from './router/Router';
import IAppModule from "./module/IAppModule";
import IConfig from "./IConfig";
import IService from "./service/IService";
import {AppManager} from "./AppManager";
import IComponent from "./component/IComponent";

/**
 * 어플리케이션 컨텍스트이다.
 * 어플리케이션 생명주기를 관리한다.
 */
class ApplicationContext implements IServiceFactory<IComponent, IService> {
    /**
     * 환경정보
     */
    private config: IConfig;

    /**
     * IOC 컨테이너
     */
    private iocContainer: Container;

    /**
     * 기본 모듈 명칭
     */
    private baseModuleName: string | symbol;

    /**
     * 어플리케이션 모듈 목록
     */
    private appModules: Map<string | symbol, IAppModule> = new Map<string | symbol, IAppModule>();

    /**
     * 라우터
     */
    private router: Router;

    public constructor() {
        this.iocContainer = new Container();
    }

    /**
     * 어플리케이션 적재한다.
     *
     * @param {AppManager} manager
     * @param {string | symbol} componentName
     */
    public load(manager: AppManager, componentName: string | symbol) {
        if(!(manager instanceof AppManager)) {
            throw new Error("It is only initialized by only AppManager");
        }
        this.appModules.get(this.baseModuleName).load(componentName);
    }

    /**
     * 환경정보를 등록한다.
     *
     * @param {AppManager} manager
     * @param {IConfig} config
     */
    public setConfig(manager: AppManager, config: IConfig): void {
        if(!(manager instanceof AppManager)) {
            throw new Error("It is only initialized config by only AppManager");
        }
        this.config = config;
    }

    /**
     * 환경정보를 반환한다.
     *
     * @returns {IConfig}
     */
    public getConfig(): IConfig {
        return this.config;
    }

    /**
     * 모듈 목록을 등록한다.
     *
     * @param {AppManager} manager
     * @param {Map<string | symbol, IAppModule>} modules
     */
    public setModules(manager: AppManager, modules: Map<string | symbol, Class>): void {
        if(!(manager instanceof AppManager)) {
            throw new Error("It is only initialized Modules by only AppManager");
        }
        for(module of modules) {
            this.myContainer.bind<T>(className).to(clazz);
        }

        this.appModules = modules;
    }

    /**
     * 기본모듈명을 설정한다.
     *
     * @param {string | symbol} moduleName
     */
    public setBaseModuleName(manager: AppManager, moduleName: string | symbol) {
        if(!(manager instanceof AppManager)) {
            throw new Error("It is only initialized baseModuleName by only AppManager");
        }

       this.baseModuleName = moduleName;
    }

    /**
     * 라우터를 등록한다.
     *
     * @param {AppManager} manager
     * @param {Router} router
     */
    public setRouter(manager: AppManager, router: Router): void {
        if(!(manager instanceof AppManager)) {
            throw new Error("It is only initialized Router by only AppManager");
        }
        this.router = router;
    }

    /**
     * 라우터를 반환한다.
     *
     * @returns {Router}
     */
    public getRouter(): Router {
        return this.router;
    }

    /**
     * 컴포넌트를 등록한다.
     *
     * @param {IComponent} component
     * @param {string | symbol} moduleName
     */
    registerComponent(component: IComponent, moduleName?: string | symbol): void {
        this.appModules.get(moduleName || this.baseModuleName).addComponent(component);
    }

    /**
     * 컴포넌트를 제공한다.
     *
     * @param {string | symbol} componentName
     * @param {string | symbol} moduleName
     * @returns {IComponent}
     */
    provideComponent(componentName: string | symbol, moduleName?: string | symbol): IComponent {
        return this.appModules.get(moduleName || this.baseModuleName).getComponent(componentName);
    }

    /**
     * 서비스를 등록 한다.
     *
     * @param {IService} servie
     * @param {string | symbol} moduleName
     */
    registerService(servie: IService, moduleName?: string | symbol): void {
        this.appModules.get(moduleName || this.baseModuleName).addSerivce(servie);
    }

    /**
     * 서비스를 제공한다.
     *
     * @param {string} serviceName
     * @param {string | symbol} moduleName
     * @returns {IService}
     */
    provideService(serviceName: string, moduleName?: string | symbol): IService {
        return this.appModules.get(moduleName || this.baseModuleName).getService(serviceName);
    }
}

//use to singleton
export const applicationContext = new ApplicationContext();