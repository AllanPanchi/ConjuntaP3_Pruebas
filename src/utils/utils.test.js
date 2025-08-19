const { calcWeightedGrade, percentile } = require('./utils');

describe('calcWeightedGrade', () => {
    test('debe calcular correctamente una nota ponderada válida', () => {
        const items = [
            { score: 80, weight: 0.6 },
            { score: 90, weight: 0.4 }
        ];
        const result = calcWeightedGrade(items);
        expect(result).toBe(84.00);
    });

    test('debe manejar múltiples componentes', () => {
        const items = [
            { score: 85, weight: 0.3 },
            { score: 90, weight: 0.4 },
            { score: 75, weight: 0.3 }
        ];
        const result = calcWeightedGrade(items);
        expect(result).toBe(84);
    });

    test('debe lanzar TypeError si items no es un arreglo', () => {
        expect(() => calcWeightedGrade(null)).toThrow(TypeError);
        expect(() => calcWeightedGrade("string")).toThrow(TypeError);
        expect(() => calcWeightedGrade(123)).toThrow(TypeError);
    });

    test('debe lanzar RangeError si items está vacío', () => {
        expect(() => calcWeightedGrade([])).toThrow(RangeError);
    });

    test('debe lanzar TypeError si faltan propiedades', () => {
        expect(() => calcWeightedGrade([{ score: 80 }])).toThrow(TypeError);
        expect(() => calcWeightedGrade([{ weight: 0.5 }])).toThrow(TypeError);
    });

    test('debe lanzar TypeError si score o weight no son números', () => {
        expect(() => calcWeightedGrade([{ score: "80", weight: 0.5 }])).toThrow(TypeError);
        expect(() => calcWeightedGrade([{ score: 80, weight: "0.5" }])).toThrow(TypeError);
    });

    test('debe lanzar RangeError si score está fuera del rango 0-100', () => {
        expect(() => calcWeightedGrade([{ score: -1, weight: 1.0 }])).toThrow(RangeError);
        expect(() => calcWeightedGrade([{ score: 101, weight: 1.0 }])).toThrow(RangeError);
    });

    test('debe lanzar RangeError si weight está fuera del rango 0-1', () => {
        expect(() => calcWeightedGrade([{ score: 80, weight: -0.1 }])).toThrow(RangeError);
        expect(() => calcWeightedGrade([{ score: 80, weight: 1.1 }])).toThrow(RangeError);
    });

    test('debe lanzar RangeError si la suma de weights no es 1', () => {
        expect(() => calcWeightedGrade([
            { score: 80, weight: 0.6 },
            { score: 90, weight: 0.3 }
        ])).toThrow(RangeError);
    });

    test('debe aceptar suma de weights con tolerancia ±0.001', () => {
        const items = [
            { score: 80, weight: 0.5005 },
            { score: 90, weight: 0.4995 }
        ];
        expect(() => calcWeightedGrade(items)).not.toThrow();
    });
});

describe('percentile', () => {
    test('debe calcular correctamente percentiles válidos', () => {
        const values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        
        expect(percentile(50, values)).toBe(5.00);
        expect(percentile(25, values)).toBe(3.00);
        expect(percentile(75, values)).toBe(8.00);
    });

    test('debe manejar caso borde p = 0', () => {
        const values = [5, 1, 9, 3, 7];
        expect(percentile(0, values)).toBe(1.00);
    });

    test('debe manejar caso borde p = 100', () => {
        const values = [5, 1, 9, 3, 7];
        expect(percentile(100, values)).toBe(9.00);
    });

    test('debe funcionar con un solo elemento', () => {
        const values = [42];
        expect(percentile(50, values)).toBe(42.00);
        expect(percentile(0, values)).toBe(42.00);
        expect(percentile(100, values)).toBe(42.00);
    });

    test('debe lanzar TypeError si p no es un número', () => {
        expect(() => percentile("50", [1, 2, 3])).toThrow(TypeError);
        expect(() => percentile(null, [1, 2, 3])).toThrow(TypeError);
    });

    test('debe lanzar RangeError si p está fuera del rango 0-100', () => {
        expect(() => percentile(-1, [1, 2, 3])).toThrow(RangeError);
        expect(() => percentile(101, [1, 2, 3])).toThrow(RangeError);
    });

    test('debe lanzar TypeError si values no es un arreglo', () => {
        expect(() => percentile(50, null)).toThrow(TypeError);
        expect(() => percentile(50, "123")).toThrow(TypeError);
    });

    test('debe lanzar RangeError si values está vacío', () => {
        expect(() => percentile(50, [])).toThrow(RangeError);
    });

    test('debe lanzar TypeError si un elemento no es un número', () => {
        expect(() => percentile(50, [1, "2", 3])).toThrow(TypeError);
        expect(() => percentile(50, [1, null, 3])).toThrow(TypeError);
    });

    test('debe manejar valores decimales', () => {
        const values = [1.5, 2.7, 3.1, 4.9, 5.2];
        const result = percentile(60, values);
        expect(typeof result).toBe('number');
        expect(result).toBeCloseTo(3.1, 2);
    });
});
