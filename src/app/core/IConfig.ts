/**
 * 환경정보 인터페이스이다.
 */
interface IConfig {
    /**
     * 항목을 반환한다.
     * @param {string} key
     * @returns {any}
     */
    getItem (key: string): any;

    /**
     * 항목을 설정한다.
     *
     * @param {string} key
     * @param value
     */
    setItem (key: string, value: any): void;
}

export default IConfig;
