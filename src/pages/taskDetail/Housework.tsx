import { useSelector, useDispatch } from 'react-redux'
import { RootState, Dispatch } from '@/store'
import Frame from '@/component/Frame'
import { useReady } from '@tarojs/taro'
import { View, Picker, Text } from '@tarojs/components'
import { HouseworkTaskFiled, TaskCategory } from '@/data/typing'
import CommonButton from './common/CommonButton'
import Evidence from './evidenceUpload/Evidence'
import { AtList, AtListItem } from 'taro-ui'
import "./housework.css"

const homeworkList = [
  "扫地拖地", "洗碗", "晒衣服"
]
export default function Housework({point}: {point: number}) {
  const dispatch = useDispatch<Dispatch>()
  const taskList = useSelector((rootState: RootState) => rootState.taskModel.houseworkTaskData)

  useReady(() => {
    dispatch.taskModel.setCurrentCategory(TaskCategory.HOUSEWORK)
    if (taskList.length === 0) {
      dispatch.taskModel.addTaskItem({
        title: "",
        point: point,
        uploadList: []
      })
    }
  })
  const selectHomeworkType = (event: any, index: number) => {
    dispatch.taskModel.changeTaskItem({ index, keyName: HouseworkTaskFiled.TITLE, keyValue: homeworkList[event.detail.value] })
  }
  return (
    <Frame>
      {
        taskList.map((taskItem, taskIndex) => {
          return (
            <View key={taskIndex} className="c-housework-card">
              <Picker className="c-housework-picker" mode='selector' range={homeworkList} onChange={(event) => selectHomeworkType(event, taskIndex)}>
                <AtList>
                  <AtListItem
                    title='家务类型'
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
