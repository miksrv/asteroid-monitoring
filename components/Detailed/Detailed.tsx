import React from 'react'
import { Skeleton } from 'simple-react-ui-kit'

import API from '@/api/api'
import ErrorBoundary from '@/components/ErrorBoundary'
import Spacemap from '@/components/Spacemap'

type DetailedProps = {
    asteroidId?: number
    clientHeight?: number
}

export const Detailed: React.FC<DetailedProps> = ({ asteroidId, clientHeight = 200 }) => {
    const {
        data: asteroidData,
        isLoading: asteroidLoading,
        isError
    } = API.useGetAsteroidDataQuery(asteroidId!, {
        skip: !asteroidId
    })

    return (
        <div style={{ height: `${clientHeight - 200}px` }}>
            {isError ? (
                <div>{'Failed to load asteroid data'}</div>
            ) : asteroidLoading || !asteroidData?.orbital_data ? (
                <Skeleton style={{ width: '100%', height: '100%' }} />
            ) : (
                <ErrorBoundary fallback={<div>{'Failed to load 3D map'}</div>}>
                    <Spacemap
                        asteroidName={asteroidData?.name}
                        orbitalData={asteroidData?.orbital_data}
                    />
                </ErrorBoundary>
            )}
        </div>
    )
}

export default Detailed
