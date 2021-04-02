import { Workout } from "./workout.model";

export class ExerciseSet {
    id?: any;
    repetitions?: number;
    weight?: number;
    time?: number;
    distance?: number;
    workout?: Workout;
}
