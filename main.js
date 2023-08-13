import './style.css'
import { write } from './svg.js'

document.querySelector('#post-textinput')?.addEventListener('input', (e) => {
  document.querySelector('#post-textoutput').innerHTML = write(e.target.value, '#fff', 5);
});