import Frame from '@/component/Frame';
import Profile from './Profile';
import Achievement from './Achievement';
import { AtMessage } from 'taro-ui'
import Setting from './Setting';
import "./index.css"
export default function Mine() {
    return (
        <Frame>
            <AtMessage />
            <Profile></Profile>
            <Achievement></Achievement>
            <Setting></Setting>
        </Frame>
    )
}
