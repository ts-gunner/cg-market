import { View, Text } from '@tarojs/components'
import { TaskStatus } from '@/data/typing'
import { CATEGORY } from '@/data/config'
import { navigateTo } from '@tarojs/taro'
import { TaskItemBase } from '@/data/typing'
import "./situation.css"


const TaskItem = ({ task }: { task: TaskItemBase }) => {
    const gotoTaskDetail = () => {
        navigateTo({
            url: `/pages/taskAuditDetail/index?taskID=${task.task_id}`
        })
    }
    return (
        <View className='task-item'>
            <View className='task-item-left'>
                <View>
                    <Text style={{ color: "white", fontWeight: "600" }}>内容: {task.content}</Text>
                </View>
                {task.remark?(
                    <View style={{color: "white", fontSize: "0.8rem", display: "flex"}}>
                        <View>备注: </View>
                        <View style={{color: "white",fontSize: "0.8rem", fontStyle: "italic", fontWeight: "600"}}>{task.remark}</View></View>
                ) : null}
                <View>
                    <Text style={{ color: "white" }}>{task.create_time}</Text>
                </View>
            </View>
            <View style={{color: "white"}}>积分: {task.point}</View>
            <View>
                <View className='task-item-check-btn' onClick={gotoTaskDetail}>查看</View>
            </View>

        </View>
    )
}

export default function TaskSituation({taskList, taskStatus}: {taskList:  TaskItemBase[], taskStatus: TaskStatus}) {
   
    
    return (
        <View>
            {CATEGORY.map((cg) => {
                let task_list = taskList.filter(
                    (tl: TaskItemBase) => tl.category == cg.key && tl.status ===  taskStatus
                ).sort(
                    (a:TaskItemBase, b:TaskItemBase) => b.create_time.localeCompare(a.create_time)
                    )
                return task_list.length > 0 ? (
                    <View className='task-container' key={cg.key}>
                        <Text className='task-text'>{cg.label}</Text>
                        <View className="task-item-box">
                            {
                                task_list.map((task: TaskItemBase) => {
                                    return <TaskItem task={task} key={task.task_id} />
                                })
                            }
                        </View>
                    </View>
                ) : null
            })}
        </View>
    )
}
