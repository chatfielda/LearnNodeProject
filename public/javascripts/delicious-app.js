import '../sass/style.scss';

import { $, $$ } from './modules/bling';
import autocompete from './modules/autocomplete';
import autocomplete from './modules/autocomplete';

autocomplete( $('#address'), $('#lat'), $('#lng') );