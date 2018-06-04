import IService from "./IService";
import {injectable} from "inversify";

/**
 * 서비스의 추상클래스이다.
 */
@injectable()
abstract class AbstractService implements IService {

}

export default AbstractService;