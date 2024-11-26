import { prepareData } from "./chart-utils";

describe('prepareData', () => {
    test('prepareData with empty data', () => {
        // given
        const data = {};

        // when
        const preparedData = prepareData(data);

        // then
        expect(preparedData).toEqual([]);
    });

    test('prepareData with data', () => {
        // given
        const data = {
            force: 10,
            intelligence: 20,
            energy: 30,
            speed: 40,
            durability: 50,
            fighting: 60,
        };

        // when
        const preparedData = prepareData(data);

        // then
        expect(preparedData).toEqual([
            { name: 'Force', value: 10 },
            { name: 'Intelligence', value: 20 },
            { name: 'Energy', value: 30 },
            { name: 'Speed', value: 40 },
            { name: 'Durability', value: 50 },
            { name: 'Fighting', value: 60 },
        ]);
    });

    test('prepareData with data with undefined values', () => {
        // given
        const data = {
            force: undefined,
            intelligence: 20,
            energy: 30,
            speed: 40,
            durability: undefined,
            fighting: 60,
        };

        // when
        const preparedData = prepareData(data);

        // then
        expect(preparedData).toEqual([
            { name: 'Intelligence', value: 20 },
            { name: 'Energy', value: 30 },
            { name: 'Speed', value: 40 },
            { name: 'Fighting', value: 60 },
        ]);
    });

    test('prepareData with data with null values', () => {
        // given

        // when
        const preparedData = prepareData();

        // then
        expect(preparedData).toEqual([]);
    });
});