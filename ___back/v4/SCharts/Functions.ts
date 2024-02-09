import { DataPropsType, DataValueType, DataPT } from "./type";


// x = Datos a contar o rangos.
// f = Frecuencia absoluta ( Numero de veces que se repite el dato ).
// fr = Frecuencia relativa ( fi / SUM(f) )
// F = Frecuencia absoluta acumulada.  
type FrequencyRow = {
    x:number,
    f:number,
    
}

export const frequencyTable = (data: DataPT) => {
    const tb = [];
    const f_total = sum(data);
    let F = 0;
    Object.keys(data).map(x => {
        const f = data[x];
        const fr = f / f_total;
        F += f;
        const Fr = F / f_total;
        tb.push({ x, f, fr, F, Fr })
    })
    return tb;
}

export const interval_number = (n: number) => 1 + (3.322 * Math.log(n));

export const count = (data: DataPT) => Object.keys(data).length;
export const sum = (data: DataPT) => Object.values(data).reduce((acc, val) => acc + val, 0);
export const max = (data: DataPT) => Math.max(...Object.values(data));
export const min = (data: DataPT) => Math.min(...Object.values(data));
export const range = (data: DataPT) => max(data) - min(data);



export const porcent = (val: number, max: number) => (val / max)
export const random = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;
export const color_random = () => "rgb(" + random(100, 220) + ", " + random(50, 150) + ", " + random(190, 255) + ")";


export const simplify_data = (data: DataPropsType) => {
    const dataNew: DataPT = {};
    Object.keys(data).map(k => {
        const o = data[k];
        if (typeof o != "number") dataNew[k] = sum(o);
        else dataNew[k] = o
    })
    return dataNew;
}