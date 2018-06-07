import AbstractComponent from '../core/component/AbstractComponent';
import { injectable } from 'inversify';

/**
 * 테스트용
 */
@injectable()
class TComponent extends AbstractComponent {
    constructor () {
        super();
        console.log('load TComponent');
    }
}

export default TComponent;
