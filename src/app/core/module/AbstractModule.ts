import IAppModule from "./IAppModule";
import {injectable} from "inversify";

/**
 * 모듈의 추상클래스이다.
 */
@injectable()
abstract class AbstractModule implements IAppModule {
    /**
     * 기본 생성자이다.
     */
    constructor() {
    }

    /**
     * 모듈을 렌더링 한다.
     *
     * @param {string} bootstrapComponent
     */
    abstract load(bootstrapComponent: string): void;

    /**
     *
     * @param {string} selector
     * @param {string} templateUrl
     */
    abstract renderer(selector: string, templateUrl: string): void;
}

export default AbstractModule;