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
    uploadList: string[]
}

export enum HouseworkTaskFiled {
    TITLE = "title",
    UPLOADLIST = "uploadList"
}

export type SportTaskItem = {
    title: string,
    uploadList: string[]
}

export enum SportTaskFiled {
    TITLE = "title",
    UPLOADLIST = "uploadList"
}