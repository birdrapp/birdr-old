class BirdListsController < ApplicationController
  def birds
    @bird_list = BirdList.find_by_country_code!(params[:country_code].upcase)
    @birds = @bird_list.bird_list_birds.ioc_order.includes(:rarity, :bird)
  end
end
