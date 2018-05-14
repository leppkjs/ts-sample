import IAppModule from "./IAppModule";
import IService from "../service/IService";
import IComponent from "../component/IComponent";

/**
 * 모듈의 추상클래스이다.
 */
abstract class AbstractModule implements IAppModule {
    /**
     * 모듈명칭
     */
    protected readonly name: string;
    /**
     * 컴포넌트 목록
     * @type {Map<string, IComponent>}
     */
    protected components: Map<string, IComponent> = new Map<string, IComponent>();
    /**
     * 서비스 목록
     * @type {Map<string, IService>}
     */
    protected services: Map<string, IService> = new Map<string, IService>();

    /**
     * 기본 생성자이다.
     *
     * @param {string} name 컴포넌트명칭
     * @param {Array<IComponent>} components 컴포넌트목록
     * @param {Array<IService>} services 서비스목록
     */
    constructor(name: string, components: Array<IComponent>, services: Array<IService>) {
        this.name = name;
        this.setComponents(components);
        this.setServices(services);
    }

    /**
     * 모듈명칭을 반환한다.
     *
     * @returns {string} 모듈명칭
     */
    getName(): string {
        return this.name;
    }

    /**
     * 컴포넌트를 등록한다.
     *
     * @param {IComponent} component 컴포넌트
     */
    public addComponent(component: IComponent): void {
        //TODO proxy 처리 할것.
        this.components.set(component.getName(), component);
    }

    /**
     * 컴포넌트를 반환한다.
     *
     * @param {string} name
     * @returns {IComponent}
     */
    public getComponent(name: string): IComponent {
        return this.components.get(name);
    }

    /**
     * 서비스를 등록한다.
     *
     * @param {IService} service 서비스
     */
    public addSerivce(service: IService): void {
        //TODO proxy 처리 할것.
        this.services.set(service.getName(), service);
    }

    /**
     * 서비스를 반환한다.
     *
     * @param {string} name
     * @returns {IService}
     */
    public getService(name: string): IService {
        return this.services.get(name);
    }

    /**
     * 컴포넌트 목록을 등록한다.
     *
     * @param {Array<IComponent>} components
     */
    private setComponents(components: Array<IComponent>): void {
        for(const component of components) {
            this.addComponent(component);
        }
    }

    /**
     * 서비스 목록을 등록한다.
     *
     * @param {Array<IService>} services
     */
    private setServices(services: Array<IService>): void {
        for(const service of services) {
            this.addSerivce(service);
        }
    }

    /**
     * 모듈을 렌더링 한다.
     *
     * @param {string} bootstrapComponent
     */
    abstract load(bootstrapComponent: string): void;
}

export default AbstractModule;