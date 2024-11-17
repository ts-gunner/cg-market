import { useEffect, useState } from 'react'
import { View } from '@tarojs/components'
import Tab, { TabContent } from '@/component/tab/Tab';
import Category from './Category';
import TaskSituation from './TaskSituation';
import "./index.css"
import { TaskStatus } from '@/data/typing';
import { taskTabData } from '@/data/config';
import { routes } from '@/data/api'
import storage from '@/utils/storage'
import { request } from '@tarojs/taro'
import { RootState } from '@/store';
import { useSelector } from 'react-redux';


export default function TaskWorker(){
    const [tabKey, setTabKey] = useState(0)
    const [taskList, setTaskList] = useState([])
    const isRefresh = useSelector((state: RootState) => state.globalModel.isRefresh)
    useEffect(() => {
        getApprovalTaskList()
    }, [isRefresh])
    const getApprovalTaskList = async () => {
        request({
            url: routes.getTaskList,
            method: "POST",
            data: {
                openid: await storage.getItem("openid"),
                status: "all"
            },
            header: {
                "Content-Type": "application/json",
                "Auth-Token": await storage.getItem("token")
            },
            success: (res) => {
                let response = res.data
                if (response.code === 200) {
                    let task_list = response.data
                    setTaskList(task_list)
                }
            }
        })
    }
    const generateTabContent = (keyName: string) => {
        switch (keyName) {
            case "category":
                return <Category></Category>
            case "approval":
                return <TaskSituation taskList={taskList} taskStatus={TaskStatus.REVIEW} />
            case "done":
                return <TaskSituation taskList={taskList} taskStatus={TaskStatus.APPROVED} />
            case "fail":
                return <TaskSituation taskList={taskList} taskStatus={TaskStatus.FAILED} />
        }
    }
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