json.extract! club, :id, :name, :short_name, :description, :cover_image, :logo, :created_at, :updated_at
json.url admin_club_url(club, format: :json)
