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
     * 기본 생성자
     *
     * @param {IConfig} config
     * @param {Map<string, IAppModule>} modules
     * @param {string} defaultMouleName
     */
    constructor(config: IConfig, modules: Map<string, IAppModule>, defaultMouleName: string) {
        console.log("load AppManager");

        this.initializeContext(config, modules, defaultMouleName);
        this.initializeRouter(applicationContext.getRouter());
    }

    /**
     * 컨텍스트를 초기화 한다.
     *
     * @param {IConfig} config
     * @param {Map<string, IAppModule>} modules
     * @param {string} defaultMouleName
     */
    private initializeContext(config: IConfig, modules: Map<string, IAppModule>, defaultMouleName: string): void {
        applicationContext.setConfig(this, config);
        applicationContext.setModules(this, modules);
        applicationContext.setDefaultModuleName(this, defaultMouleName);
        applicationContext.setRouter(this, new Router('/', '/'));
    }

    /**
     * 라우터를 초기화 한다.
     * TODO 외부 파일로 불리할것.
     */
    private initializeRouter(router: Router) {
        router.registerRoute(new Route("", (values: IRouteValues) : void=> {
            console.log("home Route");
        }));
        router.registerRoute(new Route("/service/{service-id}/type/{type}/version/:version:", (values: IRouteValues): void => {
            console.log("service id: " + values["service-id"]);
            // applicationContext.getComponent("");

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
     *
     * @param {string} bootComponentName
     */
    public bootstrap(bootComponentName: string): void {
        document.addEventListener("DOMContentLoaded", (e) => {
            applicationContext.load(this, bootComponentName);
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
    private config: IConfig;

    /**
     * 어플리케이션 모듈
     */
    private appModules: Map<string, IAppModule> = new Map<string, IAppModule>();

    /**
     * 기본 모듈 명칭
     */
    private defaultModuleName: string;

    /**
     * 기본 생성자
     *
     * @param {IConfig} config 환경정보
     */
    constructor(config: IConfig) {
        this.config = config;
    }

    /**
     * 모듈 목록을 설정한다.
     *
     * @param {Array<IAppModule>} modules
     * @returns {AppBuilder}
     */
    public setModules(...modules: Array<IAppModule>): AppBuilder {
        for(const module of modules) {
            this.appModules.set(module.getName(), module);
        }

        return this;
    }

    /**
     * 모듈을 등록한다.
     *
     * @param IAppModule modules
     * @returns {AppBuilder}
     */
    public addModule(module: IAppModule): AppBuilder {
        this.appModules.set(module.getName(), module);
        return this;
    }

    /**
     * 기본모듈을 설정한다.
     *
     * @param {string} defaultModuleName
     * @returns {AppBuilder}
     */
    public setDefaultModuleName(defaultModuleName: string): AppBuilder {
        if(!Array.from(this.appModules.keys()).find((value, index) => value === defaultModuleName)) {
            throw new Error(`Unregistered name ${defaultModuleName}. Please register first.`);
        }
        this.defaultModuleName = defaultModuleName;
        return this;
    }

    /**
     * 어플리케이션 관리자를 생성하여 반환한다.
     *
     * @returns {AppManager}
     */
    public build(): AppManager {
        if(0 >= this.appModules.size) {
            throw new Error("register more than one Module");
        }

        return new AppManager(this.config, this.appModules, this.defaultModuleName || Array.from(this.appModules.keys())[0]);
    }

}

export {AppManager, AppBuilder};