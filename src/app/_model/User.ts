export class User {
    constructor(
      public FirstName:string,
      public LastName:string,
      public email:string,
    public userName:string,
    public password:string,
    public dob ?: Date
    ) { }

}
