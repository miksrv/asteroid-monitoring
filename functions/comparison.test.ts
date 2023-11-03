import '@testing-library/jest-dom'

import { TComparison, comparisonSize } from './comparison'

jest.mock('next/image', () => ({
    __esModule: true,
    default: (data: TComparison) => {
        return `${data.img} ${data.text}`
    }
}))

describe('comparisonSize', () => {
    it('should return the correct image and text for a given asteroid size', () => {
        const testCases: { size: number; expected: TComparison }[] = [
            { expected: { img: {}, text: 'Гитара' }, size: 0 },
            { expected: { img: {}, text: 'Дверь' }, size: 2 },
            { expected: { img: {}, text: 'Машина' }, size: 3 },
            { expected: { img: {}, text: 'Жираф' }, size: 5 },
            { expected: { img: {}, text: 'Автобус' }, size: 8 },
            { expected: { img: {}, text: 'Опора ЛЭП' }, size: 10 },
            { expected: { img: {}, text: 'Пятиэтажное здание' }, size: 13 },
            { expected: { img: {}, text: 'Грузовик с прицепом' }, size: 16 },
            { expected: { img: {}, text: 'Десятиэтажное здание' }, size: 21 },
            { expected: { img: {}, text: 'Самолет' }, size: 41 },
            { expected: { img: {}, text: 'Пизанская башня' }, size: 51 },
            { expected: { img: {}, text: 'Тадж-Махал' }, size: 71 },
            { expected: { img: {}, text: 'Статуя Свободы' }, size: 81 },
            { expected: { img: {}, text: 'Футбольное поле' }, size: 91 },
            { expected: { img: {}, text: 'Великие пирамиды Гизы' }, size: 181 },
            { expected: { img: {}, text: 'Эйфелева башня' }, size: 201 },
            { expected: { img: {}, text: '2X Эйфелева башня' }, size: 401 },
            { expected: { img: {}, text: 'Бурдж-Халифа' }, size: 701 },
            { expected: { img: {}, text: '2X Бурдж-Халифа' }, size: 1001 },
            { expected: { img: {}, text: '3X Бурдж-Халифа' }, size: 2001 },
            { expected: { img: {}, text: '4X Бурдж-Халифа' }, size: 3001 },
            { expected: { img: {}, text: 'Гора Эверест' }, size: 6001 }
        ]

        testCases.forEach((testCase) => {
            const result = comparisonSize(testCase.size)
            expect(result).toEqual(testCase.expected)
        })
    })
})
