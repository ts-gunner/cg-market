import { createModel } from "@rematch/core";
import type { RootModel } from '@/models'
import { request, uploadFile,navigateBack } from "@tarojs/taro";
import { StudyTaskItem, HouseworkTaskItem, SportTaskItem, TaskCategory } from "@/data/typing";
import storage from "@/utils/storage";
import { routes } from "@/data/api";
import Taro from '@tarojs/taro'

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

            let new_state = { ...state }
            new_state[taskField] = [...state[taskField]]
            return new_state
        },
        clearTask: (state: TaskType) => {
            let taskField = state.currentType
            let new_state = { ...state }
            new_state[taskField] = []
            return new_state
        },
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
            let taskItem = state.taskModel.studyTaskData[0]
            let data = {
                category: "study",
                openid: await storage.getItem("openid"),
                content: taskItem.content,
                body: JSON.stringify({
                    date: taskItem.date,
                    startTime: taskItem.startTime,
                    endTime: taskItem.endTime
                }),
                point: taskItem.point,
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
            let taskItem = state.taskModel.houseworkTaskData[0]
            let data = {
                category: "housework",
                openid: await storage.getItem("openid"),
                content: taskItem.title,
                point: taskItem.point,
                body: ""
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
            let taskItem = state.taskModel.sportTaskData[0]
            let data = {
                category: "sport",
                openid: await storage.getItem("openid"),
                content: taskItem.title,
                point: taskItem.point,
                body: ""
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

        requestTaskAPI: async (data: any) => {
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
                    if (response.code === 200) await dispatch.taskModel.uploadAttachment(response.data)
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

        uploadAttachment: async (task_id, state) => {
            let file_list: string[];
            switch (state.taskModel.currentType) {
                case TaskCategory.STUDY:
                    file_list = state.taskModel.studyTaskData[0].uploadList
                    break;
                case TaskCategory.HOUSEWORK:
                    file_list = state.taskModel.houseworkTaskData[0].uploadList
                    break;
                case TaskCategory.SPORT:
                    file_list = state.taskModel.sportTaskData[0].uploadList
                    break;
                default:
                    Taro.atMessage({
                        'message': '任务类型异常: ' + state.taskModel.currentType,
                        'type': "error",
                        "duration": 2000
                    })
                    return
            }
            let token = await storage.getItem("token")
            let openid = await storage.getItem("openid")
            file_list.map((attach_url) => {
                uploadFile({
                    url: routes.saveTaskAttachment,
                    filePath: attach_url,
                    name: "blob",
                    formData: {
                        task_id,
                        openid
                    },
                    header: {
                        "Content-Type": "multipart/form-data",
                        "Auth-Token": token
                    },
                    success: (res) => {
                        let response: any = JSON.parse(res.data)
                        if (response.code === 200) {
                            console.log("保存成功！！")
                            dispatch.taskModel.clearTask()
                            Taro.atMessage({
                                'message': '保存成功！！',
                                'type': "success",
                                "duration": 2000
                            })
                            navigateBack()

                        }else {
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


        }
    })
})