class ClubsController < ApplicationController
  before_action :authenticate_user!, except: [:show]
  after_action :verify_authorized

  # GET /clubs
  # GET /clubs.json
  def index
    authorize Club
    @clubs = Club.all
  end

  # GET /clubs/1
  # GET /clubs/1.json
  def show
    @club = Club.find(params[:id])
    authorize @club
  end

  # GET /clubs/new
  def new
    authorize Club
    @club = Club.new
  end

  # GET /clubs/1/edit
  def edit
    @club = Club.find(params[:id])
    authorize @club
  end

  # POST /clubs
  # POST /clubs.json
  def create
    authorize Club
    @club = Club.new(club_params)
    @club.owner = current_user
    @club.users << current_user
    respond_to do |format|
      if @club.save
        format.html { redirect_to @club, notice: 'Club was successfully created.' }
        format.json { render :show, status: :created, location: @club }
      else
        format.html { render :new }
        format.json { render json: @club.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /clubs/1
  # PATCH/PUT /clubs/1.json
  def update
    @club = Club.find(params[:id])
    authorize @club
    respond_to do |format|
      if @club.update(club_params)
        format.html { redirect_to @club, notice: 'Club was successfully updated.' }
        format.json { render :show, status: :ok, location: @club }
      else
        format.html { render :edit }
        format.json { render json: @club.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /clubs/1
  # DELETE /clubs/1.json
  def destroy
    @club = Club.find(params[:id])
    authorize @club
    @club.destroy
    respond_to do |format|
      format.html { redirect_to clubs_url, notice: 'Club was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  # POST /clubs/1/join
  # POST /clubs/1/join.json
  def join
    @club = Club.find(params[:id])
    authorize @club
    @club.club_memberships.create! user_id: current_user.id
    redirect_to action: :show
  end

  # POST /clubs/1/leave
  # POST /clubs/1/leave.json
  def leave
    @club = Club.find(params[:id])
    authorize @club
    @club.club_memberships.where(user_id: current_user).destroy_all
    redirect_to action: :show
  end

  # GET /clubs/1/members
  def members
    @club = Club.find(params[:id])
    authorize @club
  end

  # GET /clubs/1/membership
  def membership
    @club = Club.find(params[:id])
    authorize @club
  end

  # POST /clubs/1/members/1/roles
  def update_roles
    @club = Club.find(params[:id])
    user = User.find(params[:user_id])
    authorize @club
    roles = user.roles(@club)
    role_params = params['roles']
    ['admin', 'reporter'].each do |role|
      if role_params && role_params[role] && !roles.exists?(role: role)
        roles.create!(role: role)
      end
      if (!role_params || !role_params[role]) && roles.exists?(role: role)
        roles.where(role: role).destroy_all
      end
    end
    redirect_to action: :members
  end

  private
    # Never trust parameters from the scary internet, only allow the white list through.
    def club_params
      params.require(:club).permit(
        :name, :short_name, :description,
        :cover_image, :remove_cover_image, :logo, :remove_logo, :recording_area
      )
    end
end
