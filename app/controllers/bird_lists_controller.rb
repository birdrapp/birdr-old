class BirdListsController < ApplicationController
  def birds
    @bird_list = BirdList.covering(params[:point])
      .order_by_area

    @birds = @bird_list.bird_list_birds
      .ioc_order
      .includes(:rarity, :bird)
  end
end
