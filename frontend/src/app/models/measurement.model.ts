export class Measurement {
    id?: any;
    title?: string;
    description?: string;
    date?: string;
    category?: string;
}

export enum Category {
    WEIGHT = "WEIGHT",
    FAT = "FAT",
    NECK = "NECK",
    SHOULDER = "SHOULDER",
    BICEP = "BICEP",
    FOREARM = "FOREARM",
    CHEST = "CHEST",
    WAIST = "WAIST",
    HIP = "HIP",
    THIGH = "THIGH",
    CALF = "CALF"
}