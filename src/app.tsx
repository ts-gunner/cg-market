import { PropsWithChildren } from 'react'
import { useLaunch } from '@tarojs/taro'
import { Provider } from "react-redux";
import { store } from "@/store"
import { getPersistor } from "@rematch/persist";
import { PersistGate } from "redux-persist/lib/integration/react";
import './app.less'
import "taro-ui/dist/style/components/input-number.scss"
import "taro-ui/dist/style/components/search-bar.scss"
import "taro-ui/dist/style/components/list.scss"
import "taro-ui/dist/style/components/card.scss"
import "taro-ui/dist/style/components/button.scss"
import "taro-ui/dist/style/components/message.scss"
import "taro-ui/dist/style/components/progress.scss"
import "taro-ui/dist/style/components/icon.scss"

const persistor = getPersistor();
function App({ children }: PropsWithChildren<any>) {
  useLaunch(() => {
    console.log('App launched.')
  })

  return (
    <PersistGate persistor={persistor}>
      <Provider store={store}>
        {children}
      </Provider>
    </PersistGate>
  )
}



export default App
