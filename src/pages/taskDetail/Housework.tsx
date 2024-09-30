import { useSelector, useDispatch } from 'react-redux'
import { RootState, Dispatch } from '@/store'
import Frame from '@/component/Frame'
import { chooseImage, navigateBack, useReady } from '@tarojs/taro'
import { View, Text, Image, Picker, Textarea } from '@tarojs/components'
import { HouseworkTaskFiled, TaskCategory } from '@/data/typing'
import CommonButton from './CommonButton'
import "./housework.css"
export default function Housework() {
  const dispatch = useDispatch<Dispatch>()
  const taskList = useSelector((rootState: RootState) => rootState.taskModel.houseworkTaskData)
  useReady(() => {
    dispatch.taskModel.setCurrentCategory(TaskCategory.HOUSEWORK)
    if (taskList.length === 0) {
      dispatch.taskModel.addTaskItem({
        title: "",
        content: "",
        uploadList: []
      })
    }
  })

  return (
    <Frame>
      {
        taskList.map((taskItem, taskIndex) => {
          return <View key={taskIndex} className="c-housework-card">
            <View className="c-housework-label">
              <Text>家务类型:</Text>

            </View>
          </View>
        })
      }
    <CommonButton />
    </Frame>
  )
}
