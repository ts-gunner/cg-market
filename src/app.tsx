import { PropsWithChildren } from 'react'
import { useLaunch } from '@tarojs/taro'
import { Provider } from "react-redux";
import { store } from "@/store"
import { getPersistor } from "@rematch/persist";
import { PersistGate } from "redux-persist/lib/integration/react";
import './app.less'
import "taro-ui/dist/style/components/list.scss"

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
