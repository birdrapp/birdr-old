json.extract! trip, :id, :date, :location, :created_at, :updated_at
json.url trip_url(trip, format: :json)