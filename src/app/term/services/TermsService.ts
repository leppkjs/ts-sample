import AbstractService from "../../core/service/AbstractService";
import {injectable} from "inversify";
import TermsDTO from "../models/TermsDTO";
import TermsItemDTO from "../models/TermsItemDTO";

@injectable()
class TermsService extends AbstractService{
    constructor() {
        super();
        console.log("load TService");
    }

    test(name: string): void {
        console.log(name);
    }

    getTerms(service: string, type: string, version: string, coutry: string, lang: string): TermsDTO {
        console.log("parameter : ", service, type, version, coutry, lang);
        return new TermsDTO("20170101", [new TermsItemDTO("01","이용약관", "test")])
    }

    getTermsHist(service: string, coutry: string, lang: string): Array<string> {
        console.log("parameter : ", service, coutry, lang);
        return ['20171010', '20170130', '20161010'];
    }
}

export default TermsService;