import Web3 from "web3";
const Tx = require('ethereumjs-tx').Transaction;
import TransactionSettingsModel from "../Model/TransactionSettingsModel"
import TransactionDataModel from "../Model/TransactionDataModel";


export default class UniSwapRawTransaction{
    private readonly web3;
    private readonly transactionSettings:TransactionSettingsModel;
    constructor(transactionSettings:TransactionSettingsModel){
        // connect to Infura node
        const infuraProvider = new Web3.providers.HttpProvider(process.env.INFURA_APIURL?.toString()!);
        //Initiate Web3
        this.web3=new Web3(infuraProvider);
        // Apply Addresses & Private Keys
        this.transactionSettings=transactionSettings;


    }

    private ConstructTransactionData=(etherValue?:string)=>{

        try {
            let transactionData=new TransactionDataModel();
            transactionData.GasLimit=this.web3.utils.toHex(25000);
            transactionData.GasPrice=this.web3.utils.toHex(10e9);
            transactionData.To=this.transactionSettings.AddressTo;
            transactionData.From=this.transactionSettings.AddressFrom;
            transactionData.Value=this.web3.utils.toHex(this.web3.utils.toWei(etherValue!,'wei'));

            return transactionData;



        } catch (error) {
            
            throw error;
        }

    }

    public SendRawTransaction=async(etherValue?:string)=>{

        try {

            const transationData:TransactionDataModel=this.ConstructTransactionData(etherValue);
            const transactionCount:number=await this.web3.eth.getTransactionCount(this.transactionSettings.AddressFrom!);
            const newNonce:string=this.web3.utils.toHex(transactionCount);
            const transaction=new Tx(
                {
                    gasLimit:transationData.GasLimit,
                    gasPrice:transationData.GasPrice,
                    to:transationData.To,
                    nonce:newNonce
                },
                {
                    chain:'rinkeby'
                }
            );

            transaction.sign(this.transactionSettings.PrivateKey!);
            const serializedTransaction=transaction.serialize().toString('hex');
 
            return this.web3.eth.sendSignedTransaction('0x' + serializedTransaction);
            
        } catch (error) {
            
            throw error;
        }
    }
}