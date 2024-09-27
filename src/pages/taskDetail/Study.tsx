import { useState } from 'react'
import Frame from '@/component/Frame'
import { IMAGE_URL, MAX_UPLOAD_COUNT } from '@/data/config'
import { View, Text, Image, Picker, Textarea } from '@tarojs/components'
import { chooseImage,navigateBack } from '@tarojs/taro'
import { AtIcon } from 'taro-ui'
import "./study.css"

export default function Study() {
    const [studyDate, setStudyDate] = useState("")
    const [studyStartTime, setStudyStartTime] = useState("")
    const [studyEndTime, setStudyEndTime] = useState("")
    const [uploadList, setUploadList] = useState([] as string[])
    const uploadImage = () => {
        chooseImage({
            count: MAX_UPLOAD_COUNT,
            success: (res) => {
                let arr = [...uploadList]
                for (let filepath of res.tempFilePaths) {
                    arr.push(filepath)
                }
                setUploadList(arr)
            }
        })
    }
    const changeStudyDate = (event: any) => setStudyDate(event.detail.value)
    const changeStudyStartTime = (event: any) => setStudyStartTime(event.detail.value)
    const changeStudyEndTime = (event: any) => setStudyEndTime(event.detail.value)

    const saveStudyInfo = () => {
        // let data = {
        //     date: studyDate,
        //     startTime: studyStartTime,
        //     endTime: studyEndTime
        // }
    }

    const submitStudyInfo = () => {
        saveStudyInfo()
        navigateBack()
    }
    return (
        <Frame>
            <View className="c-study-card">
                <View className="c-study-label">
                    <Text>学习日期:</Text>
                    <Picker mode='date' onChange={changeStudyDate} value={studyDate}>
                        <View className="c-study-time-picker">{studyDate || "选择日期"}</View>
                    </Picker>
                </View>
                <View className="c-study-label">
                    <Text>学习时间:</Text>
                    <Picker mode='time' onChange={changeStudyStartTime} value={studyStartTime}>
                        <View className="c-study-time-picker">{studyStartTime || "起始时间"}</View>
                    </Picker>
                    <Text>至</Text>
                    <Picker mode='time' onChange={changeStudyEndTime} value={studyEndTime}>
                        <View className="c-study-time-picker" >{studyEndTime || "终止时间"}</View>
                    </Picker>
                </View>
                <View className="c-study-label2">
                    <Text style={{ marginLeft: "0.5rem" }}>学习内容:</Text>
                    <View style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <Textarea className='c-study-textarea'></Textarea>

                    </View>
                </View>
                <View className="c-study-label2">
                    <Text style={{ marginLeft: "0.5rem" }}>凭证:</Text>
                    <View className='c-study-media-upload'>
                        {
                            uploadList.map((item, index) => {
                                return (
                                    <View key={index} className='c-study-media-container'>
                                        <Image src={item}
                                            className='c-study-media-img'
                                            mode="aspectFill"
                                        ></Image>
                                        <View className='c-study-center-item c-study-media-close'
                                            onTap={() => setUploadList(uploadList.filter(url => url !== item))}>
                                            <AtIcon value='close' size="0.8rem" />

                                        </View>
                                    </View>
                                )
                            })
                        }
                        {
                            uploadList.length < MAX_UPLOAD_COUNT ? (
                                <View className="c-study-center-item c-study-add-evidence" onTap={uploadImage}>
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
            </View>
            <View className='c-study-center-item'>
                <View className='c-study-button-group'>
                    <View className='c-study-center-item c-study-button-common c-study-button-save' onTap={saveStudyInfo}>保存</View>
                    <View className='c-study-center-item c-study-button-common c-study-button-submit' onTap={submitStudyInfo}>提交</View>
                </View>
            </View>

        </Frame>
    )
}
