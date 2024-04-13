import { color_random } from "./Functions"
import { Data } from "./type"

export default class FrecuencyTable {
    private data: Data
    intervals_color: string[]
    intervals: string[]
    frequency_data: number[]
    frequency: number[]
    relative_frequency: number[]
    acumulated_frequency: number[]
    acumulated_relative_frequency: number[]
    range: number;
    scale: number;
    parts = 5;
    niveles = []
    constructor(data: Data) {
        this.data = this.descomponer(data);
        this.calculate();
    }
    descomponer(data: Data, kp = "", index = 0) {
        let nobj = {};
        Object.keys(data).map(key => {
            let elm = data[key];
            if (!this.niveles[index]) this.niveles[index] = [];
            let indexEncontrado = this.niveles[index].findIndex(a => a == key);
            if (indexEncontrado <= -1) {
                this.niveles[index].push(key)
            }
            if (typeof elm == "number") {
                nobj[kp + key] = elm;
            } else {
                nobj = {
                    ...nobj,
                    ...this.descomponer(elm, kp + key + "-", index + 1)
                }
            }
        })
        return nobj;
    }
    print() {
        console.log("intervals", this.intervals)
        console.log("frequency", this.frequency)
        console.log("relative_frequency", this.relative_frequency)
        console.log("acumulated_frequency", this.acumulated_frequency)
        console.log("acumulated_relative_frequency", this.acumulated_relative_frequency)

    }

    min(arrName: keyof FrecuencyTable) {
        const arr: any = this[arrName];
        if (Array.isArray(arr) && arr.every(item => typeof item == 'number')) return Math.min(...arr);
        return 0;
    }
    max(arrName: keyof FrecuencyTable) {
        const arr: any = this[arrName];
        if (Array.isArray(arr) && arr.every(item => typeof item == 'number')) return Math.max(...arr);
        return 0;
    }
    sum(arrName: keyof FrecuencyTable) {
        const arr: any = this[arrName];
        if (Array.isArray(arr) && arr.every(item => typeof item === 'number')) return arr.reduce((a, b) => a + b, 0);
        return 0;
    }
    sumABS(arrName: keyof FrecuencyTable) {
        const arr: any = this[arrName];
        if (Array.isArray(arr) && arr.every(item => typeof item === 'number')) return arr.reduce((a, b) => Math.abs(a) + Math.abs(b), 0);
        return 0;
    }
    calculate() {

        this.calc_intervals();
        this.calc_intervals_color();
        this.calc_frequency_data();
        this.calc_range();
        this.calc_scale();
        this.calc_frequency();
        // this.calc_total_frequency();
        this.calc_relative_frequency();
        this.calc_acumulated_frequency();
        this.calc_acumulated_relative_frequency();
    }

    private calc_intervals() {
        this.intervals = Object.keys(this.data);
    }
    private calc_intervals_color() {
        this.intervals_color = this.intervals.map((a) => color_random());
    }

    private calc_range() {
        const max = this.max("frequency_data");
        // const min = this.min("frequency_data");
        this.range = max;
    }
    private calc_scale() {
        this.scale = Math.round((this.range / 0.95) / this.parts);
    }
    private calc_frequency_data() {
        this.frequency_data = Object.values(this.data);
    }
    private calc_frequency() {
        const max = this.max("frequency_data");
        const min = this.min("frequency_data");
        let ajuste = 0;
        if (min < 0) {
            ajuste = min * -1;
        }
        this.frequency = Object.values(this.data).map(a => {
            return a + ajuste;
        });
    }

    private calc_relative_frequency() {
        // const total_frequency = this.sumABS("frequency");
        const total_frequency = this.sum("frequency");
        // const total_frequency = this.max("frequency") - this.min("frequency")
        this.relative_frequency = this.frequency.map(f => f / total_frequency)
    }
    private calc_acumulated_frequency() {
        let acum = 0;
        this.acumulated_frequency = this.frequency.map(f => {
            const fa = f + acum;
            acum += f;
            return fa;
        })
    }
    private calc_acumulated_relative_frequency() {
        const total_frequency = this.sum("frequency");
        this.acumulated_relative_frequency = this.acumulated_frequency.map(f => f / total_frequency)
    }




}   
