import IAppModule from './IAppModule';
import IConfig from '../core/IConfig';
import {Router} from './router/Router';
import {Route} from './router/Route';
import {IRouteValues} from './router/IRouteValues';
import {applicationContext} from './ApplicationContext';

/**
 * 어플리케이션 관리자
 * 어플리케이션 컨테이너 생성 및 부트스트랩 모듈등을 등록 관리 한다.
 */
class AppManager {
    /**
     * 부트스트랩 모듈
     */
    private bootModule: IAppModule;

    /**
     * 기본 생성자
     *
     * @param {IConfig} config 환경정보
     * @param {IAppModule} bootModule 부트스트랩 모듈
     * @param {Array<IAppModule>} appModules 어플리케이션 모듈 목록
     * @param {Array<any>} services 서비스 목록
     */
    constructor(build: AppBuilder) {
        console.log("load AppManager");
        this.bootModule = build.bootModule;
        this.initializeContext(build);
        this.initializeRouter(applicationContext.getRouter());
    }

    private initializeContext(build: AppBuilder): void {
        applicationContext.initialize();
        applicationContext.setConfig(build.config);
        applicationContext.setModules(build.appModules);
        applicationContext.setService(build.services);
        applicationContext.setRouter(new Router('/', '/'));
    }

    /**
     * TODO 외부 파일로 불리할것.
     */
    private initializeRouter(router: Router) {
        router.registerRoute(new Route("", (values: IRouteValues) : void=> {
            console.log("home Route");
        }));
        router.registerRoute(new Route("/service/{service-id}/type/{type}/version/:version:", (values: IRouteValues): void => {
            console.log("service id: " + values["service-id"]);
            applicationContext.getComponent("");

        }));
        router.registerRoute(new Route("/email/{addr}/settings/:id:", (values: IRouteValues): void => {
            if (values["id"] === null) {
                console.log("settings for " + values["addr"]);
            }
            else {
                console.log("setting id: " + values["id"] + " for " + values["addr"]);
            }
        }));
    }

    /**
     * 어플리케이션을 부트스트랩 한다.
     */
    public bootstrap(): void {
        document.addEventListener("DOMContentLoaded", (e) => {
            this.bootModule.load();
            console.log("interceptor router....");
            applicationContext.getRouter().navigateTo("/");
        });
    }

}

/**
 * AppManager를 생성하여 반환한다.
 */
class AppBuilder {
    /**
     * 환경설정
     */
    public config: IConfig;

    /**
     * 부트스트랩 모듈
     */
    public bootModule: IAppModule;

    /**
     * 어플리케이션 모듈
     */
    public appModules: Array<IAppModule> = [];

    /**
     * 서비스 목록
     */
    public services: Array<any> = [];

    /**
     * 기본 생성자
     *
     * @param {IConfig} config 환경정보
     * @param {IAppModule} appBootModule 어플리케이션 부트스트랩 모듈
     */
    constructor(config: IConfig, appBootModule: IAppModule) {
        this.config = config;
        this.bootModule = appBootModule;
        this.appModules.push(this.bootModule);
    }

    /**
     * 모듈 목록을 설정한다.
     *
     * @param {IAppModule} modules
     * @returns {AppBuilder}
     */
    public setModules(modules: Array<IAppModule>): AppBuilder {
        this.appModules.push(...modules);
        return this;
    }

    /**
     * 서비스 목록을 설정한다.
     *
     * @param services
     * @returns {AppManagerBuilder}
     */
    public setProviders(services: Array<any>): AppBuilder {
        this.services.push(...services);
        return this;
    }


    /**
     * 어플리케이션 관리자를 생성하여 반환한다.
     *
     * @returns {AppManager}
     */
    public build(): AppManager {
        return new AppManager(this);
    }

}

export {AppManager, AppBuilder};