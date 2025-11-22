import type { NextTrainProps } from "../utils/types"
import TrainsAndPlatforms from "./TrainsAndPlatforms";

function NextTrain({ trainData }: NextTrainProps) {

    return (
        <div className="flex flex-col w-full gap-2 
        whitespace-nowrap">
            <TrainsAndPlatforms 
            trainData = {[trainData]} 
            isBig = {true} />
        
            <div className="w-full overflow-hidden">
                <p className="animate-scroll text-md">
                Calling at: {trainData.calling_at.join(', ')}
                </p>
            </div>
        </div>
    )


}

export default NextTrain
