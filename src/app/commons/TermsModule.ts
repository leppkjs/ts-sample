import IAppModule from '../core/IAppModule';
import AbstractComponent from '../core/AbstractComponent';

/**
 * Terms Application Module Implements
 */
class TermsModule implements IAppModule {
    /**
     * 이용약관 컴포넌트
     */
    private components: Array<AbstractComponent> = [];

    private bootstrapComponents: AbstractComponent;

    /**
     * 기본 생성자이다.
     *
     */
    constructor(component: AbstractComponent) {
        console.log("load TermsModule");
        this.bootstrapComponents = component;
    }

    /**
     * 부트스트랩 컴포넌트를 적재한다.
     */
    public load(): void {
        this.bootstrapComponents.rendering(this.renderer);
    }

    /**
     *
     * @param {string} selector
     * @param {string} template
     */
    private renderer(selector: string, template: string): void {
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