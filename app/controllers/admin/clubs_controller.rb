class Admin::ClubsController < ApplicationController
  # GET /admin/clubs
  def index
    @clubs = Club.all.page(params[:page])
  end

  # GET /admin/clubs/1
  def show
    @club = Club.find(params[:id])
  end

  # GET /admin/clubs/new
  def new
    @club = Club.new
  end

  # GET /admin/clubs/1/edit
  def edit
    @club = Club.find(params[:id])
  end

  # POST /admin/clubs
  def create
    @club = Club.new(club_params)

    if @club.save
      redirect_to admin_clubs_url, notice: 'Club was successfully created.'
    else
      render :new
    end
  end

  # PATCH/PUT /admin/clubs/1
  def update
    @club = Club.find(params[:id])

    if @club.update(club_params)
      redirect_to admin_clubs_url, notice: 'Club was successfully updated.'
    else
      render :edit
    end
  end

  # DELETE /admin/clubs/1
  def destroy
    @club = Club.find(params[:id])

    @club.destroy
    redirect_to admin_clubs_url, notice: 'Club was successfully destroyed.'
  end

  private
    # Only allow a trusted parameter "white list" through.
    def club_params
      params.require(:club).permit(:name, :short_name, :description, :cover_image, :logo)
    end
end
