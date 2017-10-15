class UserController < ApplicationController
  def clubs
    @clubs = current_user.clubs

    @clubs = @clubs.covering(params[:lng], params[:lat]) if params[:lng] and params[:lat]
  end
end
