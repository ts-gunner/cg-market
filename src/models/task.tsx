import { createModel } from "@rematch/core";
import type { RootModel } from '@/models'
import { StudyTaskItem, HouseworkTaskItem, SportTaskItem, TaskCategory } from "@/data/typing";


type TaskType = {
    currentType: TaskCategory,
    studyTaskData: StudyTaskItem[],
    houseworkTaskData: HouseworkTaskItem[],
    sportTaskData: SportTaskItem[]
}

const initState: TaskType = {
    currentType: TaskCategory.DEFAULT,
    studyTaskData: [],
    houseworkTaskData: [],
    sportTaskData: []
}

export const taskModel = createModel<RootModel>()({
    state: initState,
    reducers: {
        setCurrentCategory: (state: TaskType, payload: TaskCategory) => {
            return {
                ...state,
                currentType: payload
            }
        },
        addTaskItem: (state: TaskType, payload: any) => {
            let taskField = state.currentType
            let arr = [...state[taskField]]
            arr.push(payload)
            let new_state = { ...state }
            new_state[taskField] = arr
            return new_state

        },
        changeTaskItem: (state: TaskType, payload: { index: number, keyName: string, keyValue: any }) => {
            let taskField = state.currentType
            let item = state[taskField][payload.index]
            item[payload.keyName] = payload.keyValue

            let new_state = {...state}
            new_state[taskField] = [...state[taskField]]
            return new_state
        },
        clearTask: (state: TaskType) => {
            let taskField = state.currentType
            let new_state = {...state}
            new_state[taskField] = []
            return new_state
        },
    },
    effects: (dispatch) => ({

    })
})