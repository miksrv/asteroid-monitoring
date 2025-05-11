import React, { useEffect } from 'react'
import { Skeleton } from 'simple-react-ui-kit'

import API from '@/api/api'
import Spacemap from '@/components/Spacemap'

type DetailedProps = {
    asteroidId?: number
    clientHeight?: number
}

export const Detailed: React.FC<DetailedProps> = ({ asteroidId, clientHeight = 200 }) => {
    const [getAsteroidData, { data: asteroidData, isLoading: asteroidLoading }] = API.useGetAsteroidDataMutation()

    useEffect(() => {
        if (asteroidId) {
            void getAsteroidData(asteroidId)
        }
    }, [asteroidId])

    return (
        <div style={{ height: `${clientHeight - 200}px` }}>
            {asteroidLoading || !asteroidData?.orbital_data ? (
                <Skeleton style={{ width: '100%', height: '100%' }} />
            ) : (
                <Spacemap
                    asteroidName={asteroidData?.name}
                    orbitalData={asteroidData?.orbital_data}
                />
            )}
        </div>
    )
}

export default Detailed
