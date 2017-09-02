json.extract! user, :id, :first_name, :last_name, :email, :admin
json.url admin_user_url(user, format: :json)
