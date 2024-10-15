import { View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { AtCard, AtButton } from "taro-ui"
import storage from '@/utils/storage'
import "./setting.css"
export default function Setting() {
  const clearCache = () => {
    storage.clearItem()
    Taro.atMessage({
      'message': 'Successfully!!',
      'type': "success",
    })
  }
  return (
    <View>
      <AtCard
        className="mine-setting-card"
        title='设置'

      >
        <AtButton onClick={clearCache}>清理缓存</AtButton>
      </AtCard>
    </View>
  )
}
