import { View, Text, Image, Textarea } from "@tarojs/components"
import { useRouter, request, previewImage, navigateBack } from "@tarojs/taro"
import { routes } from "@/data/api"
import storage from "@/utils/storage"
import { TaskItemBase, TaskStatusMapping } from '@/data/typing'
import Frame from "@/component/Frame"
import { useEffect, useState } from "react"
import { AtTag, AtDivider, AtMessage } from "taro-ui"
import Taro from "@tarojs/taro"
import { RootState } from "@/store"
import { useSelector } from "react-redux"
import { workerRole } from "@/data/config"
import "./index.css"

export default function TaskAuditDetail() {
    const router = useRouter()
    const taskID = router.params.taskID || ""
    const [taskObject, setTaskObject] = useState({} as TaskItemBase)
    const roles = useSelector((state: RootState) => state.authModel.roles)
    const [comment, setComment] = useState("")
    const getTaskObject = async () => {
        request({
            url: `${routes.getTaskObject}?task_id=${taskID}`,
            header: {
                "Auth-Token": await storage.getItem("token")
            },
            success: (res) => {
                let response = res.data
                if (response.code === 200) {
                    setTaskObject(response.data)
                } else {
                    Taro.atMessage({
                        'message': '查找任务记录失败：' + res.errMsg,
                        'type': "error",
                        "duration": 2000
                    })
                }
            }
        })
    }
    useEffect(() => {
        getTaskObject()
    }, [])

    const clickImage = (index: number) => {
        let attach_list = JSON.parse(taskObject.attach_list || "[]")
        if (attach_list.length > 0) {
            previewImage({
                urls: attach_list,
                current: attach_list[index]
            })
        }
    }

    const auditTask = async (approval: boolean) => {
        request({
            url: routes.auditTask,
            method: "POST",
            data: {
                task_id: taskID,
                approve_result: approval,
                comment: comment
            },
            header: {
                "Content-Type": "application/json",
                "Auth-Token": await storage.getItem("token")
            },
            success: (res) => {
                let response = res.data
                if (response.code === 200) {
                    Taro.atMessage({
                        'message': response.msg,
                        'type': "success",
                        "duration": 2000
                    })
                    navigateBack()
                } else {
                    Taro.atMessage({
                        'message': response.msg,
                        'type': "error",
                        "duration": 2000
                    })
                }
            },
            fail: (res) => {
                Taro.atMessage({
                    'message': res.errMsg,
                    'type': "error",
                    "duration": 2000
                })
            }
        })
    }
    return (
        <Frame>
            <AtMessage />
            <View className="task-audit-container">
                <View className="task-audit-list">
                    <View className="task-audit-list-item">
                        <View className="list-item-key-text">
                            <Text>任务id</Text>
                        </View>
                        <View className="list-item-value-text">
                            <Text overflow="clip" >{taskObject.task_id}</Text>
                        </View>
                    </View>
                    <AtDivider lineColor='#508AB2' />
                    <View className="task-audit-list-item">
                        <View className="list-item-key-text">
                            <Text>任务内容</Text>
                        </View>
                        <View className="list-item-value-text">
                            <Text>{taskObject.content}</Text>
                        </View>
                    </View>
                    <AtDivider lineColor='#508AB2' />
                    <View className="task-audit-list-item">
                        <View className="list-item-key-text">
                            <Text>任务创建时间</Text>
                        </View>
                        <View className="list-item-value-text">
                            <Text>{taskObject.create_time}</Text>
                        </View>
                    </View>
                    <AtDivider lineColor='#508AB2' />
                    <View className="task-audit-list-item">
                        <View className="list-item-key-text">
                            <Text>分数</Text>
                        </View>
                        <View className="list-item-value-text">
                            <Text>{taskObject.point}</Text>
                        </View>
                    </View>
                    <AtDivider lineColor='#508AB2' />
                    <View className="task-audit-list-item">
                        <View className="list-item-key-text">
                            <Text>备注</Text>
                        </View>
                        <View className="list-item-value-text">
                            <Text>{taskObject.remark}</Text>
                        </View>
                    </View>
                    <AtDivider lineColor='#508AB2' />
                    <View className="task-audit-list-item">
                        <View className="list-item-key-text">
                            <Text>当前状态：</Text>
                        </View>
                        <View className="list-item-value-text">
                            <AtTag circle>{TaskStatusMapping[taskObject.status]}</AtTag>
                        </View>
                    </View>
                    <AtDivider lineColor='#508AB2' />
                    <View className="task-audit-list-item">
                        <View className="list-item-key-text">
                            <Text>其他内容：</Text>
                        </View>
                        <View className="list-item-value-text">
                            {
                                taskObject.category === "study" ? (
                                    <View>
                                        {taskObject.body}
                                    </View>
                                ) : <Text>无</Text>
                            }
                        </View>
                    </View>
                </View>
                <View className="task-audit-evidence">
                    <View>
                        <Text style={{ fontWeight: 600 }}>证明:</Text>
                    </View>
                    <View className="task-audit-imgs">
                        {
                            JSON.parse(taskObject.attach_list || "[]").map((url: string, index: number) => {
                                return (
                                    <View key={index}>
                                        <Image mode="aspectFit" src={url} className="task-audit-evidence-image" onClick={() => clickImage(index)}></Image>
                                    </View>
                                )
                            })
                        }

                    </View>
                </View>
            </View>

            {
                roles.findIndex((role) => role.role_id === workerRole) === -1 ? (
                    <>
                        <View className="task-audit-approval-btn-container">
                            <Text style={{ marginLeft: "0.5rem" }}>审核备注:</Text>
                            <Textarea className='task-audit-approval-comment'
                                defaultValue={comment}
                                onInput={(event) => setComment(event.detail.value)}
                            ></Textarea>
                        </View>
                        <View className="task-audit-approval-btn-container">

                            <View className="task-audit-approval-btn task-audit-approval-pass"
                                onClick={() => auditTask(true)}
                            >
                                审核通过
                            </View>
                            <View className="task-audit-approval-btn task-audit-approval-fail"
                                onClick={() => auditTask(false)}
                            >
                                审核不通过
                            </View>
                        </View>
                    </>

                ) : null
            }
        </Frame>

    )
}
