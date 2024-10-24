import Frame from '@/component/Frame';
import Profile from './profile/Profile';
import Progress from './progress/Progress';
import Setting from './setting/Setting';
import Achievement from './achieve/Achievement';
import Common from './common/Common';
import { AtMessage } from 'taro-ui'
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import "./index.css"
export default function Mine() {
    const isAuth = useSelector((state: RootState) => state.authModel.isAuth)
    return (
        <Frame>
            <AtMessage />
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
