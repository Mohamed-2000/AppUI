export class Category {
  constructor(
    public id: number,
    public parent_Category_Id:number | null,
    public name:string,
    public description: string,
){}
}

