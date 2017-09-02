class BirdingSessionsController < ApplicationController
  # GET /birding_sessions/new
  def new
    @birds = Bird.where('species_id is null').take(100)
    @birding_session = current_user.birding_sessions.new
  end

  # POST /birding_sessions
  # POST /birding_sessions.json
  def create
    @birding_session = BirdingSession.new(birding_session_params)

    respond_to do |format|
      if @birding_session.save
        format.html { redirect_to @birding_session, notice: 'Bird records were successfully created.' }
        format.json { render :show, status: :created, location: @birding_session }
      else
        format.html { render :new }
        format.json { render json: @birding_session.errors, status: :unprocessable_entity }
      end
    end
  end

  private
    # Never trust parameters from the scary internet, only allow the white list through.
    def birding_session_params
      params.require(:birding_session).permit(:date, :location, :user_id, :bird_ids => [])
    end
end
