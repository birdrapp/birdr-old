class BirdingSessionsController < ApplicationController
  # GET /birding_sessions/new
  def new
    @birds = Bird.localized.all
    @birding_session = current_user.birding_sessions.new
  end

  # POST /birding_sessions
  # POST /birding_sessions.json
  def create
    @birding_session = BirdingSession.new(birding_session_params)

    respond_to do |format|
      if @birding_session.save
        format.html { redirect_to root_path, notice: 'Bird records were successfully created.' }
        format.json { render :show, status: :created, location: root_path }
      else
        @birds = Bird.localized.all
        format.html { render :new }
        format.json { render json: @birding_session.errors, status: :unprocessable_entity }
      end
    end
  end

  private
    # Never trust parameters from the scary internet, only allow the white list through.
    def birding_session_params
      params.require(:birding_session).permit(:date, :location, :location_name, :user_id, :bird_records_attributes => [:id, :bird_id])
    end
end
