import { useEffect, useState } from 'react'
import { View, Text } from '@tarojs/components'
import "./index.css"
import { TaskWorkerRecord, TaskStatusMapping, TaskStatus } from '@/data/typing';
import { workerRole, CATEGORY } from '@/data/config';
import { RootState } from '@/store';
import { useSelector } from 'react-redux';
import { request, navigateTo } from '@tarojs/taro';
import { routes } from '@/data/api';
import storage from '@/utils/storage';
import Taro from '@tarojs/taro';
import Tab, { TabContent } from '@/component/tab/Tab';
import NoData from '@/component/NoData';

export default function TaskMonitor() {
    const [records, setRecords] = useState([] as TaskWorkerRecord[])
    const isRefresh = useSelector((state: RootState) => state.globalModel.isRefresh)
    const [tabKey, setTabKey] = useState(0)
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

    const enterTaskDetail = (task_id: string) => {
        navigateTo({
            url: `/pages/taskAuditDetail/index?taskID=${task_id}`
        })
    }
    const Record = ({item}:{item:TaskWorkerRecord}) => {
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
                            {CATEGORY.find((cate) => cate.key == item.category)?.label}
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
                    <View className="task-worker-btn" onClick={() => enterTaskDetail(item.task_id)}>查看</View>
                </View>
            </View>
        )
    }
    return (
        <View>

            <Tab activateKey={tabKey} onTabClick={(key) => setTabKey(key)} tabWidth={6}>
                <TabContent tabKey={0} label="待审核">
                    {
                        records.filter(item => item.status === TaskStatus.REVIEW).length > 0 ?
                        records.filter(item => item.status === TaskStatus.REVIEW).map((item) => <Record item={item} />) : <NoData />
                    }
                </TabContent>
                <TabContent tabKey={1} label="审核通过">
                    {
                        records.filter(item => item.status === TaskStatus.APPROVED).length > 0 ?
                        records.filter(item => item.status === TaskStatus.APPROVED).map((item) => <Record item={item} />) : <NoData />
                    }
                </TabContent>
                <TabContent tabKey={2} label="审核不通过">
                    {
                        records.filter(item => item.status === TaskStatus.FAILED).length > 0 ?
                        records.filter(item => item.status === TaskStatus.FAILED).map((item) => <Record item={item} />) : <NoData />
                    }
                </TabContent>
            </Tab>

        </View>
    )
}