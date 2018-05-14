import 'babel-polyfill';
import 'jquery.scrollbar/jquery.scrollbar.css';
import './assets/css/relay_header.css';
import './assets/css/terms.css';
import * as data from './config/config.json';

import {AppBuilder} from './app/core/AppManager';
import TermsModule from './app/commons/TermsModule';
import TermsConfig from './app/commons/TermsConfig';
import TService from "./app/commons/TService";
import TermsComponent from "./app/commons/TermsComponent";

//Application Build
new AppBuilder(new TermsConfig(data))
    .setModules(new TermsModule("termsModule",
        [new TermsComponent("termsComponent")],
        [new TService("tService")]))
    .setBaseModuleName("termsModule")
    .build()
    //AppManager bootStrap
    .bootstrap("termsComponent");