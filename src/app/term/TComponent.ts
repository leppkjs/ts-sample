import AbstractComponent from "../core/component/AbstractComponent";
import {injectable} from "inversify";

@injectable()
class TComponent extends AbstractComponent {
    constructor(name: string) {
        super(name);
    }
}

export default TComponent;