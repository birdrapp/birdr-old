class PhotosController < ApplicationController
  skip_before_action :verify_authenticity_token

  def new
    @photo = Photo.new
  end

  def create
    @photo = Photo.new(photo_params)

    respond_to do |format|
      if @photo.save
        format.json { render :show, status: :created, location: @photo }
      else
        format.json { render json: @photo.errors, status: :unprocessable_entity }
      end
    end
  end

  def destroy
    @photo = Photo.find(params[:id])
    @photo.destroy
    respond_to do |format|
      format.json { head :no_content }
    end
  end

  private

  def photo_params
    params.require(:photo).permit(:image)
  end
end
