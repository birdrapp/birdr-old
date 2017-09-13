class Admin::RaritiesController < ApplicationController
  # GET /rarities
  def index
    @rarities = Rarity.all.page(params[:page])
  end

  # GET /rarities/1
  def show
    @rarity = Rarity.find(params[:id])
  end

  # GET /rarities/new
  def new
    @rarity = Rarity.new
  end

  # GET /rarities/1/edit
  def edit
    @rarity = Rarity.find(params[:id])
  end

  # POST /rarities
  def create
    @rarity = Rarity.new(rarity_params)

    if @rarity.save
      redirect_to admin_rarities_url, notice: 'Rarity was successfully created.'
    else
      render :new
    end
  end

  # PATCH/PUT /rarities/1
  def update
    @rarity = Rarity.find(params[:id])

    if @rarity.update(rarity_params)
      redirect_to admin_rarities_url, notice: 'Rarity was successfully updated.'
    else
      render :edit
    end
  end

  # DELETE /rarities/1
  def destroy
    @rarity = Rarity.find(params[:id])

    @rarity.destroy
    redirect_to admin_rarities_url, notice: 'Rarity was successfully destroyed.'
  end

  private
    # Only allow a trusted parameter "white list" through.
    def rarity_params
      params.require(:rarity).permit(:name, :level)
    end
end
