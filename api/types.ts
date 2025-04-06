export interface ApiNasaResponse {
    links?: {
        next: string
        prev: string
        self: string
    }
    element_count?: number
    near_earth_objects?: {
        [key: string]: AsteroidData[]
    }
}

export interface AsteroidData {
    links?: {
        self: string
    }
    id?: number
    neo_reference_id?: number
    name?: string
    nasa_jpl_url?: string
    absolute_magnitude_h?: number
    estimated_diameter?: {
        kilometers?: {
            estimated_diameter_min: number
            estimated_diameter_max: number
        }
        meters?: {
            estimated_diameter_min: number
            estimated_diameter_max: number
        }
        miles?: {
            estimated_diameter_min: number
            estimated_diameter_max: number
        }
        feet?: {
            estimated_diameter_min: number
            estimated_diameter_max: number
        }
    }
    is_potentially_hazardous_asteroid?: boolean
    close_approach_data?: AsteroidApproach[]
    is_sentry_object?: boolean
}

export interface AsteroidApproach {
    close_approach_date?: string
    close_approach_date_full?: string
    epoch_date_close_approach?: number
    relative_velocity?: {
        kilometers_per_second: number
        kilometers_per_hour: number
        miles_per_hour: number
    }
    miss_distance?: {
        astronomical: number
        lunar: number
        kilometers: number
        miles: number
    }
    orbiting_body?: OrbitingBody | string
}

export enum OrbitingBody {
    Earth
}


/// -------------/ NASA API RESPONSE -------------

export interface NasaLinks {
    self: string
}

export interface EstimatedDiameter {
    estimated_diameter_min: number
    estimated_diameter_max: number
}

export interface RelativeVelocity {
    kilometers_per_second: string
    kilometers_per_hour: string
    miles_per_hour: string
}

export interface MissDistance {
    astronomical: string
    lunar: string
    kilometers: string
    miles: string
}

export interface CloseApproachData {
    close_approach_date: string
    close_approach_date_full: string
    epoch_date_close_approach: number
    relative_velocity: RelativeVelocity
    miss_distance: MissDistance
    orbiting_body: string
}

export interface OrbitalData {
    orbit_id: string
    orbit_determination_date: string
    first_observation_date: string
    last_observation_date: string
    data_arc_in_days: number
    observations_used: number
    orbit_uncertainty: string
    minimum_orbit_intersection: string
    jupiter_tisserand_invariant: string
    epoch_osculation: string
    eccentricity: string
    semi_major_axis: string
    inclination: string
    ascending_node_longitude: string
    orbital_period: string
    perihelion_distance: string
    perihelion_argument: string
    aphelion_distance: string
    perihelion_time: string
    mean_anomaly: string
    mean_motion: string
    equinox: string
    orbit_class: {
        orbit_class_type: string
        orbit_class_description: string
        orbit_class_range: string
    }
}

export interface Asteroid {
    links: NasaLinks
    id: string
    neo_reference_id: string
    name: string
    designation: string
    nasa_jpl_url: string
    absolute_magnitude_h: number
    estimated_diameter: {
        kilometers: EstimatedDiameter
        meters: EstimatedDiameter
        miles: EstimatedDiameter
        feet: EstimatedDiameter
    }
    is_potentially_hazardous_asteroid: boolean
    close_approach_data: CloseApproachData[]
    orbital_data: OrbitalData
    is_sentry_object: boolean
}
