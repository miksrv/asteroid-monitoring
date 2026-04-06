import React, { useEffect, useState } from 'react'
import { I18nextProvider } from 'react-i18next'
import { Provider } from 'react-redux'

import { AppProps } from 'next/app'
import Head from 'next/head'

import { wrapper } from '@/api/store'
import ErrorBoundary from '@/components/ErrorBoundary'
import i18n from '@/i18n/config'

import '../styles/globals.sass'

const App = ({ Component, pageProps }: AppProps) => {
    const { store, props } = wrapper.useWrappedStore(pageProps)
    const [isI18nReady, setIsI18nReady] = useState(false)

    useEffect(() => {
        // Wait for i18n to be fully initialized with the correct language
        if (i18n.isInitialized) {
            setIsI18nReady(true)
        } else {
            i18n.on('initialized', () => setIsI18nReady(true))
        }
    }, [])

    return (
        <>
            <Head>
                <meta
                    name={'mobile-web-app-capable'}
                    content={'yes'}
                />
                <meta
                    name={'viewport'}
                    content={'width=device-width, initial-scale=1, maximum-scale=1, shrink-to-fit=no'}
                />
                <meta
                    name={'apple-mobile-web-app-status-bar-style'}
                    content={'black-translucent'}
                />
                <meta
                    name={'theme-color'}
                    content={'#2c2d2e'}
                    media={'(prefers-color-scheme: dark)'}
                />
                <meta
                    name={'theme-color'}
                    content={'#2c2d2e'}
                />
                <link
                    rel={'apple-touch-icon'}
                    sizes={'180x180'}
                    href={'/apple-touch-icon.png'}
                />
                <link
                    rel={'icon'}
                    type={'image/png'}
                    sizes={'32x32'}
                    href={'/favicon-32x32.png'}
                />
                <link
                    rel={'icon'}
                    type={'image/png'}
                    sizes={'16x16'}
                    href={'/favicon-16x16.png'}
                />
                <link
                    rel={'manifest'}
                    href={'/site.webmanifest'}
                />
            </Head>
            <I18nextProvider i18n={i18n}>
                <Provider store={store}>
                    <ErrorBoundary fallback={<main>{'Something went wrong. Please reload the page.'}</main>}>
                        <main>{isI18nReady && <Component {...props.pageProps} />}</main>
                    </ErrorBoundary>
                </Provider>
            </I18nextProvider>

            {process.env.NODE_ENV === 'production' && (
                <div
                    dangerouslySetInnerHTML={{
                        __html: '<!-- Yandex.Metrika counter --> <script type="text/javascript" > (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)}; m[i].l=1*new Date(); for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }} k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)}) (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym"); ym(100932980, "init", { clickmap:true, trackLinks:true, accurateTrackBounce:true }); </script> <noscript><div><img src="https://mc.yandex.ru/watch/100932980" style="position:absolute; left:-9999px;" alt="" /></div></noscript> <!-- /Yandex.Metrika counter -->'
                    }}
                />
            )}
        </>
    )
}

export default App
