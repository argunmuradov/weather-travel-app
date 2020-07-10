import './styles/topbar.scss'
import './styles/main.scss'
import './styles/body.scss'
import './styles/footer.scss'
import {mainFunction} from './js/app'
/* Global Variables */
const button = document.querySelector('button');

button.addEventListener('click', mainFunction);

