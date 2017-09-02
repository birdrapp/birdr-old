json.extract! bird_record, :id, :bird_id, :birding_session_id, :created_at, :updated_at
json.url bird_record_url(bird_record, format: :json)
