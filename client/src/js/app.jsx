import React from 'react';
import { render } from 'react-dom';

import 'materialize-loader';
import 'materialize-css'
import 'materialize-css/dist/js/materialize.min';

import App from './components/';
import '../styles/index.scss';

 render(<App />, document.getElementById('app')); 
 