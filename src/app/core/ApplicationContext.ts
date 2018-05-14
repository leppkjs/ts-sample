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
     * 기본 모듈 명칭
     */
    private baseModuleName: string;

    /**
     * 어플리케이션 모듈 목록
     */
    private appModules: Map<string, IAppModule> = new Map<string, IAppModule>();

    /**
     * 라우터
     */
    private router: Router;

    /**
     * 어플리케이션 적재한다.
     *
     * @param {AppManager} manager
     */
    public load(manager: AppManager, componentName: string) {
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
     * @param {Map<string, IAppModule>} modules
     */
    public setModules(manager: AppManager, modules: Map<string, IAppModule>): void {
        if(!(manager instanceof AppManager)) {
            throw new Error("It is only initialized Modules by only AppManager");
        }
        this.appModules = modules;
    }

    /**
     * 기본모듈명을 설정한다.
     *
     * @param {string} moduleName
     */
    public setBaseModuleName(manager: AppManager, moduleName: string) {
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
     * @param {string} moduleName
     */
    registerComponent(component: IComponent, moduleName?: string): void {
        this.appModules.get(moduleName || this.baseModuleName).addComponent(component);
    }

    /**
     * 컴포넌트를 제공한다.
     *
     * @param {string} componentName
     * @param {string} moduleName
     * @returns {IComponent}
     */
    provideComponent(componentName: string, moduleName?: string): IComponent {
        return this.appModules.get(moduleName || this.baseModuleName).getComponent(componentName);
    }

    /**
     * 서비스를 등록 한다.
     *
     * @param {IService} servie
     * @param {string} moduleName
     */
    registerService(servie: IService, moduleName?: string): void {
        this.appModules.get(moduleName || this.baseModuleName).addSerivce(servie);
    }

    /**
     * 서비스를 제공한다.
     *
     * @param {string} serviceName
     * @param {string} moduleName
     * @returns {IService}
     */
    provideService(serviceName: string, moduleName?: string): IService {
        return this.appModules.get(moduleName || this.baseModuleName).getService(serviceName);
    }
}

//use to singleton
export const applicationContext = new ApplicationContext();