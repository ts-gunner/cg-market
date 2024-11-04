import { useSelector, useDispatch } from 'react-redux'
import { RootState, Dispatch } from '@/store'
import Frame from '@/component/Frame'
import { useReady } from '@tarojs/taro'
import { View, Picker, Text } from '@tarojs/components'
import { SportTaskFiled, TaskCategory } from '@/data/typing'
import CommonButton from './common/CommonButton'
import Evidence from './evidenceUpload/Evidence'
import { AtList, AtListItem } from 'taro-ui'
import "./sport.css"

const sportTypeList = [
    "跳高", "打篮球", "踢足球", "跳绳", "跑步"
]

export default function Sport({point}: {point: number}) {
    const dispatch = useDispatch<Dispatch>()
    const taskList = useSelector((rootState: RootState) => rootState.taskModel.sportTaskData)
    useReady(() => {
        dispatch.taskModel.setCurrentCategory(TaskCategory.SPORT)
        if (taskList.length === 0) {
            dispatch.taskModel.addTaskItem({
                title: "",
                point: point,
                uploadList: []
            })
        }
    })

    const selectSportType = (event: any, index: number) => {
        dispatch.taskModel.changeTaskItem({ index, keyName: SportTaskFiled.TITLE, keyValue: sportTypeList[event.detail.value] })
    }
    return (
        <Frame>
            {
                taskList.map((taskItem, taskIndex) => {
                    return (
                        <View key={taskIndex} className="c-sport-card">
                            <Picker className="c-sport-picker" mode='selector' range={sportTypeList} onChange={(event) => selectSportType(event, taskIndex)}>
                                <AtList>
                                    <AtListItem
                                        title='运动类型'
                                        extraText={taskItem.title}

                                    />
                                </AtList>
                            </Picker>
                            <Evidence taskIndex={taskIndex} />
                        </View>
                    )
                })
            }
            <Text>合计： {point * taskList.length}</Text>
            <CommonButton />
        </Frame>
    )
}
