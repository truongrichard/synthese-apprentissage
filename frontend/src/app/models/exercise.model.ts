export class Exercise {
    id?: any;
    title?: string;
    description?: string;
    bodyPart?: string;
    category?: string;
}

export enum BodyPart {
    ARM = "ARM",
    CHEST = "CHEST",
    STOMACH = "STOMACH",
    SHOULDER = "SHOULDER",
    BACK = "BACK",
    LEG = "LEG",
}

export enum Category {
    BARBELL = "BARBELL",
    DUMBBELL = "DUMBBELL",
    BODYWEIGHT = "BODYWEIGHT",
    CARDIO = "CARDIO",
    DURATION = "DURATION",
    MACHINe = "MACHINe",
}
  