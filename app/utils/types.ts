export interface UserSocial {
  title: string;
  link: string;
  color: string;
}

export interface UserType {
  id: number;
  name: string;
  username: string;
  profile: string;
  bio?: string;
  banner?: string;
  socials?: UserSocial[];
}
