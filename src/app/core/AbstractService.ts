import IService from "./IService";

/**
 * 서비스의 추상클래스이다.
 */
abstract class AbstractService implements IService {
    /**
     * 서비스명칭
     */
    private readonly name: string;

    /**
     * 기본 생성자이다.
     *
     * @param {string} name
     */
    constructor(name: string) {
        this.name = name;
    }

    /**
     *
     * @returns {string}
     */
    getName(): string {
        return this.name;
    }
}

export default AbstractService;