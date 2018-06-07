import IService from '../core/service/IService';
import AbstractModule from '../core/module/AbstractModule';
import IComponent from '../core/component/IComponent';
import { injectable } from 'inversify';
import { applicationContext } from '../core/ApplicationContext';

/**
 * Terms Application Module Implements
 */
@injectable()
class TermsModule extends AbstractModule {
    /**
     * 기본 생성자이다.
     */
    constructor () {
        super();
        if(console && console.log) {
            console.log('load TermsModule');
        }
    }

    /**
     * 부트스트랩 컴포넌트를 적재한다.
     *
     * @param {string | symbol} bootstrapComponent
     */
    public load (bootstrapComponent: string | symbol): void {
        applicationContext.provideComponent(bootstrapComponent).rendering(this);
    }

    /**
     * 화면에 렌더링 한다.
     *
     * @param {string} selector
     * @param {string} templateUrl
     */
    public renderer (selector: string, templateUrl: string): void {
        this.rendererToTemplateUrl(selector, `/template/${templateUrl}`);
    }

    /**
     * 템플릿URL을 로드해서 렌더링 한다.
     *
     * @param {string} selector
     * @param {string} templateUrl
     */
    private rendererToTemplateUrl (selector: string, templateUrl: string): void {
        const link: HTMLLinkElement = document.createElement('link');
        link.rel = 'import';
        link.href = templateUrl;
        link.setAttribute('async', '');

        link.onload = (event: Event) => {
            console.log('load complete Template...');
            const template = link.import.querySelector('template');
            const clone = document.importNode(template.content, true);
            document.querySelector(selector).appendChild(clone);
        };

        link.onerror = (errorEvent: ErrorEvent) => {
            console.log(`[ERROR] load resource(${templateUrl}) cause : ${errorEvent.message}`);
        };

        document.head.appendChild(link);
    }

}

export default TermsModule;
