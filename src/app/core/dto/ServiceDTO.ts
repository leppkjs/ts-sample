/**
 * 서비스DTO 이다.
 */
class ServiceDTO {
    /**
     * 생성자이다.
     *
     * @param {string | symbol} name 이름
     * @param {Class} service 서비스객체
     */
    constructor (
        public name: string | symbol,
        public service: Class
    ) {}

    /**
     * 객체를 생성하여 반환한다.
     *
     * @param {ServiceDTO} src 원시 객체
     * @returns {ServiceDTO} 생성된 객체
     */
    static create (src: ServiceDTO): ServiceDTO {
        return new ServiceDTO(src.name, src.service);
    }
}

export default ServiceDTO;
