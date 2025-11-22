export type TrainData = {
    train_time: string;
    train_destination: string;
    platform: string | number;
    expected_time: string;
    calling_at: string[];
}

export type TrainsAndPlatformsProps = {
    trainData: TrainData[];
    isBig?: boolean;
}

export type NextTrainProps = {
    trainData: TrainData;
}

export type TrainApiResponse = {
    trainServices: Array<{
        std: string;
        etd: string;
        platform: string;
        destination: Array<{
            locationName: string;
        }>;
        subsequentCallingPoints?: Array<{
            callingPoint: Array<{
            locationName: string;
            }>;
        }>;
    }>;
};