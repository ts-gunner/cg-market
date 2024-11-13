import { useSelector, useDispatch } from 'react-redux'
import { RootState, Dispatch } from '@/store'
import Frame from '@/component/Frame'
import { useReady } from '@tarojs/taro'
import { View, Picker } from '@tarojs/components'
import { HouseworkTaskFiled, TaskCategory } from '@/data/typing'
import CommonButton from './common/CommonButton'
import Evidence from './evidenceUpload/Evidence'
import { AtList, AtListItem } from 'taro-ui'
import "./housework.css"

const homeworkList = [
	"扫地拖地", "洗碗", "晒衣服"
]
const pointList = [
	0.2
]
export default function Housework() {
	const dispatch = useDispatch<Dispatch>()
	const taskData = useSelector((rootState: RootState) => rootState.taskModel.houseworkTaskData)

	useReady(() => {
		dispatch.taskModel.setCurrentCategory(TaskCategory.HOUSEWORK)
		dispatch.taskModel.createTaskID()
	})

	const selectHomeworkType = (event: any) => {
		dispatch.taskModel.changeTaskItem({ keyName: HouseworkTaskFiled.TITLE, keyValue: homeworkList[event.detail.value] })
	}
	const selectPoint = (event: any) => {
		dispatch.taskModel.changeTaskItem({ keyName: HouseworkTaskFiled.POINT, keyValue: pointList[event.detail.value] })
	}
	return (
		<Frame>

			<View className="c-housework-card">
				<Picker className="c-housework-picker" mode='selector' range={homeworkList} onChange={selectHomeworkType}>
					<AtList>
						<AtListItem
							title='家务类型'
							extraText={taskData.title}

						/>
					</AtList>
				</Picker>
				<Picker className="c-housework-picker"  mode='selector' range={pointList} onChange={selectPoint}>
					<AtList >
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
