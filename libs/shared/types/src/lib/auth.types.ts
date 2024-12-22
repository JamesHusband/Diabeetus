export interface LoginResponse {
  status: number;
  data: {
    authTicket: {
      token: string;
      expires: number;
      duration: number;
    };
    user: {
      id: string;
      firstName: string;
      lastName: string;
      country: string;
      email: string;
    };
  };
}

export interface AuthTicket {
  token: string;
  expires: number;
  duration: number;
}
