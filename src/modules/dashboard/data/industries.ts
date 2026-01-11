import { Droplet, Factory, Fish } from 'lucide-react';
import { IndustriesMap } from '../types';

export const industries: IndustriesMap = {
    textil: {
        name: 'Textil',
        score: 42,
        regulatory: 'red',
        insight: 'Alto uso de colorantes sintéticos y solventes tóxicos',
        processes: 'Tinturado y acabado textil',
        icon: Droplet
    },
    mineria: {
        name: 'Minería',
        score: 38,
        regulatory: 'red',
        insight: 'Uso intensivo de cianuro y metales pesados',
        processes: 'Lixiviación y procesamiento de minerales',
        icon: Factory
    },
    pesquera: {
        name: 'Pesquera',
        score: 65,
        regulatory: 'yellow',
        insight: 'Procesos mayormente sostenibles, mejoras en conservantes',
        processes: 'Conservación y procesamiento de productos marinos',
        icon: Fish
    }
};
