import { Head, Html, Main, NextScript } from 'next/document'

export default function Document() {
    return (
        <Html
            lang={'ru'}
            data-theme={'dark'}
        >
            <Head />
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}
