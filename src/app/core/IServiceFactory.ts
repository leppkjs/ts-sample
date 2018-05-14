/**
 * 서비스팩토리 인터페이스이다.
 */
interface IServiceFactory<C, S> {
    /**
     * 컴포넌트를 등록한다.
     *
     * @param {C} component
     * @param {string} moduleName
     */
    registerComponent(component: C, moduleName: string): void;

    /**
     * 컴포넌트이름에 해당하는 컴포넌트를 반환한다.
     *
     * @param {string} componentName 컴포넌트명
     * @returns {C} 컴포넌트프록시객체
     */
    provideComponent(componentName: string): C;

    /**
     * 서비스를 등록한다.
     *
     * @param {S} servie
     * @param {string} moduleName
     */
    registerService(servie: S, moduleName: string): void;

    /**
     * 서비스이름에 해당하는 서비스를 반환한다.
     *
     * @param {string} serviceName 서비스명
     * @returns {S} 서비스객체
     */
    provideService(serviceName: string): S;

}

export default IServiceFactory;