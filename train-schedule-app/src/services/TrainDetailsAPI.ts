import type {CallingPoint, TrainApiResponse, TrainService} from "../utils/types";

const HUXLEY_API = "https://huxley2.azurewebsites.net";
const TRAIN_API_KEY = import.meta.env.VITE_TRAIN_API_KEY;

export async function getLondonLiverpoolStreetDepartures() {
    try {
        // Adjust trains returned by changing URL params
        // API URL format: 
        // /departures/{fromStation}/{to}/{toStation}/{numResults}?accessToken={apiKey}&expand=true
        // expand=true includes detailed calling points for each train
        // Example will show Departures from Cambridge (CBG) to London Liverpool Street (LST), 5 results
        const response = await fetch(
            `${HUXLEY_API}/departures/CBG/to/LST/5?accessToken=${TRAIN_API_KEY}&expand=true`
        );

        // If an API call fails
        if (!response.ok) {
            throw new Error(`API error: ${response.status}`);
        }

        // Parse to JSON
        const data: TrainApiResponse = await response.json();
        // If no data returned from API, just return an empty array
        if (!data.trainServices || data.trainServices.length === 0) {
            return [];
        }

        // Formatting API response to match app requirements
        const formattedData = data.trainServices.map((train: TrainService) => ({
            // Train scheduled time of departure
            train_time: train.std || "--:--",
            // Get the train destination name
            train_destination: train.destination[0].locationName || "----",
            // Get platform and return -- if no platform
            platform: String(train.platform || "--"),
            // Getting expected time train will arrive
            expected_time: train.etd || "--:--",
            // Getting all stops trains will call at
            calling_at: train.subsequentCallingPoints?.[0]?.callingPoint.map(
                (point: CallingPoint) => point.locationName
            ) || [],
        }));

        // Remove duplicates based on train time and destination matching
        return formattedData.filter((
                train,
                index,
                self
            ) =>
                index === self.findIndex((t) =>
                    (t.train_time === train.train_time && t.train_destination === train.train_destination)
                )
        );
    } catch (error) {
        console.error("Failed to fetch train data:", error);
        throw error;
    }
}