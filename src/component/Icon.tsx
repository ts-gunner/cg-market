import { Image } from '@tarojs/components'
export default function Icon({url}: {url:string}) {
  return (
    <Image src={url} style={{width: "40px", height: "40px"}}></Image>
  )
}
