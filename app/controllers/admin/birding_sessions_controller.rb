class Admin::BirdingSessionsController < ApplicationController
  # GET /admin/birding_sessions
  def index
    @birding_sessions = BirdingSession.all.page(params[:page])
  end

  # GET /admin/birding_sessions/1
  def show
    @birding_session = BirdingSession.find(params[:id])
  end

  # GET /admin/birding_sessions/new
  def new
    @birding_session = BirdingSession.new
  end

  # GET /admin/birding_sessions/1/edit
  def edit
    @birding_session = BirdingSession.find(params[:id])
  end

  # POST /admin/birding_sessions
  def create
    @birding_session = BirdingSession.new(birding_session_params)

    if @birding_session.save
      redirect_to admin_birding_sessions_url, notice: 'Birding session was successfully created.'
    else
      render :new
    end
  end

  # PATCH/PUT /admin/birding_sessions/1
  def update
    @birding_session = BirdingSession.find(params[:id])

    if @birding_session.update(birding_session_params)
      redirect_to admin_birding_sessions_url, notice: 'Birding session was successfully updated.'
    else
      render :edit
    end
  end

  # DELETE /admin/birding_sessions/1
  def destroy
    @birding_session = BirdingSession.find(params[:id])

    @birding_session.destroy
    redirect_to admin_birding_sessions_url, notice: 'Birding session was successfully destroyed.'
  end

  private
    # Only allow a trusted parameter "white list" through.
    def birding_session_params
      params.require(:birding_session).permit(:date, :location, :user_id)
    end
end
