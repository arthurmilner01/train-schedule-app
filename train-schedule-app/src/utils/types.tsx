export type TrainData = {
    train_time: string;
    train_destination: string;
    platform: string;
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

export type TrainService = {
    std: string;
    etd: string;
    platform: string;
    destination: {
        locationName: string;
    }[];
    subsequentCallingPoints?: {
        callingPoint: {
            locationName: string;
        }[];
    }[];
};

export type CallingPoint = {
    locationName: string;
};