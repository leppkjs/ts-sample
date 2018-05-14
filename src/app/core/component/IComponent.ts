/**
 * 컴포넌트 최상위 인터페이스이다.
 */
interface IComponent {
    /**
     * 컴포넌트 명칭을 반환한다.
     *
     * @returns {string} 검포넌트 명칭
     */
    getName(): string;

    /**
     * 컴포넌트 템플릿을 랜더링 한다.
     *
     * @param {Function} renderer 템플릿 랜더러
     */
    rendering(renderer: Function): void;
}

export default IComponent;