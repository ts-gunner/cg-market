import { View } from '@tarojs/components'
import { login, openSetting } from '@tarojs/taro'
import Taro from '@tarojs/taro'
import { AtCard, AtButton } from "taro-ui"
import { IMAGE_URL } from "@/data/config"
import storage from '@/utils/storage'
import { useSelector, useDispatch } from 'react-redux';
import { RootState, Dispatch } from '@/store';
import "./setting.css"
export default function Setting() {
  const dispatch = useDispatch<Dispatch>()
  const isAuth = useSelector((state: RootState) => state.authModel.isAuth)
  const clearCache = () => {
    storage.clearItem()
    Taro.atMessage({
      'message': 'Successfully!!',
      'type': "success",
      "duration": 2000
    })
  }
  const cgLogin = () => {
    login({
      success: (res) => {
        dispatch.authModel.login(res.code)
      }
    })

  }

  const cgLogout = () => {
    dispatch.authModel.logout()
 
  }

  const getUserSetting = () => {
    // 获取用户的当前设置。
    openSetting({
      success: (res) => {
        console.log("Setting", res)
      }
    })
  }
  return (
    <View>
      <AtCard
        className="mine-setting-card"
        title='设置'
        thumb={IMAGE_URL["setting_icon"]}
      >
        {isAuth ? (
          <>
            <AtButton className='mine-setting-btn' onClick={getUserSetting}>查看权限</AtButton>
            <AtButton className='mine-setting-btn' onClick={clearCache}>清理缓存</AtButton>
            <AtButton className='mine-setting-btn' onClick={cgLogout}>退出登录</AtButton>
          </>
        ) : (
          <>
            <AtButton className='mine-setting-btn' onClick={cgLogin}>登录</AtButton>
          </>
        )}

      </AtCard>
    </View>
  )
}
