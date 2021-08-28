export default class TransactionSettingsModel{

    public AddressFrom?:string;
    public AddressTo?:string;
    public PrivateKey?:Buffer;

    constructor(addressFrom?:string, addressTo?:string, privateKey?:Buffer){
        this.AddressFrom=addressFrom;
        this.AddressTo=addressTo;
        this.PrivateKey = privateKey;

    }
}