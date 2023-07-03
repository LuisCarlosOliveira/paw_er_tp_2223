export class Post {
    _id: string;
    content: string;
    attachments: Array<{ name: string, file: ArrayBuffer }>;
    creator: string; 
    thread: string; 
    upvotes: number;
    downvotes: number;
    voters: string[]; 
    hidden: boolean;
    createdAt: Date;

    constructor(_id: string, content: string, creator: string, thread: string, upvotes: number, downvotes: number, hidden: boolean, createdAt: Date, attachments: Array<{ name: string, file: ArrayBuffer }> = [], voters: string[] = []) {
      this._id = _id;
      this.content = content;
      this.attachments = attachments;
      this.creator = creator;
      this.thread = thread;
      this.upvotes = upvotes;
      this.downvotes = downvotes;
      this.voters = voters;
      this.hidden = hidden;
      this.createdAt = createdAt;
    }
}

