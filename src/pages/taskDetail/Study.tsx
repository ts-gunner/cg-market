import Frame from '@/component/Frame'
import { View, Text, Picker, Textarea } from '@tarojs/components'
import { useReady } from '@tarojs/taro'
import { useSelector, useDispatch } from 'react-redux'
import { RootState, Dispatch } from '@/store'
import { StudyTaskField, TaskCategory } from '@/data/typing'
import { AtList, AtListItem } from 'taro-ui'
import CommonButton from './common/CommonButton'
import Evidence from './evidenceUpload/Evidence'
import "taro-ui/dist/style/components/icon.scss";
import "./study.css"

const pointList = [
	0.2
]
export default function Study() {
    const dispatch = useDispatch<Dispatch>()
    const taskData = useSelector((rootState: RootState) => rootState.taskModel.studyTaskData)
    useReady(() => {
        dispatch.taskModel.setCurrentCategory(TaskCategory.STUDY)
        dispatch.taskModel.createTaskID()
    })

    const changeStudyDate = (event: any) => {
        dispatch.taskModel.changeTaskItem({ keyName: StudyTaskField.DATE, keyValue: event.detail.value })
    }
    const changeStudyStartTime = (event: any) => {
        dispatch.taskModel.changeTaskItem({ keyName: StudyTaskField.STARTTIME, keyValue: event.detail.value })
    }
    const changeStudyEndTime = (event: any) => {
        dispatch.taskModel.changeTaskItem({ keyName: StudyTaskField.ENDTIME, keyValue: event.detail.value })
    }
    const changeStudyContent = (event: any) => {
        dispatch.taskModel.changeTaskItem({ keyName: StudyTaskField.CONTENT, keyValue: event.detail.value })
    }
    const selectPoint = (event: any) => {
		dispatch.taskModel.changeTaskItem({ keyName: StudyTaskField.POINT, keyValue: pointList[event.detail.value] })
	}
    return (
        <Frame>

            <View className="c-study-card">
                <View className="c-study-label">
                    <Text>学习日期:</Text>
                    <Picker mode='date' onChange={changeStudyDate} value={taskData.date}>
                        <View className="c-study-time-picker">{taskData.date || "选择日期"}</View>
                    </Picker>
                </View>
                <View className="c-study-label">
                    <Text>学习时间:</Text>
                    <Picker mode='time' onChange={changeStudyStartTime} value={taskData.startTime}>
                        <View className="c-study-time-picker">{taskData.startTime || "起始时间"}</View>
                    </Picker>
                    <Text>至</Text>
                    <Picker mode='time' start={taskData.startTime} onChange={changeStudyEndTime} value={taskData.endTime}>
                        <View className="c-study-time-picker" >{taskData.endTime || "终止时间"}</View>
                    </Picker>
                </View>
                <View className="c-study-label2">
                    <Text style={{ marginLeft: "0.5rem" }}>学习内容:</Text>
                    <View style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <Textarea className='c-study-textarea' defaultValue={taskData.content} onInput={changeStudyContent}></Textarea>
                    </View>
                </View>
                <Picker className="c-study-picker" mode='selector' range={pointList} onChange={selectPoint}>
                    <AtList>
                        <AtListItem
                            title="积分"
							extraText={taskData.point.toString()}
                        />
                    </AtList>
                </Picker>
                <Evidence />
            </View>

            <CommonButton />

        </Frame>
    )
}
