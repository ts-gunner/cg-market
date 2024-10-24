import { Models } from "@rematch/core"
import { taskModel } from "./task"
import { achieveModel } from "./achieve"
import { globalModel } from "./global"
import { shopModel } from "./shop"
import { authModel } from "./auth"
export interface RootModel extends Models<RootModel>{
    taskModel: typeof taskModel,
    achieveModel: typeof achieveModel,
    globalModel: typeof globalModel,
    shopModel: typeof shopModel,
    authModel: typeof authModel,

}


export const models: RootModel = {
    taskModel,
    achieveModel,
    globalModel,
    shopModel,
    authModel,
}