export class Thread {
  _id?: string;
  title: string;
  content: string;
  attachments: { name: string, file: ArrayBuffer }[];
  tags: string[];
  creator: string; 
  posts: string[];  
  hidden: boolean;
  course: string;  
  subject: string;  
  createdAt?: Date;

  constructor(title: string, content: string, creator: string, hidden: boolean, course: string, subject: string, attachments: { name: string, file: ArrayBuffer }[] = [], tags: string[] = [], posts: string[] = [], _id?: string, createdAt?: Date) {
    this.title = title;
    this.content = content;
    this.creator = creator;
    this.hidden = hidden;
    this.course = course;
    this.subject = subject;
    this.attachments = attachments;
    this.tags = tags;
    this.posts = posts;
    this._id = _id;
    this.createdAt = createdAt;
  }
}