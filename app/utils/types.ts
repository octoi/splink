export interface UserSocial {
  title: string;
  link: string;
  bgColor: string;
  textColor: string;
}

export interface UserType {
  id: number;
  name: string;
  username: string;
  profile: string;
  bio?: string;
  banner?: string;
  socials?: string; // json data of UserSocial[]
  Post?: PostType[];
}

export interface PostType {
  id: number;
  userId: number;
  user: UserType;
  link: string;
  caption?: string;
  createdAt: string;
  Comment?: PostComment[];
}

export interface PostComment {
  id: number;
  userId: number;
  postId: number;
  user: UserType;
  post: PostType;
  comment: string;
  createdAt: string;
}
