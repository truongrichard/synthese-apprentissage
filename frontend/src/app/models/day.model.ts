import { Workout } from "./workout.model";
import { Measurement } from "./measurement.model";

export class Day {
    id?: any;
    date?: string;
    workouts?: Array<Workout>;
    measurements?: Array<Measurement>;
}
