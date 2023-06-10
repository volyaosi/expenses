import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import store, { AppDispatch, AppState } from '@/app/store'
import {
    Provider,
    TypedUseSelectorHook,
    useDispatch,
    useSelector,
} from 'react-redux'

export default function App({ Component, pageProps }: AppProps) {
    return (
        <Provider store={store}>
            <Component {...pageProps} />
        </Provider>
    )
}
