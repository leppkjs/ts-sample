import IAppModule from './module/IAppModule';
import IConfig from '../core/IConfig';
import {Router} from './router/Router';
import {Route} from './router/Route';
import {IRouteValues} from './router/IRouteValues';
import {applicationContext} from './ApplicationContext';
import ModuleDTO from "./dto/ModuleDTO";

/**
 * 어플리케이션 관리자
 * 어플리케이션 컨테이너 생성 및 부트스트랩 모듈등을 등록 관리 한다.
 */
class AppManager {
    /**
     * 기본 생성자
     *
     * @param {IConfig} config
     * @param {Array<ModuleDTO>} modules
     * @param {string} baseMouleName
     */
    constructor(config: IConfig, modules: Array<ModuleDTO>, baseMouleName: string | symbol) {
        console.log("load AppManager");

        this.initializeContext(config, modules, baseMouleName);
        this.initializeRouter(applicationContext.getRouter());
    }

    /**
     * 어플리케이션을 부트스트랩 한다.
     *
     * @param {string} bootComponentName
     */
    public bootstrap(bootComponentName: string | symbol): void {
        document.addEventListener("DOMContentLoaded", (e) => {
            applicationContext.load(this, bootComponentName);
            applicationContext.getRouter().start();
        });
    }

    /**
     * 컨텍스트를 초기화 한다.
     *
     * @param {IConfig} config
     * @param {Array<IAppModule>} modules
     * @param {string | symbol} baseMouleName
     */
    private initializeContext(config: IConfig, modules: Array<ModuleDTO>, baseMouleName: string | symbol): void {
        applicationContext.setConfig(this, config);
        applicationContext.setModules(this, this.converterModule(modules));
        applicationContext.setBaseModuleName(this, baseMouleName);
        applicationContext.setRouter(this, new Router('/', '/Terms'));
    }

    private converterModule(modules: Array<ModuleDTO>): Map<string | symbol, Class> {
        return modules.reduce((modules: Map<string | symbol, Class>, module: ModuleDTO) => {
            modules.set(module.name, module.module);
            return modules;
        });
    }

    /**
     * 라우터를 초기화 한다.
     * TODO 외부 파일로 불리할것.
     */
    private initializeRouter(router: Router) {
        router.registerRoute(new Route("/", (values: IRouteValues) : void=> {
            console.log("home Route");
        })).registerRoute(new Route("/service/{service-id}/type/{type}/version/:version:", (values: IRouteValues): void => {
            console.log("service id: " + values["service-id"]);
            // applicationContext.getComponent("");

        })).registerRoute(new Route("/email/{addr}/settings/:id:", (values: IRouteValues): void => {
            if (values["id"] === null) {
                console.log("settings for " + values["addr"]);
            }
            else {
                console.log("setting id: " + values["id"] + " for " + values["addr"]);
            }
        }));
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
    private appModules: Array<ModuleDTO> = new Array<ModuleDTO>();

    /**
     * 기본 모듈 명칭
     */
    private baseModuleName: string | symbol;

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
     * @param {Array<ModuleDTO>} modules
     * @returns {AppBuilder}
     */
    public setModules(...modules: Array<ModuleDTO>): AppBuilder {
        this.appModules = [...modules];
        return this;
    }

    /**
     * 모듈을 등록한다.
     *
     * @param ModuleDTO modules
     * @returns {AppBuilder}
     */
    public addModule(module: ModuleDTO): AppBuilder {
        this.appModules.push(module);
        return this;
    }

    /**
     * 기본모듈을 설정한다.
     *
     * @param {string} baseModuleName
     * @returns {AppBuilder}
     */
    public setBaseModuleName(baseModuleName: string | symbol): AppBuilder {
        if(!this.appModules.find((module : ModuleDTO, index) => module.name === baseModuleName)) {
            throw new Error(`Unregistered name ${baseModuleName}. Please register first.`);
        }
        this.baseModuleName = baseModuleName;
        return this;
    }

    /**
     * 어플리케이션 관리자를 생성하여 반환한다.
     *
     * @returns {AppManager}
     */
    public build(): AppManager {
        if(0 >= this.appModules.length) {
            throw new Error("register more than one Module");
        }

        return new AppManager(this.config, this.appModules, this.baseModuleName || this.appModules[0].name);
    }

}

export {AppManager, AppBuilder};