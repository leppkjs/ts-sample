import IAppModule from '../module/IAppModule';

/**
 * 컴포넌트 최상위 인터페이스이다.
 */
interface IComponent {
    /**
     * 컴포넌트 템플릿을 랜더링 한다.
     *
     * @param {IAppModule} renderer 템플릿 랜더러
     */
    rendering (renderer: IAppModule): void;
}

export default IComponent;
