module ClubsHelper
  def is_member?
    current_user && current_user.is_member_of?(@club)
  end

  def role_names user
    roles = user.roles(@club).map{ |r| r.role.capitalize }
    roles.to_sentence
  end
end
