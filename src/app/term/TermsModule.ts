import IService from "../core/service/IService";
import AbstractModule from "../core/module/AbstractModule";
import IComponent from "../core/component/IComponent";
import {injectable} from "inversify";

/**
 * Terms Application Module Implements
 */
@injectable()
class TermsModule extends AbstractModule<IComponent, IService> {
    /**
     * 기본 생성자이다.
     *
     * @param {string} name 컴포넌트명칭
     * @param {Array<IComponent>} components 컴포넌트목록
     * @param {Array<IService>} services 서비스목록
     */
    constructor(name:string, components: Array<IComponent>, services: Array<IService>) {
        super(name, components, services);
        console.log("load TermsModule");
    }

    /**
     * 부트스트랩 컴포넌트를 적재한다.
     */
    public load(bootstrapComponent: string): void {
        if(!this.components.has(bootstrapComponent)) {
            throw new Error(`not exist ${bootstrapComponent} Component`);
        }
        this.components.get(bootstrapComponent).rendering(this.renderer);
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