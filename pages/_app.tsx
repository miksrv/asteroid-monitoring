import React from 'react'
import { Provider } from 'react-redux'

import { AppProps } from 'next/app'
import Head from 'next/head'

import { wrapper } from '@/api/store'

import '../styles/globals.sass'

const App = ({ Component, pageProps }: AppProps) => {
    const { store, props } = wrapper.useWrappedStore(pageProps)

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
            <Provider store={store}>
                <main>
                    <Component {...props.pageProps} />
                </main>
            </Provider>

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
