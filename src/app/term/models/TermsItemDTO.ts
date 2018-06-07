/**
 * 이용약관 항목 객체이다.
 */
class TermsItemDTO {
    /**
     * 기본 생성자이다.
     *
     * @param {string} id 항목식별자
     * @param {string} name 항목이름
     * @param {string} contents 항목내용
     */
    constructor (
        public id: string,
        public name: string,
        public contents: string
    ) {}
}

export default TermsItemDTO;
