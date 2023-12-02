export type User = {
  id: number;
  name: string;
  email: string;
};

export type UserState = {
  users: User[];
  isLoading: boolean;
  error: null | string;
};
