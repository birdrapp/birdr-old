class UserController < ApplicationController
  def clubs
    @clubs = current_user.clubs

    @clubs = @clubs.covering(params[:location]) if params[:location]
  end
end
