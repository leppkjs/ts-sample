import IService from "./IService";
import IComponent from "./IComponent";

/**
 * Application Module Interface
 */
interface IAppModule {
    /**
     * 모듈명칭을 반환한다.
     *
     * @returns {string} 모듈명칭
     */
    getName(): string;

    /**
     * 모듈을 렌더링 한다.
     */
    load(bootstrapComponent: string): void;

    /**
     * 컴포넌트를 추가한다.
     *
     * @param {IComponent} component
     */
    addComponent(component: IComponent): void;

    /**
     * 서비스를 추가한다.
     *
     * @param {IService} service
     */
    addSerivce(service: IService): void;

}

export default IAppModule;