class Admin::TripsController < ApplicationController
  # GET /admin/trips
  def index
    @trips = Trip.all.page(params[:page])
  end

  # GET /admin/trips/1
  def show
    @trip = Trip.find(params[:id])
  end

  # GET /admin/trips/new
  def new
    @trip = Trip.new
  end

  # GET /admin/trips/1/edit
  def edit
    @trip = Trip.find(params[:id])
  end

  # POST /admin/trips
  def create
    @trip = Trip.new(trip_params)

    if @trip.save
      redirect_to admin_trips_url, notice: 'Trip was successfully created.'
    else
      render :new
    end
  end

  # PATCH/PUT /admin/trips/1
  def update
    @trip = Trip.find(params[:id])

    if @trip.update(trip_params)
      redirect_to admin_trips_url, notice: 'Trip was successfully updated.'
    else
      render :edit
    end
  end

  # DELETE /admin/trips/1
  def destroy
    @trip = Trip.find(params[:id])

    @trip.destroy
    redirect_to admin_trips_url, notice: 'Trip was successfully destroyed.'
  end

  private
    # Only allow a trusted parameter "white list" through.
    def trip_params
      params.require(:trip).permit(:date, :location, :user_id)
    end
end
