function calcWeightedGrade(items) {
    if (!Array.isArray(items)) {
        throw new TypeError('items debe ser un arreglo');
    }
    
    if (items.length === 0) {
        throw new RangeError('items no puede estar vacío');
    }
    
    let totalWeight = 0;
    let weightedSum = 0;
    for (let i = 0; i < items.length; i++) {
        const item = items[i];
        
        if (!('score' in item) || !('weight' in item)) {
            throw new TypeError(`Item en índice ${i} debe tener propiedades 'score' y 'weight'`);
        }
        
        const { score, weight } = item;
        
        if (typeof score !== 'number' || typeof weight !== 'number') {
            throw new TypeError(`score y weight deben ser números en el item ${i}`);
        }
        
        if (isNaN(score) || isNaN(weight)) {
            throw new TypeError(`score y weight no pueden ser NaN en el item ${i}`);
        }
        
        if (score < 0 || score > 100) {
            throw new RangeError(`score debe estar entre 0 y 100 en el item ${i}`);
        }
        
        if (weight < 0 || weight > 1) {
            throw new RangeError(`weight debe estar entre 0 y 1 en el item ${i}`);
        }
        
        totalWeight += weight;
        weightedSum += score * weight;
    }
    
    if (Math.abs(totalWeight - 1) > 0.001) {
        throw new RangeError('La suma de los weights debe ser 1 (±0.001)');
    }

    return Math.round(weightedSum * 100) / 100;
}

function percentile(p, values) {
    if (typeof p !== 'number') {
        throw new TypeError('p debe ser un número');
    }
    
    if (isNaN(p)) {
        throw new TypeError('p no puede ser NaN');
    }
    
    if (p < 0 || p > 100) {
        throw new RangeError('p debe estar entre 0 y 100');
    }
    
    if (!Array.isArray(values)) {
        throw new TypeError('values debe ser un arreglo');
    }
    
    if (values.length === 0) {
        throw new RangeError('values debe tener al menos un elemento');
    }
    
    for (let i = 0; i < values.length; i++) {
        if (typeof values[i] !== 'number') {
            throw new TypeError(`Elemento en índice ${i} debe ser un número`);
        }
        if (isNaN(values[i])) {
            throw new TypeError(`Elemento en índice ${i} no puede ser NaN`);
        }
    }
    
    if (p === 0) {
        return Math.round(Math.min(...values) * 100) / 100;
    }
    
    if (p === 100) {
        return Math.round(Math.max(...values) * 100) / 100;
    }
    
    const sortedValues = [...values].sort((a, b) => a - b);
    const n = sortedValues.length;
    
    const rank = Math.ceil((p / 100) * n);
    
    const index = rank - 1;

    return Math.round(sortedValues[index] * 100) / 100;
}

module.exports = {
    calcWeightedGrade,
    percentile
};

