export enum TaskCategory {
    DEFAULT= "default",
    STUDY = "studyTaskData",
    HOUSEWORK="houseworkTaskData",
    SPORT="sportTaskData"
}

export type StudyTaskItem = {
    taskID: string,
    date: string,
    startTime: string,
    endTime: string,
    content: string,
    point: number,
    uploadList: string[]
}

export enum StudyTaskField {
    DATE = "date",
    STARTTIME = "startTime",
    ENDTIME = "endTime",
    CONTENT = "content",
    UPLOADLIST = "uploadList",
    POINT = "point",
}

export type HouseworkTaskItem = {
    taskID: string,
    title: string,
    point: number,
    uploadList: string[]
}

export enum HouseworkTaskFiled {
    TITLE = "title",
    POINT = "point",
    UPLOADLIST = "uploadList"
}

export type SportTaskItem = {
    taskID: string,
    title: string,
    point: number,
    uploadList: string[]
}

export enum SportTaskFiled {
    TITLE = "title",
    POINT = "point",
    UPLOADLIST = "uploadList"
}

export enum TaskStatus {
    CREATED = "created",
    INPROGRESS = "in progress",
    REVIEW = "review",
    APPROVED = "approved",
    FAILED = "failed",
}
export enum TaskStatusMapping {
    created = "已创建",
    inProgress = "审核中",
    review = "待审核",
    approved = "已审核",
    failed = "审核失败"
}

export type TaskItemBase = {
    task_id: string
    category: string
    point: string
    status: string
    content: string
    body: string
    remark: string,
    create_time: string,
    attach_list: string
}

export type TaskWorkerRecord = {
    user_id: string,
    nickname: string,
    remark: string,
    task_id: string,
    content: string,
    create_time: string,
    status: string,
    category: string
}