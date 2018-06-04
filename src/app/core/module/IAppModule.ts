/**
 * Application Module Interface
 */
interface IAppModule {
    /**
     * 모듈을 렌더링 한다.
     */
    load(bootstrapComponent: string | symbol): void;
}

export default IAppModule;