class Admin::BirdsController < ApplicationController
  # GET /admin/birds
  # GET /admin/birds.json
  def index
    # Explicitly override the default scope which is to localize birds
    @birds = Bird.includes(:species).all.page(params[:page])
  end

  # GET /admin/birds/1
  # GET /admin/birds/1.json
  def show
    @bird = Bird.find(params[:id])
  end

  # GET /admin/birds/new
  def new
    @bird = Bird.new
  end

  # GET /admin/birds/1/edit
  def edit
    @bird = Bird.find(params[:id])
  end

  # POST /admin/birds
  # POST /admin/birds.json
  def create
    @bird = Bird.new(bird_params)

    respond_to do |format|
      if @bird.save
        format.html { redirect_to admin_birds_path, notice: 'Bird was successfully created.' }
        format.json { render :show, status: :created, location: admin_bird_path(@bird) }
      else
        format.html { render :new }
        format.json { render json: @bird.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /admin/birds/1
  # PATCH/PUT /admin/birds/1.json
  def update
    @bird = Bird.find(params[:id])

    respond_to do |format|
      if @bird.update(bird_params)
        format.html { redirect_to admin_birds_path, notice: 'Bird was successfully updated.' }
        format.json { render :show, status: :ok, location: admin_bird_path(@bird) }
      else
        format.html { render :edit }
        format.json { render json: @bird.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /admin/birds/1
  # DELETE /admin/birds/1.json
  def destroy
    @bird = Bird.find(params[:id])

    @bird.destroy
    respond_to do |format|
      format.html { redirect_to admin_birds_path, notice: 'Bird was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Never trust parameters from the scary internet, only allow the white list through.
    def bird_params
      params.require(:bird).permit(:common_name, :scientific_name, :order, :scientific_family_name, :common_family_name, :sort_position, :species_id_id)
    end
end
