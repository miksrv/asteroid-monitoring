import { useGetAsteroidsMutation } from '@/api/api'
import { ApiNasaResponse } from '@/api/types'
import { useLocalStorage } from '@/functions/hooks'
import isEmpty from 'lodash-es/isEmpty'
import { NextPage } from 'next'
import { NextSeo } from 'next-seo'
import React from 'react'

import { Asteroid } from '@/components/asteroid/asteroid.module'
import { Counter } from '@/components/counter/counter.module'
import { Footer } from '@/components/footer/footer.module'
import { Header } from '@/components/header/header.module'

const MainPage: NextPage = () => {
    const currentDate = new Date(new Date() + 'Z').toJSON().slice(0, 10)
    const [localStorage, setLocalStorage] = useLocalStorage('asteroids', '')
    const [getAsteroids, { data }] = useGetAsteroidsMutation()

    const asteroidsData: ApiNasaResponse = React.useMemo(
        () => (localStorage ? JSON.parse(localStorage) : {}),
        [localStorage]
    )

    React.useEffect(() => {
        if (localStorage !== undefined && !localStorage) {
            getAsteroids(currentDate)
        }
    }, [localStorage])

    React.useEffect(() => {
        if (
            !isEmpty(asteroidsData) &&
            !asteroidsData.near_earth_objects?.[currentDate]
        ) {
            getAsteroids(currentDate)
        }
    }, [asteroidsData, currentDate])

    React.useEffect(() => {
        if (data) {
            setLocalStorage(JSON.stringify(data))
        }
    }, [data])

    return (
        <>
            <NextSeo
                title={'Мониторинг астероидов'}
                description={
                    'Система мониторинга астероидов использует API сервиса NASA (NeoWS) для отслеживания сближающихся с Землей объектов.'
                }
                openGraph={{
                    images: [
                        {
                            height: 819,
                            url: '/images/main-page.jpg',
                            width: 1280
                        }
                    ],
                    locale: 'ru'
                }}
            />
            <Header />
            <div className={'wrapper'}>
                <p>
                    Система мониторинга астероидов использует API сервиса NASA
                    (NeoWS) для отслеживания сближающихся с Землей объектов.
                    Данный сервис предоставляет актуальнные данные по всем
                    астероидам, которые сближаются с Землей сегодня, т.е.{' '}
                    <span className={'date'}>{currentDate}</span>. Если астероид
                    пересекает орбиту Земли, то он считается как потенциально
                    опасный астероид, представляющий угрозу нашей планете. В
                    настоящий момент в базе данных астероидов насчитывается
                    порядка <b>33 тысяч</b> объектов и каждый год эта база
                    расширяется.
                </p>
                <Counter
                    total={asteroidsData?.element_count}
                    dangerous={
                        asteroidsData?.near_earth_objects?.[
                            currentDate
                        ]?.filter(
                            (asteroid) =>
                                asteroid.is_potentially_hazardous_asteroid
                        )?.length
                    }
                />
                {asteroidsData &&
                    asteroidsData.near_earth_objects?.[currentDate]
                        ?.sort(({ is_potentially_hazardous_asteroid }) =>
                            is_potentially_hazardous_asteroid ? -1 : 1
                        )
                        .map((data, index) => (
                            <Asteroid
                                key={index}
                                data={data}
                            />
                        ))}
            </div>
            <Footer />
        </>
    )
}

export default MainPage
