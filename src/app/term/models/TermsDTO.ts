import TermsItemDTO from './TermsItemDTO';

class TermsDTO {
    constructor (
        public version: string,
        public terms: Array<TermsItemDTO>
    ) {}
}

export default TermsDTO;
