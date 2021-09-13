export interface Reason {
  reasonCode: string;
  description: string;
}

export interface ReasonCodeResponse {
  data: {
    items: Reason[];
  };
}
