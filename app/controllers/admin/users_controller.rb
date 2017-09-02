class Admin::UsersController < ApplicationController
  # GET /admin/users
  def index
    @users = User.all.page(params[:page])
  end

  # GET /admin/users/1
  def show
    @user = User.find(params[:id])
  end

  # GET /admin/users/new
  def new
    @user = User.new
  end

  # GET /admin/users/1/edit
  def edit
    @user = User.find(params[:id])
  end

  # POST /admin/users
  def create
    @user = User.new(user_params)

    if @user.save
      redirect_to admin_users_url, notice: 'User was successfully created.'
    else
      render :new
    end
  end

  # PATCH/PUT /admin/users/1
  def update
    @user = User.find(params[:id])

    if @user.update(user_params)
      redirect_to admin_users_url, notice: 'User was successfully updated.'
    else
      render :edit
    end
  end

  # DELETE /admin/users/1
  def destroy
    @user = User.find(params[:id])

    @user.destroy
    redirect_to admin_users_url, notice: 'User was successfully destroyed.'
  end

  private
    # Only allow a trusted parameter "white list" through.
    def user_params
      params.require(:user).permit(:first_name, :last_name, :email, :admin)
    end
end
