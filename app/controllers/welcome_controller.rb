class WelcomeController < ApplicationController
  before_action :authenticate_user!

  def index
    if current_user.has_no_clubs?
      redirect_to "/clubs"
    end
  end
end
