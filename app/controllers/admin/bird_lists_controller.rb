class Admin::BirdListsController < ApplicationController
  # GET /bird_lists
  def index
    @bird_lists = BirdList.all.page(params[:page])
  end

  # GET /bird_lists/1
  def show
    @bird_list = BirdList.find(params[:id])
  end

  # GET /bird_lists/new
  def new
    @bird_list = BirdList.new
  end

  # GET /bird_lists/1/edit
  def edit
    @bird_list = BirdList.find(params[:id])
  end

  # POST /bird_lists
  def create
    @bird_list = BirdList.new(bird_list_params)

    if @bird_list.save
      redirect_to admin_bird_lists_url, notice: 'Bird list was successfully created.'
    else
      render :new
    end
  end

  # PATCH/PUT /bird_lists/1
  def update
    @bird_list = BirdList.find(params[:id])
    if @bird_list.update(bird_list_params)
      redirect_to admin_bird_lists_url, notice: 'Bird list was successfully updated.'
    else
      render :edit
    end
  end

  # DELETE /bird_lists/1
  def destroy
    @bird_list = BirdList.find(params[:id])

    @bird_list.destroy
    redirect_to admin_bird_lists_url, notice: 'Bird list was successfully destroyed.'
  end

  private
    # Only allow a trusted parameter "white list" through.
    def bird_list_params
      params.require(:bird_list).permit(:name, :bounding_box)
    end
end
