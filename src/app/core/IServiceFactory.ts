/**
 * 서비스팩토리 인터페이스이다.
 */
interface IServiceFactory<T> {
    /**
     * 서비스를 등록한다.
     *
     * @param {string} serviceName 서비스명
     * @param {T} servie 서비스객체
     */
    registerService(serviceName: string, servie:T): void;

    /**
     * 서비스이름에 해당하는 서비스를 반환한다.
     *
     * @param {string} serviceName 서비스명
     * @returns {T} 서비스객체
     */
    provideService(serviceName: string): T;

}

export default IServiceFactory;