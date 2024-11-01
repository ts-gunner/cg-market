import Frame from '@/component/Frame';
import Profile from './profile/Profile';
import Progress from './progress/Progress';
import Setting from './setting/Setting';
import Achievement from './achieve/Achievement';
import Common from './common/Common';
import { AtMessage,AtToast } from 'taro-ui'
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import "./index.css"
export default function Mine() {
    const isAuth = useSelector((state: RootState) => state.authModel.isAuth)
    const loading = useSelector((state: RootState) => state.authModel.loading)
    return (
        <Frame>
            <AtMessage />
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
