import { Container } from 'inversify';
import IServiceFactory from './IServiceFactory';
import { Router } from './router/Router';
import IAppModule from './module/IAppModule';
import IConfig from './IConfig';
import IService from './service/IService';
import { AppManager } from './AppManager';
import IComponent from './component/IComponent';
import ModuleDTO from './dto/ModuleDTO';
import ComponentDTO from './dto/ComponentDTO';
import ServiceDTO from './dto/ServiceDTO';

/**
 * 어플리케이션 컨텍스트이다.
 * 어플리케이션 생명주기를 관리한다.
 */
class ApplicationContext implements IServiceFactory<ComponentDTO, IComponent, ServiceDTO, IService> {
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
     * 라우터
     */
    private router: Router;

    /**
     * 기본 생성자이다.
     */
    public constructor () {
        this.iocContainer = new Container();
    }

    /**
     * 어플리케이션 적재한다.
     *
     * @param {AppManager} manager
     * @param {string | symbol} componentName
     */
    public load (manager: AppManager, componentName: string | symbol) {
        if (!(manager instanceof AppManager)) {
            throw new Error('It is only initialized by only AppManager');
        }
        this.iocContainer.get<IAppModule>(this.baseModuleName).load(componentName);
    }

    /**
     * 환경정보를 등록한다.
     *
     * @param {AppManager} manager
     * @param {IConfig} config
     */
    public setConfig (manager: AppManager, config: IConfig): void {
        if (!(manager instanceof AppManager)) {
            throw new Error('It is only initialized config by only AppManager');
        }
        this.config = config;
    }

    /**
     * 환경정보를 반환한다.
     *
     * @returns {IConfig}
     */
    public getConfig (): IConfig {
        return this.config;
    }

    /**
     * 모듈 목록을 등록한다.
     *
     * @param {AppManager} manager
     * @param {Map<string | symbol, IAppModule>} modules
     */
    public setModules (manager: AppManager, modules: Array<ModuleDTO>): void {
        if (!(manager instanceof AppManager)) {
            throw new Error('It is only initialized Modules by only AppManager');
        }

        modules.reduce((iocContainer, module: ModuleDTO) => {
            iocContainer.bind<IAppModule>(module.name).to(module.module);
            module.components.forEach(component => this.registerComponent(component));
            module.services.forEach(service => this.registerService(service));

            return iocContainer;
        }, this.iocContainer);
    }

    /**
     * 기본모듈명을 설정한다.
     *
     * @param {AppManager} manager
     * @param {string | symbol} moduleName
     */
    public setBaseModuleName (manager: AppManager, moduleName: string | symbol) {
        if (!(manager instanceof AppManager)) {
            throw new Error('It is only initialized baseModuleName by only AppManager');
        }

        this.baseModuleName = moduleName;
    }

    /**
     * 라우터를 등록한다.
     *
     * @param {AppManager} manager
     * @param {Router} router
     */
    public setRouter (manager: AppManager, router: Router): void {
        if (!(manager instanceof AppManager)) {
            throw new Error('It is only initialized Router by only AppManager');
        }
        this.router = router;
    }

    /**
     * 라우터를 반환한다.
     *
     * @returns {Router}
     */
    public getRouter (): Router {
        return this.router;
    }

    /**
     * 컴포넌트를 등록한다.
     *
     * @param {ComponentDTO} component
     * @param {string | symbol} moduleName
     */
    registerComponent (component: ComponentDTO, moduleName?: string | symbol): void {
        this.iocContainer.bind<IComponent>(component.name).to(component.component);
    }

    /**
     * 컴포넌트를 제공한다.
     *
     * @param {string | symbol} componentName
     * @param {string | symbol} moduleName
     * @returns {IComponent}
     */
    provideComponent (componentName: string | symbol, moduleName?: string | symbol): IComponent {
        return this.iocContainer.get<IComponent>(componentName);
    }

    /**
     * 서비스를 등록 한다.
     *
     * @param {ServiceDTO} servie
     * @param {string | symbol} moduleName
     */
    registerService (service: ServiceDTO, moduleName?: string | symbol): void {
        this.iocContainer.bind<IService>(service.name).to(service.service);
    }

    /**
     * 서비스를 제공한다.
     *
     * @param {string | symbol} serviceName
     * @param {string | symbol} moduleName
     * @returns {IService}
     */
    provideService (serviceName: string | symbol, moduleName?: string | symbol): IService {
        return this.iocContainer.get<IService>(serviceName);
    }
}

// use to singleton
export const applicationContext = new ApplicationContext();
