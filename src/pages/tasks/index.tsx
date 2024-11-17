import { View } from '@tarojs/components'
import Frame from "@/component/Frame";
import { AtMessage, AtFab } from 'taro-ui'
import "./index.css"
import { workerRole,monitorRole } from '@/data/config';
import { RootState, Dispatch } from '@/store';
import { useSelector, useDispatch } from 'react-redux';
import UnLogin from '@/component/unLogin/UnLogin';
import UnFound from '@/component/UnFound';
import TaskMonitor from './TaskMonitor';
import TaskWorker from './TaskWorker';



export default function Task() {
    const isAuth = useSelector((state: RootState) => state.authModel.isAuth)
    const roles = useSelector((state: RootState) => state.authModel.roles)
    const dispatch = useDispatch<Dispatch>()
   
    
    const TaskContainer = () => {
        if (isAuth) {
            let wrId = roles.findIndex((role) => role.role_id === workerRole)
            let mrId = roles.findIndex((role) => role.role_id === monitorRole)
            if (wrId !== -1) {
                return <TaskWorker />
            } else if (mrId !== -1) {
                return <TaskMonitor />
            } else {
                return <UnFound />
            }
        }else {
            return <UnLogin />
        }
        
    }
    return (
        <Frame>
            <AtMessage />
            <View className="refresh-btn">
                <AtFab size='small' onClick={() => dispatch.globalModel.setIsRefresh()}>刷新</AtFab>
            </View>
            <TaskContainer />
        </Frame >
    )
}
