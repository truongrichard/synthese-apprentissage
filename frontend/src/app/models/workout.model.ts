import { Exercise } from "./exercise.model";
import { ExerciseSet } from "./exerciseSet.model";

export class Workout {
    id?: any;
    title?: string;
    description?: string;
    date?: string;
    exercise?: Exercise;
    exerciseSets?: Array<ExerciseSet>;
}
