export interface AddNotesRequestParam {
  parentFile: string;
  parentId: string;
  text: string;
}

export interface AddNotesResponse {
  nodeId: string;
}
