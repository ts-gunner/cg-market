import { View, Image, Text } from '@tarojs/components';
import Frame from '@/component/Frame';
import { IMAGE_URL } from '@/data/config';
import "./index.css"
export default function Mine() {
    return (
        <Frame>
            <View className='mine-info-container'>

                <View className='mine-info-grid-left'>
                    <View>
                        <Image src={IMAGE_URL["monkey"]} mode='scaleToFill' showMenuByLongpress className='mine-avator'></Image>
                    </View>
                    <View>
                        <View>
                            <Text className='mine-name-text'>杨俊杰</Text>
                        </View>
                        <View>
                            <Text className="mine-role-text">角色：小马喽</Text>
                        </View>
                    </View>
                </View>
                <View className='mine-info-grid-right'>
                    <View style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <Text className='mine-point-string-text'>我的积分</Text>
                    </View>
                    <Text className='mine-point-score-text'>9952222</Text>
                </View>

            </View>

        </Frame>
    )
}
