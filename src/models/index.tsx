import { Models } from "@rematch/core"
import { taskModel } from "./task"
import { achieveModel } from "./achieve"
import { globalModel } from "./global"
export interface RootModel extends Models<RootModel>{
    taskModel: typeof taskModel,
    achieveModel: typeof achieveModel,
    globalModel: typeof globalModel,
}


export const models: RootModel = {
    taskModel,
    achieveModel,
    globalModel,
}