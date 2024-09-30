export enum TaskCategory {
    DEFAULT= "default",
    STUDY = "study",
    HOUSEWORK="housework"
}

export type studyTaskItem = {
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

export type houseworkTaskItem = {
    title: string,
    content: string,
    uploadList: string[]
}

export enum HouseworkTaskFiled {
    TITLE = "title",
    CONTENT = "content",
    UPLOADLIST = "uploadList"
}