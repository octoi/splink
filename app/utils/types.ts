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
}

export interface PostType {
  id: number;
  userId: number;
  user: UserType;
  link: string;
  caption?: string;
  createdAt: string;
}
