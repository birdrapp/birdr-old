class Admin::LocalizedBirdsController < ApplicationController
  # GET /localized_birds
  def index
    @localized_birds = LocalizedBird.includes(:bird).all.page(params[:page])
  end

  # GET /localized_birds/1
  def show
    @localized_bird = LocalizedBird.find(params[:id])
  end

  # GET /localized_birds/new
  def new
    @localized_bird = LocalizedBird.new
  end

  # GET /localized_birds/1/edit
  def edit
    @localized_bird = LocalizedBird.find(params[:id])
  end

  # POST /localized_birds
  def create
    @localized_bird = LocalizedBird.new(localized_bird_params)

    if @localized_bird.save
      redirect_to admin_localized_birds_url, notice: 'Localized bird was successfully created.'
    else
      render :new
    end
  end

  # PATCH/PUT /localized_birds/1
  def update
    @localized_bird = LocalizedBird.find(params[:id])

    if @localized_bird.update(localized_bird_params)
      redirect_to admin_localized_birds_url, notice: 'Localized bird was successfully updated.'
    else
      render :edit
    end
  end

  # DELETE /localized_birds/1
  def destroy
    @localized_bird = LocalizedBird.find(params[:id])

    @localized_bird.destroy
    redirect_to admin_localized_birds_url, notice: 'Localized bird was successfully destroyed.'
  end

  private
    # Only allow a trusted parameter "white list" through.
    def localized_bird_params
      params.require(:localized_bird).permit(:common_name, :bird_id, :locale, :sort_position)
    end
end
