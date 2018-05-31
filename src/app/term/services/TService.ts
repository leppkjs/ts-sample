import AbstractService from "../../core/service/AbstractService";
import {injectable} from "inversify";

@injectable()
class TService extends AbstractService{
    constructor(name: string) {
        super(name);
    }

    test(name: string): void {
        console.log(name);
    }
}

export default TService;