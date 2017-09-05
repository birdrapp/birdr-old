json.extract! birding_session, :id, :date, :location, :location_name, :location_address, :user_id, :created_at, :updated_at
json.url [:admin, birding_session], format: :json)
