import * as dotenv from "dotenv";
import TransactionSettingsModel from "./Model/TransactionSettingsModel";
import UniSwapRawTransaction from "./Transaction/UniSwapRawTransaction";
console.log("Directory Path:",__dirname);


dotenv.config({ path: __dirname+'/.env' });

console.log('Program is running');
//let buffer =new Buffer.from(process.env.?.toString(), 'hex');
let uniSwapRawTransaction:UniSwapRawTransaction = 
                        new UniSwapRawTransaction(new TransactionSettingsModel(
                            process.env.ADDRESS_FROM,
                            process.env.ADDRESS_TO,
                            Buffer.from(process.env.PRIVATE_KEY!.toString(), 'hex')
                        ));

    uniSwapRawTransaction.SendRawTransaction('123')
                         .then((result)=>{
                             console.log("Transaction Hash => ",result.transactionHash)
                         })
                         .catch((error)=>{
                             console.log("Error => ", error);
                         });