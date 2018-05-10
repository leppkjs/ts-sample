abstract class AbstractComponent {
    /**
     * 렌더링 대상 셀렉터
     */
    selector: string;
    /**
     * 템플릿 주소
     */
    templateUrl: string;

    /**
     * 템플릿
     */
    template: string;

    /**
     * 스타일 주소 목록
     */
    styleUrl: Array<string> = [];

    /**
     * 서비스 목록
     */
    services: Array<any> = [];

    /**
     * 랜더링 이후 컴포넌트가 초기화 시킨다.
     */
    init(): void {
        //throw new Error("Method not implemented.");
    }

    /**
     * 랜더링 전처리
     */
    beforeRender(): void {
        //throw new Error("Method not implemented.");
    };

    /**
     * 랜더링 후처리
     */
    afterRender(): void {
        //throw new Error("Method not implemented.");
    };

    /**
     * 컴포넌트 템플릿을 랜더링 한다.
     *
     * @param {Function} renderer 템플릿 랜더러
     */
    rendering(renderer: Function): void {
        try {
            this.beforeRender();
        } catch(e) {
            //전처리는 랜더링 부수적 기능으로 간주하여 에러로그로만 처리하고 전체흐름에 영향을 없게 한다.
            console.error("Exception to beforeRender", e);
        }

        try{
            renderer(this.selector, this.template);
        } catch(e) {
            console.error("Exception to rendering Component!!!", e)
            throw new e;
        } finally {
            try {
                this.afterRender();
            } catch(e) {
                //후처리는 랜더링 부수적 기능으로 간주하여 에러로그로만 처리하고 전체흐름에 영향을 없게 한다.
                console.error("Exception to afterRender", e);
            }
        }

        this.init();
    }
}

export default AbstractComponent;