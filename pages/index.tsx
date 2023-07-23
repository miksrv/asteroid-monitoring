import { useGetAsteroidsMutation } from '@/api/api'
import { ApiNasaResponse } from '@/api/types'
import { useLocalStorage } from '@/functions/hooks'
import { NextPage } from 'next'
import React from 'react'

import { Asteroid } from '@/components/asteroid/asteroid.module'
import { Counter } from '@/components/counter/counter.module'
import { Footer } from '@/components/footer/footer.module'
import { Header } from '@/components/header/header.module'

const Main: NextPage = () => {
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
        if (data) {
            setLocalStorage(JSON.stringify(data))
        }
    }, [data])

    return (
        <>
            <Header />
            <div className={'wrapper'}>
                <p>
                    Оповещение об астероидах использует API веб-службы объектов,
                    сближающихся с Землей (NeoWS), НАСА для предоставления самой
                    актуальной информации об астероидах, которые приблизится к
                    Земле сегодня, т. е. 22 июля 2023 года. Нажмите «Астероид»,
                    чтобы получить трехмерное изображение того, где находится
                    астероид в космосе.
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
                    asteroidsData.near_earth_objects?.[currentDate]?.map(
                        (data, index) => (
                            <Asteroid
                                key={index}
                                data={data}
                            />
                        )
                    )}
            </div>
            <Footer />
        </>
    )
}

export default Main
