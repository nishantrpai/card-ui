import './style.css'
import { write } from './svg.js'
let signature = '';
let address = '';
let message = '';
const canvas = document.querySelector("canvas");
let JSON_RPC = 'http://127.0.0.1:8545';
let contract;

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

document.querySelector('#send-postcard')?.addEventListener('click', async (e) => {
  // ethers contract get signer and send transaction
  console.log(signature, address, message);
  const provider = new ethers.JsonRpcProvider(JSON_RPC);
  // not real addresses, spawned using hardhat
  const wallet = new ethers.Wallet('0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80', provider);
  const tx = await contract.connect(wallet).mint(address, signature, message);
  await tx.wait();
  console.log("Card minted successfully");
});

// on load fetch stamp from contract
window.addEventListener('load', async () => {
  // ethers contract
  // get query params from link
  const urlParams = new URLSearchParams(window.location.search);
  
  const provider = new ethers.JsonRpcProvider(JSON_RPC);
  contract = new ethers.Contract('0x5FbDB2315678afecb367f032d93F642f64180aa3', [
    'function getCurrentStamp() public view returns (string memory)',
    'function mint(address, string memory, string memory) public returns (bool)',
  ], provider);
  console.log(contract);
  const stamp = await contract.getCurrentStamp();
  document.querySelector('#stamp').src = stamp;
});

/**
 * TODO: Add mint option and sign options
 */
