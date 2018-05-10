import jquery from 'jquery';
import { Header } from 'stove-cafe-component/src/component/pc/GNB/view/Header';
import { querySelector } from 'stove-cafe-component/src/component/pc/GNB/util/utill';

export class TermsHeader extends Header {
    constructor(options = {}) {
        options.gnbClass = 'S';
        options.menuOption = {
            useGameList : false,
            useGameSubMenu : false
        };
        super(options);
    }
    
    createElement(template) {
        let stoveHeader = document.createElement('div');
        stoveHeader.className = `${this.stoveGnbData.gnbClass} header--main stoveHeader ${this.stoveGnbData.bgClass ? this.stoveGnbData.bgClass : ''}`;
        stoveHeader.insertAdjacentHTML('afterbegin', template);
        
        if (this.stoveGnbData.wrapper && querySelector(this.stoveGnbData.wrapper)) {
            let wrapperElement = querySelector(this.stoveGnbData.wrapper);
            wrapperElement.insertBefore(stoveHeader, wrapperElement.firstElementChild);
        }
        else {
            let bodyElement = querySelector('body');
            bodyElement.insertBefore(stoveHeader, bodyElement.firstElementChild);
        }
        
        this.$element = jquery('div');
    }
    
    getTemplate() {
        let gnbData = this.stoveGnbData;
        let {logo} = gnbData;
        
        return `<div class="S stoveHeader__inner">
            <hgroup class="S">
			    <h1 class="S">
			        <a class="S stoveHeader__logo" href="#"><img src="${logo.imagePath}" alt="${logo.gameTitle}"></a>
			    </h1>
            </hgroup>
            <div class="S stoveHeader__title">${logo.title}</div>
            ${gnbData.menuOption.useGameList ? (`<div class="game"></div>`) : ``}
            ${gnbData.menuOption.useGameSubMenu ? (`<div class="game--sub"></div>`) : ``}
            <nav class="${this.stoveGnbData.gnbClass} nav nav--utill"></nav>
        </div>`;
    }
}