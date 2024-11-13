import { useEffect, useState } from 'react'
import { View, Text } from '@tarojs/components'
import Frame from "@/component/Frame";
import Tab, { TabContent } from '@/component/tab/Tab';
import Category from './Category';
import TaskSituation from './TaskSituation';
import { AtMessage, AtFab } from 'taro-ui'
import "./index.css"
import { TaskStatus, TaskWorkerRecord,TaskStatusMapping } from '@/data/typing';
import { taskTabData, workerRole,monitorRole,CATEGORY } from '@/data/config';
import { RootState, Dispatch } from '@/store';
import { useSelector, useDispatch } from 'react-redux';
import { request,navigateTo } from '@tarojs/taro';
import { routes } from '@/data/api';
import storage from '@/utils/storage';
import UnLogin from '@/component/unLogin/UnLogin';
import UnFound from '@/component/UnFound';
import Taro from '@tarojs/taro';



const TaskMonitor = () => {
    const [records, setRecords] = useState([] as TaskWorkerRecord[])
    const isRefresh = useSelector((state: RootState) => state.globalModel.isRefresh)
    useEffect(() => {
        get_work_records()
    }, [isRefresh])
    const get_work_records = async () => {
        let data = {
            role_id: workerRole,
            status: "",
        }
        request({
            url: routes.getWorkerRecord,
            data: data,
            method: "POST",
            header: {
                "Auth-Token": await storage.getItem("token")
            },
            success: (res) => {
                let response = res.data
                console.log(response)
                if (response.code === 200) {
                    let work_records = response.data
                    setRecords(work_records)
                } else {

                }
            },
            fail: (res) => {
                Taro.atMessage({
                    'message': 'get_work_records异常:' + res.errMsg,
                    'type': "error",
                    "duration": 2000
                })
            }
        })
    }

    const enterTaskDetail = (task_id:string) => {
        navigateTo({
            url: `/pages/taskAuditDetail/index?taskID=${task_id}`
        })
    }
    return (
        <View>
            {
                records.map((item) => {
                    return (
                        <View key={item.task_id} className='task-worker-box'>
                            <View>
                                <View className='task-work-item'>
                                    <Text>
                                        牛马:
                                    </Text>
                                    <Text>
                                        {item.nickname} {`(${item.remark})`}
                                    </Text>
                                </View>
                                <View className='task-work-item'>
                                    <Text>
                                        任务类别:
                                    </Text>
                                    <Text>
                                        {CATEGORY.find((cate)=> cate.key == item.category)?.label}
                                    </Text>
                                </View>
                                <View className='task-work-item'>
                                    <Text>
                                        任务内容:
                                    </Text>
                                    <Text>
                                        {item.content}
                                    </Text>
                                </View>
                                <View className='task-work-item'>
                                    <Text>
                                        创建时间:
                                    </Text>
                                    <Text>
                                        {item.create_time}
                                    </Text>
                                </View>
                                <View className='task-work-item'>
                                    <Text>
                                        当前状态:
                                    </Text>
                                    <Text>
                                        {TaskStatusMapping[item.status]}
                                    </Text>
                                </View>
                            </View>
                            <View>
                                <View className="task-worker-btn" onClick={()=> enterTaskDetail(item.task_id)}>查看</View>
                            </View>
                        </View>
                    )
                })
            }
        </View>
    )
}

export default function Task() {
    const [tabKey, setTabKey] = useState(0)
    const isAuth = useSelector((state: RootState) => state.authModel.isAuth)
    const roles = useSelector((state: RootState) => state.authModel.roles)
    const dispatch = useDispatch<Dispatch>()
    const generateTabContent = (keyName: string) => {
        switch (keyName) {
            case "category":
                return <Category></Category>
            case "approval":
                return <TaskSituation taskStatus={TaskStatus.REVIEW} />
            case "done":
                return <TaskSituation taskStatus={TaskStatus.APPROVED} />
            case "fail":
                return <TaskSituation taskStatus={TaskStatus.FAILED} />
        }
    }

    const TaskWorker = () => {
        return (
            <View style={{ marginTop: "1rem" }}>
                <Tab activateKey={tabKey} onTabClick={(key) => setTabKey(key)}>
                    {taskTabData.map((tabItem) => {
                        return (
                            <TabContent key={tabItem.key} tabKey={tabItem.key} label={tabItem.label}>
                                <View style={{
                                    marginTop: "0.8rem",
                                    height: "100%"
                                }}>
                                    {
                                        generateTabContent(tabItem.keyName)
                                    }
                                </View>

                            </TabContent>
                        )
                    })}
                </Tab>
            </View>
        )
    }


    const TaskContainer = () => {
        if (isAuth) {
            let wrId = roles.findIndex((role) => role.role_id === workerRole)
            let mrId = roles.findIndex((role) => role.role_id === monitorRole)
            if (wrId !== -1) {
                return <TaskWorker />
            } else if (mrId !== -1) {
                return <TaskMonitor />
            } else {
                return <UnFound />
            }
        }else {
            return <UnLogin />
        }
        
    }
    return (
        <Frame>
            <AtMessage />
            <View className="refresh-btn">
                <AtFab size='small' onClick={() => dispatch.globalModel.setIsRefresh()}>刷新</AtFab>
            </View>
            <TaskContainer />
        </Frame >
    )
}
