type TUser = {
  ID: string;
  Username: string;
  Email: string;
  Password: string;
  IsActive: boolean;
};

type TUserResult = {
  Corrects: number;
  Wrongs: number;
  Time: number;
  PlayerID: string;
};
