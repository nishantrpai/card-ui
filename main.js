import './style.css'
import { write } from './svg.js'

const canvas = document.querySelector("canvas");

const signaturePad = new SignaturePad(canvas);

// change pen color to white
signaturePad.penColor = "rgb(255, 255, 255)";

document.querySelector('#post-textinput')?.addEventListener('input', (e) => {
  document.querySelector('#post-textoutput').innerHTML = write(e.target.value, '#fff', 3);
});


document.querySelector('#signature-clear')?.addEventListener('click', (e) => {
  signaturePad.clear();
});