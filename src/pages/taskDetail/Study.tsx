import Frame from '@/component/Frame'
import { IMAGE_URL, MAX_UPLOAD_COUNT } from '@/data/config'
import { View, Text, Image, Picker, Textarea } from '@tarojs/components'
import { chooseImage, navigateBack, useReady } from '@tarojs/taro'
import { useSelector, useDispatch } from 'react-redux'
import { RootState, Dispatch } from '@/store'
import { AtIcon } from 'taro-ui'
import { StudyTaskField, TaskCategory } from '@/data/typing'
import CommonButton from './common/CommonButton'
import Evidence from './evidenceUpload/Evidence'
import "taro-ui/dist/style/components/icon.scss";
import "./study.css"

export default function Study() {
    const dispatch = useDispatch<Dispatch>()
    const taskList = useSelector((rootState: RootState) => rootState.taskModel.studyTaskData)
    useReady(() => {
        dispatch.taskModel.setCurrentCategory(TaskCategory.STUDY)
        if (taskList.length === 0) {
            dispatch.taskModel.addTaskItem({
                date: "",
                startTime: "",
                endTime: "",
                content: "",
                uploadList: []
            })
        }
    })
    
    const changeStudyDate = (event: any, index: number) => {
        dispatch.taskModel.changeTaskItem({ index, keyName: StudyTaskField.DATE, keyValue: event.detail.value })
    }
    const changeStudyStartTime = (event: any, index: number) => {
        dispatch.taskModel.changeTaskItem({ index, keyName: StudyTaskField.STARTTIME, keyValue: event.detail.value })
    }
    const changeStudyEndTime = (event: any, index: number) => {
        dispatch.taskModel.changeTaskItem({ index, keyName: StudyTaskField.ENDTIME, keyValue: event.detail.value })
    }
    const changeStudyContent = (event: any, index: number) => { 
        dispatch.taskModel.changeTaskItem({ index, keyName: StudyTaskField.CONTENT, keyValue: event.detail.value })
    }
    
    return (
        <Frame>
            {
                taskList.map((taskItem, taskIndex) => {
                    return (
                        <View key={taskIndex} className="c-study-card">
                            <View className="c-study-label">
                                <Text>学习日期:</Text>
                                <Picker mode='date' onChange={(event) => changeStudyDate(event, taskIndex)} value={taskItem.date}>
                                    <View className="c-study-time-picker">{taskItem.date || "选择日期"}</View>
                                </Picker>
                            </View>
                            <View className="c-study-label">
                                <Text>学习时间:</Text>
                                <Picker mode='time' onChange={(event) => changeStudyStartTime(event, taskIndex)} value={taskItem.startTime}>
                                    <View className="c-study-time-picker">{taskItem.startTime || "起始时间"}</View>
                                </Picker>
                                <Text>至</Text>
                                <Picker mode='time' onChange={(event) => changeStudyEndTime(event, taskIndex)} value={taskItem.endTime}>
                                    <View className="c-study-time-picker" >{taskItem.endTime || "终止时间"}</View>
                                </Picker>
                            </View>
                            <View className="c-study-label2">
                                <Text style={{ marginLeft: "0.5rem" }}>学习内容:</Text>
                                <View style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                    <Textarea className='c-study-textarea' defaultValue={taskItem.content} onInput={(event)=> changeStudyContent(event, taskIndex)}></Textarea>
                                </View>
                            </View>
                            <Evidence taskIndex={taskIndex}/>
                        </View>
                    )
                })
            }

            <CommonButton />

        </Frame>
    )
}
