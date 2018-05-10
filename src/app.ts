import 'babel-polyfill';
import 'jquery.scrollbar/jquery.scrollbar.css';
import './assets/css/relay_header.css';
import './assets/css/terms.css';
import * as data from './config/config.json';

import {AppBuilder} from './app/core/AppManager';
import TermsModule from './app/commons/TermsModule';
import TermsComponent from './app/commons/TermsComponent';
import TermsConfig from './app/commons/TermsConfig';

//Application Build
new AppBuilder(new TermsConfig(data), new TermsModule(new TermsComponent()))
    .setModules([])
    .setProviders([])
    .build()
    //AppManager bootStrap
    .bootstrap();
