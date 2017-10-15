class ChangeClubRecordingAreaToGeography < ActiveRecord::Migration[5.1]
  def up
    add_column :clubs, :recording_area_new, :st_polygon, geographic: true
    execute('update clubs set recording_area_new = recording_area')
    remove_column :clubs, :recording_area
    rename_column :clubs, :recording_area_new, :recording_area
  end

  def down
    add_column :clubs, :recording_area_new, :st_polygon
    execute('update clubs set recording_area_new = recording_area')
    remove_column :clubs, :recording_area
    rename_column :clubs, :recording_area_new, :recording_area
  end
end
