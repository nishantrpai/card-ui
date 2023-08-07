import './style.css'
import { write } from './svg.js'
document.querySelector('#message').addEventListener('input', (e) => {
  // add svg to preview
  let svg = write(e.target.value, '#fff', 1, 1, 5);
  document.querySelector('#preview').innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 187" width="400">
      <rect xmlns="http://www.w3.org/2000/svg" x="0" y="0" width="100%" height="100%" fill="#000"/>
      ${svg}
    </svg>
    `
});