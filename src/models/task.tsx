import { createModel } from "@rematch/core";
import type { RootModel } from '@/models'
import { studyTaskItem, houseworkTaskItem, TaskCategory } from "@/data/typing";


type TaskType = {
    currentType: TaskCategory,
    studyTaskData: studyTaskItem[],
    houseworkTaskData: houseworkTaskItem[],
}

const initState: TaskType = {
    currentType: TaskCategory.DEFAULT,
    studyTaskData: [],
    houseworkTaskData: [],
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
            if (state.currentType === TaskCategory.STUDY) {
                let arr = [...state.studyTaskData]
                arr.push(payload)
                return {
                    ...state,
                    studyTaskData: arr
                }
            } else if (state.currentType === TaskCategory.HOUSEWORK) {
                let arr = [...state.houseworkTaskData]
                arr.push(payload)
                return {
                    ...state,
                    houseworkTaskData: arr
                }
            } else {
                return state
            }




        },
        changeTaskItem: (state: TaskType, payload: { index: number, keyName: string, keyValue: any }) => {
            if (state.currentType === TaskCategory.STUDY) {
                let item = state.studyTaskData[payload.index]
                item[payload.keyName] = payload.keyValue
                return {
                    ...state,
                    studyTaskData: [...state.studyTaskData]
                }
            } else if (state.currentType === TaskCategory.HOUSEWORK) {
                let item = state.houseworkTaskData[payload.index]
                item[payload.keyName] = payload.keyValue
                return {
                    ...state,
                    houseworkTaskData: [...state.houseworkTaskData]
                }
            }


        },
        clearTask: (state: TaskType) => {
            if (state.currentType === TaskCategory.STUDY) {
                return {
                    ...state,
                    studyTaskData: []
                }
            }
            else if (state.currentType === TaskCategory.HOUSEWORK) {
                return {
                    ...state,
                    houseworkTaskData: []
                }
            }

        },
    },
    effects: (dispatch) => ({

    })
})