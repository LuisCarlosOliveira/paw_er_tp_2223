export class Subject {
  _id?: string;
  name: string;
  courses?: string[];

  constructor(name: string, _id?: string, courses?: string[]) {
    this.name = name;
    this._id = _id;
    this.courses = courses;
  }
}