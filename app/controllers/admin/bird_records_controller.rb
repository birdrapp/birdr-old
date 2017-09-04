class Admin::BirdRecordsController < ApplicationController
  # GET /bird_records
  def index
    @bird_records = BirdRecord.all.page(params[:page])
  end

  # GET /bird_records/1
  def show
    @bird_record = BirdRecord.find(params[:id])
  end

  # GET /bird_records/new
  def new
    @bird_record = BirdRecord.new
  end

  # GET /bird_records/1/edit
  def edit
    @bird_record = BirdRecord.find(params[:id])
  end

  # POST /bird_records
  def create
    @bird_record = BirdRecord.new(bird_record_params)

    if @bird_record.save
      redirect_to admin_bird_records_url, notice: 'Bird record was successfully created.'
    else
      render :new
    end
  end

  # PATCH/PUT /bird_records/1
  def update
    @bird_record = BirdRecord.find(params[:id])

    if @bird_record.update(bird_record_params)
      redirect_to admin_bird_records_url, notice: 'Bird record was successfully updated.'
    else
      render :edit
    end
  end

  # DELETE /bird_records/1
  def destroy
    @bird_record = BirdRecord.find(params[:id])

    @bird_record.destroy
    redirect_to admin_bird_records_url, notice: 'Bird record was successfully destroyed.'
  end

  private
    # Only allow a trusted parameter "white list" through.
    def bird_record_params
      params.require(:bird_record).permit(:bird_id, :birding_session_id, :count, :notes)
    end
end
