export class Course {
    _id: string;
    name: string;
    subjects: string[];
    
    constructor(_id: string, name: string, subjects: string[]) {
      this._id = _id;
      this.name = name;
      this.subjects = subjects;
    }
  }
  