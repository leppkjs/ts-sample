import AbstractService from "../../core/service/AbstractService";
import {injectable} from "inversify";

@injectable()
class TermsService extends AbstractService{
    constructor() {
        super();
        console.log("load TService");
    }

    test(name: string): void {
        console.log(name);
    }
}

export default TermsService;