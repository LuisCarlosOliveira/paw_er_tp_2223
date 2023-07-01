export interface Thread {
    _id?: string;
    title: string;
    content: string;
    attachments: { name: string, file: Blob }[];
    tags: string[];
    creator: string; 
    posts: string[];  
    hidden: boolean;
    course: string;  
    subject: string;  
    createdAt?: Date;
  }
  