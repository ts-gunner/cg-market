import { Models } from "@rematch/core"
import { taskModel } from "./task"

export interface RootModel extends Models<RootModel>{
    taskModel: typeof taskModel
}


export const models: RootModel = {
    taskModel
}