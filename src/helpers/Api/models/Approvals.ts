export interface InitiateSubmitApprovalPopupData {
  defaultApprover: string;
  salesStage: string;
  levelId: number;
  opportunityId: string;
  approvalLogStatus: string;
  approver: string;
}

export interface ApprovalLogAddRequestParams {
  approver: string;
  opportunityId: string;
  salesStage: string;
  levelId: number;
  user: string;
  approvalLogStatus: string;
}

export interface ApprovalLogAddResponse {
  approver: string;
  opportunityId: string;
  salesStage: string;
  levelId: number;
  user: string;
  approvalLogStatus: string;
  approvalLogId: string;
  messages?: ErrorMessage[];
}

export interface ErrorMessage {
  type: string;
  id: string;
  key: string;
  field: string;
  text: string;
}

export interface ApprovalLogErrors {
  messages: ErrorMessage[];
  error: {
    code: number;
    message: string;
  };
}

export interface ApprovalLogsDefault {
  approvalLogId: string;
  opportunity: string;
  user: string;
  salesStage: string;
  levelId: number;
  approver: string;
  approvalLogStatus: string;
  userDescription?: string;
  userRole?: string;
}

export interface ApprovalLogsData {
  logs: ApprovalLogsDefault[], 
  error: string,
}

export interface ApprovalLogsParams {
  opportunityId: string;
}

export interface ApprovalLogsResponse {
  data: {
    items: ApprovalLogsDefault[];
  };
}

export interface StageGroupList {
  group: string;
  items: ApprovalLogsDefault[];
}

export interface AllNotesDefault {
  noteId: string;
  creationDate: string;
  parentFile: string;
  parentId: string;
  author: number;
  text: string;
  changedDate: string;
  changedTime: string;
  changedBy: string;
}

export interface AllNotesParams {
  parentFile: string;
  parentId: string;
}

export interface DeleteApprovalLogsParams {
  opportunityId?: string;
  approvalLogId?: string;
}

export interface AllNotesResponse {
  data: {
    items: AllNotesDefault;
  };
}
