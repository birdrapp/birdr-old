class BirdListsController < ApplicationController
  def birds
    lng, lat = params[:lng], params[:lat]

    @bird_list = BirdList.covering(lng, lat)
      .order_by_area
      .first

    @birds = @bird_list.bird_list_birds
      .ioc_order
      .includes(:rarity, :bird)
  end
end
