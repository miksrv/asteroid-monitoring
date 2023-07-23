import { StaticImageData } from 'next/image'

import img5StoreyBuilding from '@/public/images/5-storey-building.png'
import img10StoreyBuilding from '@/public/images/10-storey-building.png'
import imgAeroplane from '@/public/images/aeroplane.png'
import imgBurjKhalifa from '@/public/images/burj-khalifa.png'
import imgCar from '@/public/images/car.png'
import imgDoor from '@/public/images/door.png'
import imgEiffelTower from '@/public/images/eiffel-tower.png'
import imgElectricPole from '@/public/images/electric-pole.png'
import imgFootballField from '@/public/images/football-field.png'
import imgGiraffe from '@/public/images/giraffe.png'
import imgPyramids from '@/public/images/great-pyramids-of-giza.png'
import imgGuitar from '@/public/images/guitar.png'
import imgKilimanjaro from '@/public/images/kilimanjaro.png'
import imgPisaTower from '@/public/images/leaning-tower-of-pisa.png'
import imgLondonBus from '@/public/images/london-bus.png'
import imgMountEverest from '@/public/images/mount-everest.png'
import imgSemiTrailerTruck from '@/public/images/semi-trailer-truck.png'
import imgStatueLiberty from '@/public/images/statue-of-liberty.png'
import imgTajMahal from '@/public/images/taj-mahal.png'

export type TComparison = {
    img: StaticImageData
    text: string
}

export const comparisonSize = (asteroidSize: number): TComparison => {
    if (asteroidSize <= 1) {
        return {
            img: imgGuitar,
            text: 'Гитара'
        }
    }
    if (asteroidSize <= 2) {
        return {
            img: imgDoor,
            text: 'Дверь'
        }
    }
    if (asteroidSize >= 3 && asteroidSize <= 4) {
        return {
            img: imgCar,
            text: 'Машина'
        }
    }
    if (asteroidSize >= 5 && asteroidSize <= 7) {
        return {
            img: imgGiraffe,
            text: 'Жираф'
        }
    }
    if (asteroidSize >= 8 && asteroidSize <= 9) {
        return {
            img: imgLondonBus,
            text: 'Автобус'
        }
    }
    if (asteroidSize >= 10 && asteroidSize <= 12) {
        return {
            img: imgElectricPole,
            text: 'Опора ЛЭП'
        }
    }
    if (asteroidSize >= 13 && asteroidSize <= 15) {
        return {
            img: img5StoreyBuilding,
            text: 'Пятиэтажное здание'
        }
    }
    if (asteroidSize >= 16 && asteroidSize <= 20) {
        return {
            img: imgSemiTrailerTruck,
            text: 'Грузовик с прицепом'
        }
    }
    if (asteroidSize >= 21 && asteroidSize <= 40) {
        return {
            img: img10StoreyBuilding,
            text: 'Десятиэтажное здание'
        }
    }
    if (asteroidSize >= 41 && asteroidSize <= 50) {
        return {
            img: imgAeroplane,
            text: 'Самолет'
        }
    }
    if (asteroidSize >= 51 && asteroidSize <= 70) {
        return {
            img: imgPisaTower,
            text: 'Пизанская башня'
        }
    }
    if (asteroidSize >= 71 && asteroidSize <= 80) {
        return {
            img: imgTajMahal,
            text: 'Тадж-Махал'
        }
    }
    if (asteroidSize >= 81 && asteroidSize <= 90) {
        return {
            img: imgStatueLiberty,
            text: 'Статуя Свободы'
        }
    }
    if (asteroidSize >= 91 && asteroidSize <= 180) {
        return {
            img: imgFootballField,
            text: 'Футбольное поле'
        }
    }
    if (asteroidSize >= 181 && asteroidSize <= 200) {
        return {
            img: imgPyramids,
            text: 'Великие пирамиды Гизы'
        }
    }
    if (asteroidSize >= 201 && asteroidSize <= 400) {
        return {
            img: imgEiffelTower,
            text: 'Эйфелева башня'
        }
    }
    if (asteroidSize >= 401 && asteroidSize <= 700) {
        return {
            img: imgEiffelTower,
            text: '2X Эйфелева башня'
        }
    }
    if (asteroidSize >= 701 && asteroidSize <= 900) {
        return {
            img: imgBurjKhalifa,
            text: 'Бурдж-Халифа'
        }
    }
    if (asteroidSize >= 901 && asteroidSize <= 1000) {
        return {
            img: imgFootballField,
            text: '10X Футбольных полей'
        }
    }
    if (asteroidSize >= 1001 && asteroidSize <= 2000) {
        return {
            img: imgBurjKhalifa,
            text: '2X Бурдж-Халифа'
        }
    }
    if (asteroidSize >= 2001 && asteroidSize <= 3000) {
        return {
            img: imgBurjKhalifa,
            text: '3X Бурдж-Халифа'
        }
    }
    if (asteroidSize >= 3001 && asteroidSize <= 4000) {
        return {
            img: imgBurjKhalifa,
            text: '4X Бурдж-Халифа'
        }
    }
    if (asteroidSize >= 4001 && asteroidSize <= 6000) {
        return {
            img: imgKilimanjaro,
            text: 'Килиманджаро'
        }
    }
    if (asteroidSize >= 6001 && asteroidSize <= 9000) {
        return {
            img: imgMountEverest,
            text: 'Гора Эверест'
        }
    }

    return {
        img: imgMountEverest,
        text: `${Math.round(asteroidSize / 8000)}X Гора Эверест`
    }
}
