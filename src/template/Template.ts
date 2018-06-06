const html = `<div id="term-tabs" class="S terms-category is-desktop type-01">
</div>

<div class="S terms-selectbox is-mobile is-fixed">
    <div class="S terms-selectbox__inner">
        <strong class="S terms-selectbox__text"><!-- terms title --></strong>
        <select id="term-select" class="S terms-selectbox__control">
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
    </div>
</div>`;

export { html };
