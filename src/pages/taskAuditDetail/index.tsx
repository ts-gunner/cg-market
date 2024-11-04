import { View, Text, Image } from "@tarojs/components"
import { useRouter, request,previewImage } from "@tarojs/taro"
import { routes } from "@/data/api"
import storage from "@/utils/storage"
import { TaskItemBase } from '@/data/typing'
import { useEffect, useState } from "react"
import Taro from "@tarojs/taro"
export default function TaskAuditDetail() {
    const router = useRouter()
    const taskID = router.params.taskID || ""
    const [taskObject, setTaskObject] = useState({} as TaskItemBase)
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
        if (attach_list.length > 0){
            previewImage({
                urls: attach_list,
                current: attach_list[index]
            })
        }
    }
    return (
        <View>
            <View>
                id: <Text>{taskObject.task_id}</Text>
            </View>
            <View>
                内容: <Text>{taskObject.content}</Text>
            </View>
            <View>
                时间: <Text>{taskObject.create_time}</Text>
            </View>
            <View>
                {taskObject.body}
            </View>
            <View>
                分数： <Text>{taskObject.point}</Text>
            </View>
            <View>
                <Text>
                    备注：
                </Text>
                <Text>
                    {taskObject.remark}
                </Text>
            </View>
            <View>
                <Text>
                    当前状态：
                </Text>
                <Text>
                    {taskObject.status}
                </Text>
            </View>
            <View>
                {
                    JSON.parse(taskObject.attach_list || "[]").map((url: string, index: number) => {
                        return (
                            <View key={index}>
                                <Image src={url} style={{ width: "5rem", height: "5rem" }} onClick={() => clickImage(index)}></Image>
                            </View>
                        )
                    })
                }

            </View>



        </View>
    )
}
