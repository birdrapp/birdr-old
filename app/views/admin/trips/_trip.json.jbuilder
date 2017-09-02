json.extract! trip, :id, :date, :location, :user_id, :created_at, :updated_at
json.url admin_trip_url(trip, format: :json)
