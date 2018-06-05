import {TermsHeader} from "../commons/TermsHeader";
import AbstractComponent from "../core/component/AbstractComponent";
import {applicationContext} from '../core/ApplicationContext';
import {inject, injectable} from "inversify";
import TermsService from "./services/TermsService";

@injectable()
class TermsComponent extends AbstractComponent {
    /**
     * 스토브 공통 컴포넌트 헤더
     */
    private stoveHader: any;

    selector: string = "#app-root";

    templateUrl: string = "TermsComponent.html";

    constructor(@inject(Symbol.for("termsService"))public termsService: TermsService) {
        super();
        console.log("load TermsComponent...");
    }

    init() {
        this.createStoveHeader('#terms-header').render();
        this.termsService.test("ttttt");
    }



    /**
     * 스토브 공통 컴포넌트 헤더를 생성하여 반환한다.
     *
     * @param {string} selector
     * @returns {any} 스토브헤더
     */
    private createStoveHeader(selector: string): any {
        this.stoveHader = new TermsHeader({
            wrapper: selector,
            logo: {
                imagePath: applicationContext.getConfig().getItem("lostark_loggo"),
                title: applicationContext.getConfig().getItem("lostark_tittle"),
                gameTitle: applicationContext.getConfig().getItem("lostark_gametitle")
            },
            userGds: false,
            menuOption: {
                useGameList: false,
                useGameSubMenu: false,
                useClientDownload: false,
                useNotice: false
            }
        });

        return this.stoveHader;
    }
}

export default TermsComponent;