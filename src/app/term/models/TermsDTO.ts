import TermsItemDTO from './TermsItemDTO';

/**
 * 이용약관 데이터객체이다.
 */
class TermsDTO {
    /**
     * 기본생성자이다.
     *
     * @param {string} version 이력버전
     * @param {Array<TermsItemDTO>} terms 약관목록
     */
    constructor (
        public version: string,
        public terms: Array<TermsItemDTO>
    ) {}
}

export default TermsDTO;
