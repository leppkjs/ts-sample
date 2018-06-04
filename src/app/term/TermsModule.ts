import IService from "../core/service/IService";
import AbstractModule from "../core/module/AbstractModule";
import IComponent from "../core/component/IComponent";
import {injectable} from "inversify";
import {applicationContext} from "../core/ApplicationContext";

/**
 * Terms Application Module Implements
 */
@injectable()
class TermsModule extends AbstractModule {
    /**
     * 기본 생성자이다.
     */
    constructor() {
        super();
        console.log("load TermsModule");
    }

    /**
     * 부트스트랩 컴포넌트를 적재한다.
     */
    public load(bootstrapComponent: string | symbol): void {
        applicationContext.provideComponent(bootstrapComponent).rendering(this.renderer);
    }

    /**
     *
     * @param {string} selector
     * @param {string} template
     */
    private renderer(selector: string, template: string): void {
        //TODO template urls 를 받아서         const unit = await import("./dddddd");
        document.querySelector(selector).innerHTML = template;
    }

    /**
     *
     * @param {string} selector
     * @param {string} templateUrl
     */
    private rendererToTemplateUrl(selector: string, templateUrl: string): void {
        const link = document.createElement('link');
        link.rel = 'import';
        link.href = templateUrl;
        link.setAttribute('async', '');

        link.onload = () => {
            console.log("load complete Template...");
            const template = link.import.querySelector('template');
            const clone = document.importNode(template.content, true);
            document.querySelector(selector).appendChild(clone);
        };
        document.head.appendChild(link);
    }

};

export default TermsModule;