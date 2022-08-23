export class Product {
  constructor(
  public id: number,
  public category_Id:number,
  public vendor_Id:number,
  public en_Name:string,
  public ar_Name: string,
  public price: number,
  public quantity: number,
  public description: string,
  public image: string | null,
){}
}

