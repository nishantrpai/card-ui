import './style.css'
import { write } from './svg.js'
let signature = '';
let address = '';
let message = '';
const canvas = document.querySelector("canvas");

const signaturePad = new SignaturePad(canvas);

// change pen color to white
signaturePad.penColor = "rgb(255, 255, 255)";

document.querySelector('#post-textinput')?.addEventListener('input', (e) => {
  message = e.target.value;
  document.querySelector('#post-textoutput').innerHTML = write(e.target.value, '#fff', 3);
});

document.querySelector('#post-wallet-address')?.addEventListener('input', (e) => {
  address = e.target.value;
});

document.querySelector('#signature-clear')?.addEventListener('click', (e) => {
  signaturePad.clear();
});

document.querySelector('#signature-save')?.addEventListener('click', (e) => {
  // resize to 100x100
  let data = signaturePad.toDataURL('image/svg+xml');
  signature = data;
  document.querySelector('#signature-output').src = data;
});

document.querySelector('#send-postcard')?.addEventListener('click', (e) => {
  console.log(signature, address, message);
});