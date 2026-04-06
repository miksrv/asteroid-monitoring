import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import AsteroidLoadingSpinner from 'asteroid-loading-spinner'
import { Dialog } from 'simple-react-ui-kit'

import { NextPage } from 'next'
import { NextSeo } from 'next-seo'

import API from '@/api/api'
import { ApiNasaResponse } from '@/api/types'
import Asteroid from '@/components/Asteroid'
import Counter from '@/components/Counter'
import Detailed from '@/components/Detailed'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import { formatDate } from '@/tools/date'
import { useLocalStorage } from '@/tools/useLocalStorage'

const HomePage: NextPage = () => {
    const { t } = useTranslation()

    const [asteroidId, setAsteroidId] = React.useState<number | undefined>()

    const currentDate = formatDate(new Date().toISOString(), 'YYYY-MM-DD')
    const [rawAsteroidsData, setAsteroidsData] = useLocalStorage<ApiNasaResponse>('asteroids', {} as ApiNasaResponse)
    const asteroidsData = rawAsteroidsData ?? ({} as ApiNasaResponse)
    const [clientHeight, setClientHeight] = useState<number>(500)

    const needsFetch =
        rawAsteroidsData !== undefined &&
        (Object.keys(asteroidsData).length === 0 ||
            (!!asteroidsData?.near_earth_objects && !asteroidsData?.near_earth_objects?.[currentDate]))

    const { data, isLoading } = API.useGetAsteroidsListQuery(currentDate, { skip: !needsFetch })

    const asteroidDiameters = asteroidsData.near_earth_objects?.[currentDate]
        ?.map((asteroid) => {
            const diameterMax = asteroid.estimated_diameter?.meters?.estimated_diameter_max
            const diameterMin = asteroid.estimated_diameter?.meters?.estimated_diameter_min
            return diameterMax && diameterMin ? Math.round((diameterMax + diameterMin) / 2) : undefined
        })
        ?.filter((diameter) => diameter !== undefined)

    const handleCloseDialog = () => {
        setAsteroidId(undefined)
    }

    useEffect(() => {
        const updateClientHeight = () => {
            if (window?.innerHeight) {
                setClientHeight(document.body.offsetHeight)
            }
        }

        updateClientHeight()

        window.addEventListener('resize', updateClientHeight)

        return () => {
            window.removeEventListener('resize', updateClientHeight)
        }
    }, [])

    useEffect(() => {
        if (data) {
            setAsteroidsData(data)
        }
    }, [data])

    const dialogTitle = `${t('index.orbitDialogTitle')} ${asteroidsData.near_earth_objects?.[currentDate]?.find((item) => item.id === asteroidId)?.name ?? ''}`

    return (
        <>
            <NextSeo
                title={t('index.seoTitle')}
                description={t('index.seoDescription')}
                canonical={'https://asteroid.miksoft.pro'}
                openGraph={{
                    images: [
                        {
                            height: 1536,
                            url: '/images/demo.jpg',
                            width: 2146
                        }
                    ],
                    locale: 'ru',
                    url: 'https://asteroid.miksoft.pro'
                }}
            />

            <Header />

            <div className={'wrapper'}>
                <p>
                    {t('index.description')} <span className={'date'}>{formatDate(currentDate, 'D MMMM YYYY')}</span>
                    {t('index.descriptionSuffix')} <b>{t('index.descriptionCount')}</b> {t('index.descriptionEnd')}
                </p>

                {isLoading || !asteroidsData?.near_earth_objects?.[currentDate] ? (
                    <div className={'loader'}>
                        <h2>{t('index.loadingTitle')}</h2>
                        <h4>{t('index.loadingSubtitle')}</h4>
                        <AsteroidLoadingSpinner />
                    </div>
                ) : (
                    <>
                        <Counter
                            total={asteroidsData?.element_count}
                            dangerous={
                                asteroidsData?.near_earth_objects?.[currentDate]?.filter(
                                    (asteroid) => asteroid.is_potentially_hazardous_asteroid
                                )?.length
                            }
                        />

                        <div className={'asteroidList'}>
                            {[...asteroidsData.near_earth_objects[currentDate]]
                                .sort(({ is_potentially_hazardous_asteroid }) =>
                                    is_potentially_hazardous_asteroid ? -1 : 1
                                )
                                .map((data) => (
                                    <Asteroid
                                        key={data?.id}
                                        data={data}
                                        maxDiameter={Math.max(...(asteroidDiameters || []))}
                                        minDiameter={Math.min(...(asteroidDiameters || []))}
                                        onClick={(id) => setAsteroidId(!!id && id !== asteroidId ? id : undefined)}
                                    />
                                ))}
                        </div>
                    </>
                )}

                <Dialog
                    open={!!asteroidId}
                    showCloseButton={true}
                    onCloseDialog={handleCloseDialog}
                    title={dialogTitle}
                    maxWidth={'90%'}
                >
                    <Detailed
                        asteroidId={asteroidId}
                        clientHeight={clientHeight}
                    />
                </Dialog>
            </div>
            <Footer />
        </>
    )
}

export default HomePage
