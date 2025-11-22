# Train Departure Board App

## Setup
### 1. Setup and Configure API Credentials
First create a `.env` file in the root directory which 
mimics `.env.example` and populate it with an active API key
from the National Rail Open Data Portal.
You can request a key [here](https://opendata.nationalrail.co.uk/).
### 2. Build and Run
```bash
# Build the Docker image
docker compose build

# Start the application
docker compose up
```

The app will be available at `http://localhost`

## Additional Information
By default the app fetches the next 5 trains from Cambridge to London Liverpool Street, 
to modify the trains being displayed edit the API URL in 
```
/train-schedule-app/src/services/TrainDetailsAPI.ts
```

You can change:
- Departure station (e.g. `CBG` for Cambridge)
- Destination station (e.g. `LST` for London Liverpool Street)
