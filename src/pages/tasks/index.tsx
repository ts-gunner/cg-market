import { useState } from 'react'
import { View } from '@tarojs/components'
import Frame from "@/component/Frame";
import Tab, { TabContent } from '@/component/tab/Tab';
import Category from './Category';
import TaskSituation from './TaskSituation';
import { AtMessage } from 'taro-ui'
import "./index.css"
import { TaskStatus } from '@/data/typing';

const tabData = [
    {
        key: 0,
        label: "任务类别",
        keyName: "category"
    },
    {
        key: 1,
        label: "待审核",
        keyName: "approval"
    },
    {
        key: 2,
        label: "已完成",
        keyName: "done"
    },
    {
        key: 3,
        label: "审核失败",
        keyName: "fail"
    }
]

export default function Task() {
    const [tabKey, setTabKey] = useState(0)
    const generateTabContent = (keyName: string) => {
        switch (keyName) {
            case "category":
                return <Category></Category>
            case "approval":
                return <TaskSituation taskStatus={TaskStatus.REVIEW}/>
            case "done":
                return <TaskSituation taskStatus={TaskStatus.APPROVED}/>
            case "fail":
                return <TaskSituation taskStatus={TaskStatus.FAILED}/>
        }
    }
    return (
        <Frame>
            <AtMessage />
            <View style={{ marginTop: "1rem" }}>
                <Tab activateKey={tabKey} onTabClick={(key) => setTabKey(key)}>
                    {tabData.map((tabItem) => {
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


        </Frame >
    )
}
