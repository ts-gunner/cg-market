import { View, Image, Text } from "@tarojs/components"
import { IMAGE_URL } from "@/data/config"
import { AtInputNumber } from 'taro-ui'
import "./index.css"
import { useEffect, useState } from "react"

interface GoodType {
    category: string,
    name: string,
    description: string,
    img: string,
    amount: number
}
export default function Goods({ category, name, description, amount, img }: GoodType) {
    const [expendAmount, setExpendAmount] = useState(0)
    const [haveChange, setHaveChange] = useState(false)
    const [inputNumberClassName, setInputNumberClassName] = useState("")
    const changeAmount = (val: number) => {
        if (!haveChange) {
            setHaveChange(true)
        }
        setExpendAmount(val)
    }
    useEffect(() => {
        if (haveChange) {
            if (expendAmount > 0) {
                setInputNumberClassName("good-item-number-move-on")
            } else {
                setInputNumberClassName("good-item-number-move-back")
            }
        }
    }, [changeAmount])
    return (
        <View className="good-container">
            <View>
                <Image className="good-item-img" src={img}></Image>
            </View>
            <View className="good-item-center">
                <View className="good-item-center-top">
                    <View>
                        <Text className="good-item-primary-text">{name}</Text>
                    </View>
                    <View>
                        <Text className="good-item-sub-text">{description}</Text>
                    </View>
                </View>
                <View className="good-item-center-bottom">
                    <View className="good-item-amount">
                        <Image className="good-item-amount-icon" src={IMAGE_URL["gold"]}></Image>
                        <Text>{expendAmount > 0 ? amount * expendAmount : amount}</Text>
                    </View>
                    <View className="good-item-consume">
                        <View className="good-item-consume-box">
                            <AtInputNumber
                                className={inputNumberClassName}
                                type="number"
                                min={0}
                                max={10}
                                step={1}
                                value={expendAmount}
                                onChange={changeAmount}
                            />
                        </View>

                        {expendAmount > 0 ? (
                            <View className="good-item-consume-box">
                                <Text className="good-item-btn">买入</Text>
                            </View>
                        ) : null}

                    </View>
                </View>

            </View>

        </View>
    )
}
