import { View, Image, Text } from '@tarojs/components';
import Frame from '@/component/Frame';
import {IMAGE_URL} from '@/data/config';
import "./index.css"
export default function Home() {
  return (
    <Frame>
      <View style={{
        backgroundColor: "#009688",
        padding: "1rem",
        display: "flex",
        alignItems: "center",
        borderRadius: "5rem",
        gap: "0.3rem"
      }}>
        <View>
          <Image src={IMAGE_URL["monkey"]} mode='scaleToFill' showMenuByLongpress className='mine-avator'></Image>
        </View>
        <View>
          <View>
            <Text style={{
              color: "#ffffff",
              fontWeight: 700
            }}>杨俊杰</Text>
          </View>
          <View>
            <Text style={{
              color: "#ffffff",
              fontWeight: 500
            }}>角色：小马喽</Text>

          </View>
        </View>
      </View>

    </Frame>
  )
}
