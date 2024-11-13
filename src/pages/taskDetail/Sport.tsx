import { useSelector, useDispatch } from 'react-redux'
import { RootState, Dispatch } from '@/store'
import Frame from '@/component/Frame'
import { useReady } from '@tarojs/taro'
import { View, Picker } from '@tarojs/components'
import { SportTaskFiled, TaskCategory } from '@/data/typing'
import CommonButton from './common/CommonButton'
import Evidence from './evidenceUpload/Evidence'
import { AtList, AtListItem } from 'taro-ui'
import "./sport.css"

const sportTypeList = [
    "跳高", "打篮球", "踢足球", "跳绳", "跑步"
]
const pointList = [
	0.2
]

export default function Sport() {
    const dispatch = useDispatch<Dispatch>()
    const taskData = useSelector((rootState: RootState) => rootState.taskModel.sportTaskData)
    useReady(() => {
        dispatch.taskModel.setCurrentCategory(TaskCategory.SPORT)
        dispatch.taskModel.createTaskID()
    })

    const selectSportType = (event: any) => {
        dispatch.taskModel.changeTaskItem({ keyName: SportTaskFiled.TITLE, keyValue: sportTypeList[event.detail.value] })
    }

    const selectPoint = (event: any) => {
		dispatch.taskModel.changeTaskItem({ keyName: SportTaskFiled.POINT, keyValue: pointList[event.detail.value] })
	}
    return (
        <Frame>

            <View className="c-sport-card">
                <Picker className="c-sport-picker" mode='selector' range={sportTypeList} onChange={selectSportType}>
                    <AtList>
                        <AtListItem
                            title='运动类型'
                            extraText={taskData.title}

                        />
                    </AtList>
                </Picker>
                <Picker className="c-sport-picker"  mode='selector' range={pointList} onChange={selectPoint}>
					<AtList >
						<AtListItem
							title="积分"
							extraText={taskData.point.toString()}
						/>
					</AtList>
				</Picker>
                <Evidence/>
            </View>
            
            <CommonButton />
        </Frame>
    )
}
