class BirdingSessionsController < ApplicationController
  # GET /birding_sessions/new
  def new
    @birding_session = current_user.birding_sessions.new
  end

  # POST /birding_sessions
  # POST /birding_sessions.json
  def create
    @birding_session = BirdingSession.new(birding_session_params)

    respond_to do |format|
      if @birding_session.save
        # Lookup the weather for this birding session
        WeatherForecastJob.perform_later @birding_session

        format.html { redirect_to root_path, notice: 'Bird records were successfully created.' }
        format.json { render :show, status: :created, location: root_path }
      else
        format.html { render :new }
        format.json { render json: @birding_session.errors, status: :unprocessable_entity }
      end
    end
  end

  def edit
    @birding_session = BirdingSession.includes(bird_records: :photos).find(params[:id])
  end

  def update
    @birding_session = BirdingSession.find(params[:id])

    respond_to do |format|
      if @birding_session.update(birding_session_params)
        format.html { redirect_to root_path, notice: 'BirdingSession was successfully updated.' }
        format.json { render :show, status: :ok, location: root_path }
      else
        format.html { render :edit }
        format.json { render json: @birding_session.errors, status: :unprocessable_entity }
      end
    end
  end

  private
    # Never trust parameters from the scary internet, only allow the white list through.
    def birding_session_params
      params.require(:birding_session).permit(:date, :start_time, :location, :location_name, :location_address, :user_id, :bird_records_attributes => [:id, :bird_id, :count, :notes, :time, :location, :photo_ids => []])
    end
end
