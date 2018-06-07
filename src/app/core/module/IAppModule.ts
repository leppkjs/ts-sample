/**
 * Application Module Interface
 */
interface IAppModule {
    /**
     * 모듈을 적재 한다.
     */
    load(bootstrapComponent: string | symbol): void;

    /**
     * 화면에 렌더링 한다.
     *
     * @param {string} selector
     * @param {string} templateUrl
     */
    renderer(selector: string, templateUrl: string): void;
}

export default IAppModule;