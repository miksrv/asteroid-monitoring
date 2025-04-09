import React from 'react'
import { Provider } from 'react-redux'
import { AppProps } from 'next/app'
import Head from 'next/head'

import '../styles/globals.sass'

import { wrapper } from '@/api/store'

const App = ({ Component, pageProps }: AppProps) => {
    const { store, props } = wrapper.useWrappedStore(pageProps)

    return (
        <>
            <Head>
                <meta
                    name='viewport'
                    content='width=device-width, initial-scale=1, shrink-to-fit=no'
                />
                <link
                    rel='shortcut icon'
                    href='/favicon.png'
                    key='shortcutIcon'
                />
                <link
                    rel='manifest'
                    href='/manifest.json'
                />
                <link
                    rel='icon'
                    href='/favicon.png'
                    sizes='any'
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
