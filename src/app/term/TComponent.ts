import AbstractComponent from '../core/component/AbstractComponent';
import { injectable } from 'inversify';

@injectable()
class TComponent extends AbstractComponent {
    constructor () {
        super();
        console.log('load TComponent');
    }
}

export default TComponent;
