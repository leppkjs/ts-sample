/**
 * 서비스 최상위 인터페이스이다.
 */
interface IService {
    /**
     * 서비스명칭을 반환한다.
     *
     * @returns {string} 서비스명칭
     */
    getName(): string;
}

export default IService;