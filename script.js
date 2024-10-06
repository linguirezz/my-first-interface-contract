// TODO : BUAT BLOCK AWAIT
import  {ethers, providers}  from "./ethers-5.6.esm.min.js" 
import {abi,address} from "./contract.js"
const windowEthers = window.ethereum
const provider = new ethers.providers.Web3Provider(windowEthers)
const signer=  provider.getSigner()
const contract = new ethers.Contract(address,abi,signer)
// connect Btn
const connectBtn = document.getElementById("connect")
let isConnected
connectBtn.innerText = typeof isConnected !== undefined ? "connected":"connect"
connectBtn.onclick = async ()=>{ 
    isConnected = await connect()
}
const fundBtn = document.getElementById("fund")
const input = document.getElementById("input amount")
const ethInput = input.value
fundBtn.innerText = "fund"
fundBtn.onclick = ()=>{
    fund(ethInput.toString)
}
const withDrawBtn = document.getElementById("withdraw")
withDrawBtn.innerText = "withdraw"
withDrawBtn.onclick =  ()=>{
     withDraw()
}
const getBalanceBtn = document.getElementById("balance")
const amountText = document.getElementById("amount")
getBalanceBtn.innerText = "get balance"
getBalanceBtn.onclick = ()=>{
    getAmount()
}




async function connect(){
    console.log("click!")
    if(typeof(windowEthers) !== undefined){
        console.log("try to connect")
        const isConnected = await ethereum.request({method:"eth_requestAccounts"})
        console.log(isConnected)
        console.log("you are connected")
        return isConnected
    }
    else{
        console.log("please install your metamask")
    }
}
async function fund(Amount){
    try {
        if (typeof(windowEthers) !== undefined) {
            const ethAmount = ethers.utils.parseEther(Amount.toString())
            console.log("funding start..") 
            const response = await contract.fund({value:ethAmount})
        console.log("funding succes")
        input.value = ""
        } else {
            console.log("please install your metamask")
        }
    } catch (error) {
        console.error(error)
    }
}
async function withDraw(){
    try {
        if (typeof(windowEthers) !== undefined) {
           await  contract.withdraw()
        } else {
            console.log("please install your metamask eth")
        }  
    } catch (error) {
        console.error(error)
    }
}
async function getAmount(){
    try {
        if (typeof(windowEthers) !== undefined) {
            const contractBalance = await provider.getBalance(address)
            const ethersAmount = ethers.utils.formatEther(contractBalance)
            console.log(ethersAmount)
            amountText.innerText = ethersAmount.toString()
        } else {
            console.log("please install your metamask eth")
        }
    } catch (error) {
        console.error(error)
    }
}