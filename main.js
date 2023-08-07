import './style.css'
import { write } from './svg.js'
document.querySelector('#message').addEventListener('input', (e) => {
  // add svg to preview
  let words = e.target.value.split(' ');
  let width = 102;
  let y = 50;
  console.log(words);
  let svg = '';
  words.forEach((word, i) => {
    svg += write(word, '#fff', 1, 1, y);
    y += 10;
    width += 10;
  });
  document.querySelector('#preview').innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 ${width}" width="500">
      <rect xmlns="http://www.w3.org/2000/svg" x="0" y="0" width="100%" height="100%" fill="#000"/>
      ${svg}
    </svg>
    `
});