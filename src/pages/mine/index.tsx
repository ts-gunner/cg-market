import Frame from '@/component/Frame';
import { View } from '@tarojs/components';
import Profile from './profile/Profile';
import Progress from './progress/Progress';
import Setting from './setting/Setting';
import Achievement from './achieve/Achievement';
import Common from './common/Common';
import { AtMessage, AtToast, AtFab } from 'taro-ui'
import { useSelector, useDispatch } from 'react-redux';
import { RootState, Dispatch } from '@/store';
import "./index.css"
export default function Mine() {
    const isAuth = useSelector((state: RootState) => state.authModel.isAuth)
    const loading = useSelector((state: RootState) => state.authModel.loading)
    const dispatch = useDispatch<Dispatch>()
    return (
        <Frame>
            <AtMessage />
            <View className="refresh-btn">
                <AtFab size='small' onClick={() => dispatch.globalModel.setIsRefresh()}>刷新</AtFab>
            </View>
            <AtToast status="loading" isOpened={loading} text='加载中...' duration={0}></AtToast>
            <Profile></Profile>
            {isAuth ? (
                <>
                    <Common></Common>
                    <Progress></Progress>
                    <Achievement></Achievement>
                </>
            ) : null}
            <Setting></Setting>
        </Frame>
    )
}
