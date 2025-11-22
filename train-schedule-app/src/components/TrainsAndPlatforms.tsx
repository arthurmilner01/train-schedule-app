import type { TrainsAndPlatformsProps } from "../utils/types"

function TrainsAndPlatforms({ trainData, isBig = false }: TrainsAndPlatformsProps) {

    return (
        <>
        {trainData.map((train, index) => {
            const isLongDestination = isBig ? (train.train_destination.length > 20) : (train.train_destination.length > 25);;
            const textSize = isBig ? "text-2xl" : "text-xl";

            return (
            <div key={index} className={`w-full flex flex-row 
            items-center justify-between gap-4
            ${textSize} whitespace-nowrap`}>
                <div className="flex-1 flex items-center gap-2 min-w-0">
                <span className="flex-shrink-0">
                    {train.train_time}
                </span>
                
                <div className="flex-1 overflow-hidden relative">
                    <p className={`${isLongDestination ? 'animate-scroll-destination' : ''}`}>
                        {train.train_destination}
                    </p>
                </div>
                </div>
                
                <p className="text-right flex-shrink-0">
                Plat {train.platform} Exp: {train.expected_time}
                </p>
            </div>
            )
        })}
        </>
    )
}

export default TrainsAndPlatforms
