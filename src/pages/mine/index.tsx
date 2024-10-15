import Frame from '@/component/Frame';
import Profile from './profile/Profile';
import Progress from './progress/Progress';
import Setting from './setting/Setting';
import Achievement from './achieve/Achievement';
import Common from './common/Common';
import { AtMessage } from 'taro-ui'
import "./index.css"
export default function Mine() {
    return (
        <Frame>
            <AtMessage />
            <Profile></Profile>
            <Common></Common>
            <Progress></Progress>
            <Achievement></Achievement>
            <Setting></Setting>
        </Frame>
    )
}
