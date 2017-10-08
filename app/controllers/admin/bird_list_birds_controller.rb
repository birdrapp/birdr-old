class Admin::BirdListBirdsController < ApplicationController
  # GET /admin/bird_list_birds
  def index
    @bird_list_birds = BirdListBird.all.page(params[:page])
  end

  # GET /admin/bird_list_birds/1
  def show
    @bird_list_bird = BirdListBird.find(params[:id])
  end

  # GET /admin/bird_list_birds/new
  def new
    @bird_list_bird = BirdListBird.new
  end

  # GET /admin/bird_list_birds/1/edit
  def edit
    @bird_list_bird = BirdListBird.find(params[:id])
  end

  # POST /admin/bird_list_birds
  def create
    @bird_list_bird = BirdListBird.new(bird_list_bird_params)

    if @bird_list_bird.save
      redirect_to admin_bird_list_birds_url, notice: 'Bird list bird was successfully created.'
    else
      render :new
    end
  end

  # PATCH/PUT /admin/bird_list_birds/1
  def update
    @bird_list_bird = BirdListBird.find(params[:id])

    if @bird_list_bird.update(bird_list_bird_params)
      redirect_to admin_bird_list_birds_url, notice: 'Bird list bird was successfully updated.'
    else
      render :edit
    end
  end

  # DELETE /admin/bird_list_birds/1
  def destroy
    @bird_list_bird = BirdListBird.find(params[:id])

    @bird_list_bird.destroy
    redirect_to admin_bird_list_birds_url, notice: 'Bird list bird was successfully destroyed.'
  end

  private
    # Only allow a trusted parameter "white list" through.
    def bird_list_bird_params
      params.require(:bird_list_bird).permit(:bird_id, :bird_list_id, :rarity_id)
    end
end
