export interface StageInfo {
  salesStage: string;
  active: boolean;
  description: string;
  probability: number;
}

export interface StageInfoResponseData {
  items: StageInfo[];
}

export interface StageInfoResponse {
  data: StageInfoResponseData;
}
