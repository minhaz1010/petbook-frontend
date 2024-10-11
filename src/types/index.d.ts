export interface ISuccessfulResponse<T> {
  success: boolean;
  statusCode: number;
  message: string;
  data: T; 
}

export interface IErrorResponse {
  success: boolean;
  message: string;
  errorMessages: ErrorMessage[];
}

export interface ErrorMessage {
  path: string;
  message: string;
}

export interface IAuthor {
  _id: string;
  userName: string;
  userId:string;
  email:string;
  imageURL: string;
}

export interface IImageOption {
    public_id:string;
    secure_url:string
}

export type TComments = IComment[];

export interface IComment {
  _id:string;
  content: string;
  author: Schema.Types.ObjectId;
  post: Schema.Types.ObjectId;
  likes: number;
  dislikes: number;
}


export interface IPost {
  _id:string
  title: string;
  content: string;
  petType: string;
  image: IImageOption[];
  postType: "TIP" | "STORY";
  author: IAuthor;
  isPremium: boolean;
  likes: number;
  dislikes: number;
  likedBy:string[];
  dislikedBy:string[];
}


export interface IComment {
  _id:string;
  content:string;
  author:string;
  post:string
}

export interface IUSer {
  _id: string
  userId: string
  userName: string
  fullName: string
  email: string
  imageURL: string
  posts: IPost[]
  followers: string[]
  followings: string[]
  membership: string
  role: string
}