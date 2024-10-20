import { View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { AtCard, AtButton } from "taro-ui"
import {IMAGE_URL} from "@/data/config"
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
        thumb={IMAGE_URL["setting_icon"]}
      >
        <AtButton className='mine-setting-btn' onClick={clearCache}>清理缓存</AtButton>
        <AtButton className='mine-setting-btn' onClick={clearCache}>退出登录</AtButton>
      </AtCard>
    </View>
  )
}
