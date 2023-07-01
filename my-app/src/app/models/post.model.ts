export class Post {
    _id!: string;
    content!: string;
    attachments!: Array<{ name: string, file: ArrayBuffer }>;
    creator!: string; 
    thread!: string; 
    upvotes!: number;
    downvotes!: number;
    voters!: string[]; 
    hidden!: boolean;
    createdAt!: Date;
}

