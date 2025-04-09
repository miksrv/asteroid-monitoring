import React, { useEffect } from 'react'
import AsteroidLoadingSpinner from 'asteroid-loading-spinner'
import { NextPage } from 'next'
// import { useTranslation } from 'next-i18next'
import { NextSeo } from 'next-seo'
import { Skeleton } from 'simple-react-ui-kit'

import API from '@/api/api'
import { ApiNasaResponse, AsteroidData } from '@/api/types'
import Asteroid from '@/components/Asteroid'
import Counter from '@/components/Counter'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import Spacemap from '@/components/Spacemap'
import { formatDate } from '@/tools/date'
import { useLocalStorage } from '@/tools/useLocalStorage'
import Dialog from '@/ui/dialog'

const HomePage: NextPage = () => {
    // const { t } = useTranslation()

    const [asteroidId, setAsteroidId] = React.useState<number | undefined>()
    const [localAsteroidData, setLocalAsteroidData] = React.useState<AsteroidData | undefined>()

    const currentDate = formatDate(new Date().toISOString(), 'YYYY-MM-DD')
    const [localStorage, setLocalStorage] = useLocalStorage<string>('asteroids', '{}')
    const [getAsteroidsList, { data, isLoading }] = API.useGetAsteroidsListMutation()
    const [getAsteroidData, { data: asteroidData, isLoading: asteroidLoading }] = API.useGetAsteroidDataMutation()

    const asteroidsData: ApiNasaResponse = React.useMemo(
        () => (localStorage ? JSON.parse(localStorage) : {}),
        [localStorage]
    )

    React.useEffect(() => {
        if (
            localStorage === '{}' ||
            (!!asteroidsData?.near_earth_objects && !asteroidsData?.near_earth_objects?.[currentDate])
        ) {
            getAsteroidsList(currentDate)
        }
    }, [asteroidsData, asteroidsData, currentDate])

    useEffect(() => {
        if (data) {
            setLocalStorage(JSON.stringify(data))
        }
    }, [data])

    useEffect(() => {
        setLocalAsteroidData(asteroidData)
    }, [asteroidData])

    const asteroidDiameters = asteroidsData.near_earth_objects?.[currentDate]
        ?.map((asteroid) => {
            const diameterMax = asteroid.estimated_diameter?.meters?.estimated_diameter_max
            const diameterMin = asteroid.estimated_diameter?.meters?.estimated_diameter_min
            return diameterMax && diameterMin ? Math.round((diameterMax + diameterMin) / 2) : undefined
        })
        ?.filter((diameter) => diameter !== undefined)

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
                            url: '/images/demo.jpg',
                            width: 1280
                        }
                    ],
                    locale: 'ru'
                }}
            />
            <Header />
            <div className={'wrapper'}>
                <p>
                    Система мониторинга астероидов использует API сервиса NASA (NeoWS) для отслеживания сближающихся с
                    Землей объектов. Данный сервис предоставляет актуальнные данные по всем астероидам, которые
                    сближаются с Землей сегодня, т.е.{' '}
                    <span className={'date'}>{formatDate(currentDate, 'D MMMM YYYY')}</span>. Если астероид пересекает
                    орбиту Земли, то он считается как потенциально опасный астероид, представляющий угрозу нашей
                    планете. В настоящий момент в базе данных астероидов насчитывается порядка <b>33 тысяч</b> объектов
                    и каждый год эта база расширяется.
                </p>
                <Counter
                    total={asteroidsData?.element_count}
                    dangerous={
                        asteroidsData?.near_earth_objects?.[currentDate]?.filter(
                            (asteroid) => asteroid.is_potentially_hazardous_asteroid
                        )?.length
                    }
                />
                {isLoading && (
                    <div className={'loader'}>
                        <h2>Пожалуста, подождите</h2>
                        <h4>Ищем приближающиеся к Земле астеродиы</h4>
                        <AsteroidLoadingSpinner />
                    </div>
                )}
                {asteroidsData &&
                    asteroidsData.near_earth_objects?.[currentDate]
                        ?.sort(({ is_potentially_hazardous_asteroid }) => (is_potentially_hazardous_asteroid ? -1 : 1))
                        .map((data) => (
                            <Asteroid
                                key={data?.id}
                                data={data}
                                maxDiameter={Math.max(...(asteroidDiameters || []))}
                                minDiameter={Math.min(...(asteroidDiameters || []))}
                                onClick={(id) => {
                                    if (!!id && id !== asteroidId) {
                                        getAsteroidData(id)
                                        setAsteroidId(id)
                                        setLocalAsteroidData(undefined)
                                    } else {
                                        setLocalAsteroidData(undefined)
                                        setAsteroidId(undefined)
                                    }
                                }}
                            />
                        ))}

                <Dialog
                    open={!!asteroidId}
                    onCloseDialog={() => {
                        setAsteroidId(undefined)
                        setLocalAsteroidData(undefined)
                    }}
                    maxWidth={'90%'}
                >
                    {asteroidLoading ? (
                        <Skeleton style={{ width: '100%', minHeight: '500px' }} />
                    ) : (
                        <Spacemap orbitalData={localAsteroidData?.orbital_data} />
                    )}
                </Dialog>
            </div>
            <Footer />
        </>
    )
}

export default HomePage
