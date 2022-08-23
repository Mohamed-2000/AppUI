export class Order {
  constructor(
    public id: number,
    public total_Price:number,
    public shipping_Address:string,
    public payment_Method: string,
    public customer_Id: number,

){}
}


