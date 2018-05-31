import {TermsHeader} from "../commons/TermsHeader";
import AbstractComponent from "../core/component/AbstractComponent";
import {applicationContext} from '../core/ApplicationContext';
import {inject, injectable} from "inversify";
import {TYPES} from "../../test/types";
import TService from "./services/TService";

@injectable()
class TermsComponent extends AbstractComponent {
    /**
     * 스토브 공통 컴포넌트 헤더
     */
    private stoveHader: any;

    selector: string = "#app-root";

    template: string = `
                        <div>
                            <div id="terms-header"></div>
                            <div id="terms-content" class="S terms-wrapper">
                                <div id="term-tabs" class="S terms-category is-desktop type-01">
                                    <a href="#" data-type="01" class="S terms-category__item terms-category__item--active">&nbsp;</a>
                                </div>
                                
                                <div class="S terms-selectbox is-mobile is-fixed">
                                    <div class="S terms-selectbox__inner">
                                        <strong class="S terms-selectbox__text"><!-- terms title --></strong>
                                        <select id="term-select" class="S terms-selectbox__control">
                                            <option value="">&nbsp;</option>
                                        </select>
                                    </div>
                                </div>
                                
                                <div class="S terms-content">
                                    <div class="S terms-content__header">
                                        <h1 class="S terms-content__title"><!-- terms title --></h1>
                                        <span class="S terms-content__time">수정 날짜 : <!-- date --></span>
                                        <div class="S terms-content__selectbox">
                                            <strong class="S terms-content__selectbox__text">이전버전 보기</strong>
                                            <select class="S terms-content__selectbox__control">
                                            </select>
                                        </div>
                                    </div>
                                    <div id="terms-content__body" class="S terms-content__body">
                                        <a href="/Terms">root</a>
                                        <a href="/Terms/email/test/settings/">email</a>
                                        <a href="/Terms/email/test/settings/dddd">email-option</a>
                                    </div>
                                </div>
                            </div>
                        </div>`;

    constructor(name: string, @inject(TYPES.Weapon)tservice:TService) {
        super(name);
        console.log("load TermsComponent...");
    }

    init() {
        this.createStoveHeader('#terms-header').render();
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