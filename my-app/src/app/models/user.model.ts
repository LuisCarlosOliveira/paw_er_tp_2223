export class User {
    _id: string;
    username: string;
    role: string;
    isBlocked: boolean;
  
    constructor(_id: string, username: string, role: string, isBlocked: boolean) {
      this._id = _id;
      this.username = username;
      this.role = role;
      this.isBlocked = isBlocked;
    }
  }
  