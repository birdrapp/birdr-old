module ClubsHelper
  def is_member?
    current_user && current_user.is_member_of?(@club)
  end
end
