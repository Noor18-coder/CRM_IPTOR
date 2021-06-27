export interface StageInfo {
    salesStage:string,
    active:boolean,
    description: string,
    probability:number
}

export interface StageInfoResponse {
        items: StageInfo[]
}