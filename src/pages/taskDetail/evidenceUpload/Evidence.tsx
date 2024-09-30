import { View, Text, Image } from '@tarojs/components'
import { chooseImage } from '@tarojs/taro'
import { useSelector, useDispatch } from 'react-redux'
import { RootState, Dispatch } from '@/store'
import { IMAGE_URL, MAX_UPLOAD_COUNT } from '@/data/config'
import { TaskCategory, StudyTaskField, HouseworkTaskFiled } from '@/data/typing'
import { AtIcon } from 'taro-ui'
import "taro-ui/dist/style/components/icon.scss";
import "./evidence.css"

export default function Evidence({taskIndex}) {
    const currentType = useSelector((rootState: RootState) => rootState.taskModel.currentType)
    const taskList = useSelector((rootState: RootState) => {
        let taskModel = rootState.taskModel
        if (currentType === TaskCategory.STUDY) return taskModel.studyTaskData
        else if (currentType === TaskCategory.HOUSEWORK) return taskModel.houseworkTaskData
        else return []
    })
    const dispatch = useDispatch<Dispatch>()

    const uploadImage = (index: number) => {
        let uploadList = taskList[index].uploadList
        let keyName = ""
        if (currentType === TaskCategory.STUDY) keyName = StudyTaskField.UPLOADLIST
        else if (currentType === TaskCategory.HOUSEWORK) keyName = HouseworkTaskFiled.UPLOADLIST
        chooseImage({
            count: MAX_UPLOAD_COUNT,
            success: (res) => {
                let arr = [...uploadList]
                for (let filepath of res.tempFilePaths) {
                    arr.push(filepath)
                }
                dispatch.taskModel.changeTaskItem({ index, keyName, keyValue: arr })
            }
        })
    }
    const deleteUploadImage = (taskIndex: number, uploadURL: string) => {
        let arr = taskList[taskIndex].uploadList.filter(url => url !== uploadURL)
        let keyName = ""
        if (currentType === TaskCategory.STUDY) keyName = StudyTaskField.UPLOADLIST
        else if (currentType === TaskCategory.HOUSEWORK) keyName = HouseworkTaskFiled.UPLOADLIST
        dispatch.taskModel.changeTaskItem({ index: taskIndex, keyName, keyValue: arr })
    }
    return (
        <View className="evidence-upload-card">
            <Text style={{ marginLeft: "0.5rem" }}>凭证:</Text>
            <View className='evidence-media-upload'>
                {
                    taskList[taskIndex].uploadList.map((uploadURL: string, uploadIndex: number) => {
                        return (
                            <View key={uploadIndex} className='evidence-media-container'>
                                <Image src={uploadURL}
                                    className='evidence-media-img'
                                    mode="aspectFill"
                                ></Image>
                                <View className='evidence-center-item evidence-media-close'
                                    onTap={() => deleteUploadImage(taskIndex, uploadURL)}>
                                    <AtIcon value='close' size="0.8rem" />

                                </View>
                            </View>
                        )
                    })
                }
                {
                    taskList[taskIndex].uploadList.length < MAX_UPLOAD_COUNT ? (
                        <View className="evidence-center-item evidence-add-evidence" onTap={() => uploadImage(taskIndex)}>
                            <View style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center"
                            }}>
                                <Image src={IMAGE_URL["add"]} style={{ height: "3rem", width: "3rem" }}></Image>
                            </View>
                        </View>
                    ) : null
                }
            </View>
        </View>
    )
}
