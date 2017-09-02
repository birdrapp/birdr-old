class Admin::ClubMembershipsController < ApplicationController
  # GET /admin/club_memberships
  def index
    @club_memberships = ClubMembership.all.page(params[:page])
  end

  # GET /admin/club_memberships/1
  def show
    @club_membership = ClubMembership.find(params[:id])
  end

  # GET /admin/club_memberships/new
  def new
    @club_membership = ClubMembership.new
  end

  # GET /admin/club_memberships/1/edit
  def edit
    @club_membership = ClubMembership.find(params[:id])
  end

  # POST /admin/club_memberships
  def create
    @club_membership = ClubMembership.new(club_membership_params)

    if @club_membership.save
      redirect_to admin_club_memberships_url, notice: 'Club membership was successfully created.'
    else
      render :new
    end
  end

  # PATCH/PUT /admin/club_memberships/1
  def update
    @club_membership = ClubMembership.find(params[:id])

    if @club_membership.update(club_membership_params)
      redirect_to admin_club_memberships_url, notice: 'Club membership was successfully updated.'
    else
      render :edit
    end
  end

  # DELETE /admin/club_memberships/1
  def destroy
    @club_membership = ClubMembership.find(params[:id])

    @club_membership.destroy
    redirect_to admin_club_memberships_url, notice: 'Club membership was successfully destroyed.'
  end

  private
    # Only allow a trusted parameter "white list" through.
    def club_membership_params
      params.require(:club_membership).permit(:user_id, :club_id, :status)
    end
end
