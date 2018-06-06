/**
 * 서비스팩토리 인터페이스이다.
 */
interface IServiceFactory<CD, C, SD, S> {
    /**
     * 컴포넌트를 등록한다.
     *
     * @param {C} component
     * @param {string | symbol} moduleName
     */
    registerComponent (component: CD, moduleName: string | symbol): void;

    /**
     * 컴포넌트이름에 해당하는 컴포넌트를 반환한다.
     *
     * @param {string | symbol} componentName 컴포넌트명
     * @returns {C} 컴포넌트프록시객체
     */
    provideComponent (componentName: string | symbol): C;

    /**
     * 서비스를 등록한다.
     *
     * @param {S} servie
     * @param {string | symbol} moduleName
     */
    registerService (servie: SD, moduleName: string | symbol): void;

    /**
     * 서비스이름에 해당하는 서비스를 반환한다.
     *
     * @param {string | symbol} serviceName 서비스명
     * @returns {S} 서비스객체
     */
    provideService (serviceName: string | symbol): S;

}

export default IServiceFactory;
