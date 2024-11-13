import { View, Text, Image } from '@tarojs/components'
import { chooseImage } from '@tarojs/taro'
import { useSelector, useDispatch } from 'react-redux'
import { RootState, Dispatch } from '@/store'
import { IMAGE_URL, MAX_UPLOAD_COUNT } from '@/data/config'
import { TaskCategory, StudyTaskField, HouseworkTaskFiled, SportTaskFiled } from '@/data/typing'
import { AtIcon } from 'taro-ui'
import { theme } from '@/data/config'
import "taro-ui/dist/style/components/icon.scss";
import "./evidence.css"

export default function Evidence() {
    const currentType = useSelector((rootState: RootState) => rootState.taskModel.currentType)
    const taskData = useSelector((rootState: RootState) => {
        let taskModel = rootState.taskModel
        if (currentType === TaskCategory.STUDY) return taskModel.studyTaskData
        else if (currentType === TaskCategory.HOUSEWORK) return taskModel.houseworkTaskData
        else if (currentType === TaskCategory.SPORT) return taskModel.sportTaskData
    })
    const dispatch = useDispatch<Dispatch>()

    const uploadImage = () => {
        chooseImage({
            count: MAX_UPLOAD_COUNT,
            success: (res) => {
                let file_list: string[] = []
                for (let filepath of res.tempFilePaths) {
                    file_list.push(filepath)
                }
                dispatch.taskModel.uploadAttachment(file_list)
            }
        })
    }
    const deleteUploadImage = (uploadURL: string) => {
        let arr = taskData?.uploadList.filter(url => url !== uploadURL)
        let keyName = ""
        if (currentType === TaskCategory.STUDY) keyName = StudyTaskField.UPLOADLIST
        else if (currentType === TaskCategory.HOUSEWORK) keyName = HouseworkTaskFiled.UPLOADLIST
        dispatch.taskModel.changeTaskItem({ keyName, keyValue: arr })
    }
    return (
        <View className="evidence-upload-card">
            <Text style={{ marginLeft: "0.5rem" }}>凭证:</Text>
            <View className='evidence-media-upload'>
                {
                    (taskData?.uploadList || []).map((uploadURL: string, uploadIndex: number) => {
                        return (
                            <View key={uploadIndex} className='evidence-media-container'>
                                <Image src={uploadURL}
                                    className='evidence-media-img'
                                    mode="aspectFill"
                                ></Image>
                                <View className='evidence-center-item evidence-media-close'
                                    style={{ backgroundColor: theme.primary1 }}
                                    onTap={() => deleteUploadImage(uploadURL)}>
                                    <AtIcon value='close' size="0.8rem" />

                                </View>
                            </View>
                        )
                    })
                }
                {
                    (taskData?.uploadList || []).length < MAX_UPLOAD_COUNT ? (
                        <View className="evidence-center-item evidence-add-evidence" onTap={uploadImage}>
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
