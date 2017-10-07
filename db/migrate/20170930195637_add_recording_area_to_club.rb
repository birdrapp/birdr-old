class AddRecordingAreaToClub < ActiveRecord::Migration[5.1]
  def change
    add_column :clubs, :recording_area, :st_polygon
  end
end
