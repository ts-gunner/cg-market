import { Models } from "@rematch/core"
import { taskModel } from "./task"
import { achieveModel } from "./achieve"
import { globalModel } from "./global"
import { shopModel } from "./shop"
export interface RootModel extends Models<RootModel>{
    taskModel: typeof taskModel,
    achieveModel: typeof achieveModel,
    globalModel: typeof globalModel,
    shopModel: typeof shopModel,

}


export const models: RootModel = {
    taskModel,
    achieveModel,
    globalModel,
    shopModel,
}