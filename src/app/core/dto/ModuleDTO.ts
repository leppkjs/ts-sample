import ComponentDTO from "./ComponentDTO";
import ServiceDTO from "./ServiceDTO";

/**
 * 모듈DTO 이다.
 */
class ModuleDTO {
    /**
     * 생성자이다.
     *
     * @param {string | symbol} name 이름
     * @param {Class} module 모듈객체
     * @param {Array<ComponentDTO>} components 컴포넌트 객체 목록
     * @param {Array<ServiceDTO>} services 서비스 객체 목록
     */
    constructor(
        public name: string | symbol,
        public module: Class,
        public components: Array<ComponentDTO> = [],
        public services: Array<ServiceDTO> = []
    ){}

    /**
     * 객체를 생성하여 반환한다.
     *
     * @param {ModuleDTO} src 원시 객체
     * @returns {ModuleDTO} 생성된 객체
     */
    static create(src: ModuleDTO): ModuleDTO {
        return new ModuleDTO(src.name, src.module,
            (src.components ? src.components.map((value:ComponentDTO, index:number) => ComponentDTO.create(value)) : []),
            (src.services ? src.services.map((value:ServiceDTO, index:number) => ServiceDTO.create(value)) : []));
    }
}

export default ModuleDTO;