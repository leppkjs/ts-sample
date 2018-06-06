import { Container } from 'inversify';
import { IOC_IDS } from './ioc-ids';

/**
 * IOC컨테어너를 통해서 의존 클래스들을 등록한다.
 * 객체를 직접 생성하지 않고 IOC컨테이너에게 위임
 *
 * @type {Container} IOC 컨테이넌
 */
const myContainer = new Container();

export { myContainer };
