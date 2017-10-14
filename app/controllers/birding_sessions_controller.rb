class BirdingSessionsController < ApplicationController
  # GET /birding_sessions/:id
  # GET /birding_sessions/:id.json
  def show
    @birding_session = BirdingSession.includes(bird_records: :bird).find(params[:id])
  end

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
        run_background_jobs

        format.html { redirect_to @birding_session, notice: 'Bird records were successfully created.' }
        format.json { render :show, status: :created, location: @birding_session }
      else
        format.html { render :new }
        format.json { render json: @birding_session.errors, status: :unprocessable_entity }
      end
    end
  end

  def edit
    @birding_session = BirdingSession
      .includes(bird_records: :photos)
      .order('bird_records.created_at')
      .find(params[:id])
  end

  def update
    @birding_session = BirdingSession.find(params[:id])

    respond_to do |format|
      if @birding_session.update(birding_session_params)
        run_background_jobs

        format.html { redirect_to @birding_session, notice: "Bird records successfully updated." }
        format.json { render :show, status: :ok, location: @birding_session }
      else
        format.html { render :edit }
        format.json { render json: @birding_session.errors, status: :unprocessable_entity }
      end
    end
  end

  private
    # Never trust parameters from the scary internet, only allow the white list through.
    def birding_session_params
      params.require(:birding_session).permit(:date, :time, :location, :location_name, :country_code, :user_id, :bird_records_attributes => [:id, :bird_id, :count, :notes, :time, :location, :photo_ids => []])
    end

    def run_background_jobs
      # Lookup the weather for this birding session
      WeatherForecastJob.perform_later @birding_session
      # Add any records to clubs
      UpdateClubRecordsJob.perform_later @birding_session
    end
end
