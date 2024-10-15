import { View, Image, Text } from '@tarojs/components';
import { IMAGE_URL,theme } from '@/data/config';
import "./profile.css"
export default function Profile() {
    return (

        <View className='mine-info-container' style={{backgroundColor: theme.primary1}}>

            <View className='mine-info-grid-left' style={{backgroundColor: theme.primary1}}>
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
                <Text className='mine-point-score-text'>995223</Text>
            </View>

        </View>
    )
}
