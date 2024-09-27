import React from 'react'
import { View } from '@tarojs/components'
export default function Frame(
    { children }: {
        children: React.ReactNode
    }) {
    return (
        <View style={{ display: "flex", justifyContent: "center"}}>
            <View style={{ width: "95%",marginTop: "5%"}}>
                {children}
            </View>
        </View>
    )
}
