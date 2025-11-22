import { useEffect, useState } from "react";
import CurrentTime from "./components/CurrentTime";
import NextTrain from "./components/NextTrain";
import TrainsAndPlatforms from "./components/TrainsAndPlatforms";
import { getLondonLiverpoolStreetDepartures } from "./services/TrainDetailsAPI";
import type { TrainData } from "./utils/types";


function App() {
  // useState to hold the train data returned by the API
  const [trains, setTrains] = useState<TrainData[]>([])
  // Error state
  const [error, setError] = useState<string | null>(null)

  // Fallback data for if API fails
  const emptyTrain: TrainData = {
    train_time: "--:--",
    train_destination: "----",
    platform: "--",
    expected_time: "--:--",
    calling_at: []
  }

  useEffect(() => {
    const fetchTrains = async () => {
      try {
        const data = await getLondonLiverpoolStreetDepartures()
        // Pad with empty trains to always have 5 total
        const paddedTrains = [...data]
        while (paddedTrains.length < 5) {
          paddedTrains.push(emptyTrain)
        }

        setTrains(paddedTrains)
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch trains")
        console.log({error})
        // On error show 5 empty trains
        setTrains(Array(5).fill(emptyTrain))
      }
    }

    fetchTrains()
    const interval = setInterval(fetchTrains, 30000)
    
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="w-5/6 min-h-screen mx-auto 
    flex flex-col whitespace-nowrap
    items-center justify-center
    font-family-train text-train-text gap-2">
      {trains && trains.length > 0 &&
        <>
        <NextTrain trainData={trains[0]} />
        <TrainsAndPlatforms 
        trainData={trains.slice(1)}
        isBig = {false} 
        />
        </>
      }
      <CurrentTime />
      {error && (
        <p className="text-xs mt-4">
          FAILED TO FETCH TRAIN DETAILS...
        </p>
      ) 
      }
    </div>
  )
}

export default App
