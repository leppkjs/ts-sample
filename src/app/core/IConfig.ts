/**
 * 환경정보 인터페이스이다.
 */
interface IConfig {
    /**
     * 
     * @param {string} key
     * @returns {any}
     */
    getItem(key: string): any;

    /**
     *
     * @param {string} key
     * @param value
     */
    setItem(key: string, value: any): void;
}

export default IConfig;