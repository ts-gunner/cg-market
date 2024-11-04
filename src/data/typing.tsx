export enum TaskCategory {
    DEFAULT= "default",
    STUDY = "studyTaskData",
    HOUSEWORK="houseworkTaskData",
    SPORT="sportTaskData"
}

export type StudyTaskItem = {
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
    UPLOADLIST = "uploadList"
}

export type HouseworkTaskItem = {
    title: string,
    point: number,
    uploadList: string[]
}

export enum HouseworkTaskFiled {
    TITLE = "title",
    UPLOADLIST = "uploadList"
}

export type SportTaskItem = {
    title: string,
    point: number,
    uploadList: string[]
}

export enum SportTaskFiled {
    TITLE = "title",
    UPLOADLIST = "uploadList"
}

export enum TaskStatus {
    CREATED = "created",
    INPROGRESS = "in progress",
    REVIEW = "review",
    APPROVED = "approved",
    FAILED = "failed",
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
