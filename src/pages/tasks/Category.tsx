import { View,Image, Text, } from '@tarojs/components'
import { navigateTo } from '@tarojs/taro'
import { CATEGORY,IMAGE_URL } from "@/data/config"
import { AtButton } from 'taro-ui'
import "taro-ui/dist/style/components/button.scss";

export default function Category() {
    const enterCategory = (key: string) => {
        let url = `/pages/taskDetail/index?category=${key}`
        navigateTo({ url })
    }
    return (
        <View style={{
            height: "100%",
        }}>
            {
                CATEGORY.map((item) => {
                    return (
                        <View
                            key={item.key}
                            style={{
                                width: "100%",
                                boxShadow: "0 .125rem .25rem #ccc",
                                borderRadius: "1rem",
                                marginTop: "0.5rem",
                                alignItems: "center",
                                justifyContent: "space-between",
                                display: "flex"
                            }}>
                            <View style={{ display: "flex", alignItems: "center" }}>
                                <View style={{ height: "4rem", backgroundColor: "#009688", width: "0.2rem", marginLeft: "0.5rem" }}></View>
                                <View style={{ marginLeft: "0.5rem" }}>
                                    <Image src={item.img} mode='scaleToFill' style={{ width: "5.5rem", height: "5.5rem" }}></Image>
                                </View>
                                <View>
                                    <View style={{ fontWeight: 700 }}>{item.label}</View>
                                    <View style={{ marginTop: "0.25rem", color: "#949494", fontSize: "0.8rem" }}>{item.description}</View>
                                </View>
                            </View>
                            <View style={{ display: "flex", alignItems: "center" }}>
                                <View style={{ marginRight: "0.5rem" }}>{item.point}</View>
                                <View style={{ marginRight: "0.5rem" }}>
                                    <AtButton className="category-add" onClick={() => enterCategory(item.key)}>添加</AtButton>
                                </View>
                            </View>


                        </View>
                    )
                })
            }

            <View style={{
                height: "5.5rem",
                border: "0.2rem dashed #949494",
                display: "flex",
                borderRadius: "1rem",
                marginTop: "1rem",
                justifyContent: "center",
                alignItems: "center",
            }}>
                <View style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center"
                }}>
                    <Image src={IMAGE_URL['add']} style={{ height: "3rem", width: "3rem" }}></Image>
                    <Text style={{ color: "#949494", fontSize: "0.8rem" }}>可添加其他类别</Text>

                </View>

            </View>

        </View>
    )
}
