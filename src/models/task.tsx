import { createModel } from "@rematch/core";
import type { RootModel } from '@/models'
import { request, uploadFile, navigateBack } from "@tarojs/taro";
import { StudyTaskItem, HouseworkTaskItem, SportTaskItem, TaskCategory } from "@/data/typing";
import storage from "@/utils/storage";
import { routes } from "@/data/api";
import Taro from '@tarojs/taro'
import lodash from 'lodash'
function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}
type TaskType = {
    currentType: TaskCategory,
    studyTaskData: StudyTaskItem,
    houseworkTaskData: HouseworkTaskItem,
    sportTaskData: SportTaskItem
}

const initState: TaskType = {
    currentType: TaskCategory.DEFAULT,
    studyTaskData: {
        taskID: "",
        date: "",
        startTime: "",
        endTime: "",
        content: "",
        point: 0.2,
        uploadList: []
    },
    houseworkTaskData: {
        taskID: "",
        title: "",
        point: 0.2,
        uploadList: []
    },
    sportTaskData: {
        taskID: "",
        title: "",
        point: 0.2,
        uploadList: []
    }
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
        changeTaskItem: (state: TaskType, payload: { keyName: string, keyValue: any }) => {
            let new_state = lodash.cloneDeep(state)
            let taskField = state.currentType
            state[taskField][payload.keyName] = payload.keyValue
            new_state[taskField] = lodash.cloneDeep(state[taskField])
            return new_state
        },
        clearTask: (state: TaskType) => {
            let taskField = state.currentType
            let new_state = { ...state }
            new_state[taskField] = initState[taskField]
            return new_state
        },
        createTaskID: (state: TaskType) => {
            if (state[state.currentType].taskID) {
                return state
            } else {
                let new_state = lodash.cloneDeep(state)
                let taskField = state.currentType
                state[taskField]["taskID"] = generateUUID()
                new_state[taskField] = lodash.cloneDeep(state[taskField])
                return new_state
            }
        },
        addAttachment: (state: TaskType, payload: string) => {
            let new_state = lodash.cloneDeep(state)
            let taskField = state.currentType
            state[taskField]["uploadList"].push(payload)
            new_state[taskField] = lodash.cloneDeep(state[taskField])
            return new_state
        }

    },
    effects: (dispatch) => ({
        addTask: async (_, state) => {
            switch (state.taskModel.currentType) {
                case TaskCategory.STUDY:
                    dispatch.taskModel.addStudyTaskAPI(null)
                    break;
                case TaskCategory.HOUSEWORK:
                    dispatch.taskModel.addHouseworkTaskAPI(null)
                    break;
                case TaskCategory.SPORT:
                    dispatch.taskModel.addSportTaskAPI(null)
                    break;

            }

        },
        addStudyTaskAPI: async (_, state) => {
            let taskItem = state.taskModel.studyTaskData
            let data = {
                task_id: taskItem.taskID,
                category: "study",
                openid: await storage.getItem("openid"),
                content: taskItem.content,
                body: JSON.stringify({
                    date: taskItem.date,
                    startTime: taskItem.startTime,
                    endTime: taskItem.endTime
                }),
                point: taskItem.point,
                upload_list: taskItem.uploadList
            }
            let msg = ""
            if (!taskItem.content) msg += "学习内容未填写；"
            if (!taskItem.date) msg += "学习日期未选择；"
            if (!taskItem.startTime) msg += "学习开始时间未选择；"
            if (!taskItem.endTime) msg += "学习结束时间未选择；"
            if (taskItem.uploadList.length === 0) msg += "证明未上传；"
            if (msg) {
                Taro.atMessage({
                    'message': msg,
                    'type': "error",
                    "duration": 2000
                })
                return
            }
            dispatch.taskModel.requestTaskAPI(data)
        },
        addHouseworkTaskAPI: async (_, state) => {
            let taskItem = state.taskModel.houseworkTaskData
            let data = {
                task_id: taskItem.taskID,
                category: "housework",
                openid: await storage.getItem("openid"),
                content: taskItem.title,
                point: taskItem.point,
                body: "",
                upload_list: taskItem.uploadList
            }
            let msg = ""
            if (!taskItem.title) msg += "家务类型未选择；"
            if (taskItem.uploadList.length === 0) msg += "证明未上传；"
            if (msg) {
                Taro.atMessage({
                    'message': msg,
                    'type': "error",
                    "duration": 2000
                })
                return
            }
            dispatch.taskModel.requestTaskAPI(data)
        },
        addSportTaskAPI: async (_, state) => {
            let taskItem = state.taskModel.sportTaskData
            let data = {
                task_id: taskItem.taskID,
                category: "sport",
                openid: await storage.getItem("openid"),
                content: taskItem.title,
                point: taskItem.point,
                body: "",
                upload_list: taskItem.uploadList
            }
            let msg = ""
            if (!taskItem.title) msg += "运动类型未选择；"
            if (taskItem.uploadList.length === 0) msg += "证明未上传；"
            if (msg) {
                Taro.atMessage({
                    'message': msg,
                    'type': "error",
                    "duration": 2000
                })
                return
            }
            dispatch.taskModel.requestTaskAPI(data)
        },

        requestTaskAPI: async (data: any, state) => {
            if (state.globalModel.pageLoading) return

            dispatch.globalModel.setPageLoading(true)
            request({
                url: routes.addTask,
                method: "POST",
                data,
                header: {
                    "Content-Type": "application/json",
                    "Auth-Token": await storage.getItem("token")
                },
                success: async (res) => {
                    let response = res.data
                    if (response.code === 200) {
                        dispatch.globalModel.setPageLoading(false)
                        dispatch.taskModel.clearTask()
                        navigateBack()
                    }

                    else throw new Error(response.msg)
                },
                fail: (res) => {
                    Taro.atMessage({
                        'message': '添加任务失败：' + res.errMsg,
                        'type': "error",
                        "duration": 2000
                    })
                }
            })
        },

        uploadAttachment: async (file_list: string[]) => {
            let token = await storage.getItem("token")
            dispatch.globalModel.setPageLoading(true)
            file_list.map((attach_url) => {
                uploadFile({
                    url: routes.uploadAttachment,
                    filePath: attach_url,
                    name: "blob",
                    header: {
                        "Content-Type": "multipart/form-data",
                        "Auth-Token": token
                    },
                    success: (res) => {
                        let response: any = JSON.parse(res.data)
                        if (response.code === 200) {
                            let remote_url = response.data
                            dispatch.taskModel.addAttachment(remote_url)
                        } else {
                            Taro.atMessage({
                                'message': '添加任务接口异常',
                                'type': "error",
                                "duration": 2000
                            })
                        }
                    },
                    fail: (res) => {
                        Taro.atMessage({
                            'message': '添加任务异常： ' + res.errMsg,
                            'type': "error",
                            "duration": 2000
                        })
                    }

                })
            })

            dispatch.globalModel.setPageLoading(false)

        }
    })
})