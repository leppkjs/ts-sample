/**
 * 컴포넌트DTO 이다.
 */
class ComponentDTO {
    /**
     * 생성자이다.
     *
     * @param {string | symbol} name 이름
     * @param {Class} component 컴포넌트객체
     */
    constructor (
        public name: string | symbol,
        public component: Class
    ) {}

    /**
     * 객체를 생성하여 반환한다.
     *
     * @param {ComponentDTO} src 원시 객체
     * @returns {ComponentDTO} 생성된 객체
     */
    static create (src: ComponentDTO): ComponentDTO {
        return new ComponentDTO(src.name, src.component);
    }
}

export default ComponentDTO;
