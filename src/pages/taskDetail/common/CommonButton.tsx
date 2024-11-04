import { useDispatch } from 'react-redux'
import { Dispatch } from '@/store'
import { navigateBack } from '@tarojs/taro'
import { View } from '@tarojs/components'
import "./common.css"
export default function CommonButton() {
  const dispatch = useDispatch<Dispatch>()
  const saveTaskInfo = () => {
    navigateBack()
  }

  const submitTaskInfo = () => {
    dispatch.taskModel.addTask(null)
  }
  return (
    <View className='c-center-item'>
      <View className='c-button-group'>
        <View className='c-center-item c-button-common c-button-save' onTap={saveTaskInfo}>保存</View>
        <View className='c-center-item c-button-common c-button-submit' onTap={submitTaskInfo}>提交</View>
      </View>
    </View>
  )
}
