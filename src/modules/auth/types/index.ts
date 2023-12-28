export type Tokens = {
  accessToken: string;
  refreshToken: string;
};

export type PayloadToken = {
  email: string;
};

export type TokenType = 'access' | 'refresh';
