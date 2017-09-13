json.extract! bird_list, :id, :name, :country_code, :created_at, :updated_at
json.url bird_list_url(bird_list, format: :json)
