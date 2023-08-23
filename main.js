import './style.css'
import { write } from './svg.js'
let signature = '';
let address = '';
let message = '';
const canvas = document.querySelector("canvas");
let JSON_RPC = 'http://127.0.0.1:8545';

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

// on load fetch stamp from contract
window.addEventListener('load', async () => {
  // ethers contract
  const provider = new ethers.JsonRpcProvider(JSON_RPC);
  const contract = new ethers.Contract('0x5FbDB2315678afecb367f032d93F642f64180aa3', [
    'function getCurrentStamp() public view returns (string memory)',
  ], provider);
  const stamp = await contract.getCurrentStamp();
  console.log(stamp);
  document.querySelector('#stamp').src = stamp;
});