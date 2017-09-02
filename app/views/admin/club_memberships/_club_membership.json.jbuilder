json.extract! club_membership, :id, :user_id, :club_id, :status, :created_at, :updated_at
json.url club_membership_url(club_membership, format: :json)
