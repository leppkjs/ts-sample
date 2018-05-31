import 'babel-polyfill';
import 'jquery.scrollbar/jquery.scrollbar.css';
import './assets/css/relay_header.css';
import './assets/css/terms.css';
import * as data from './config/config.json';

import {AppBuilder} from './app/core/AppManager';
import TermsModule from './app/term/TermsModule';
import TermsConfig from './app/commons/TermsConfig';
import TService from "./app/term/services/TService";
import TermsComponent from "./app/term/TermsComponent";

//Application Build
new AppBuilder(new TermsConfig(data))
    .setModules({TermsModule})
    .setComponents({TermsModule : [
            TermsComponent,
            TService
        ]})
    .setBaseModuleName("termsModule")
    .build()
    //AppManager bootStrap
    .bootstrap("termsComponent");