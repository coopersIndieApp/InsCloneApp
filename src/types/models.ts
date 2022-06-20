export interface IPost {
  id: string;
  createdAt: string;
  image?: string;
  images?: string[];
  video?: string;
  postSources: string[];
  description?: string;
  user?: IUser;
  nofComments?: number;
  nofLikes?: number;
  comments?: IComment[];
}

export interface IUser {
  id: string;
  username: string;
  image?: string;
  name: string;
  bio?: string;
  posts?: IPost[];
  pronouns?: string;
  link?: string;
}

export interface IComment {
  id: string;
  comment: string;
  user: IUser;
}
