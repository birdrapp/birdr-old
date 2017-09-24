class AddLocationToBirdRecord < ActiveRecord::Migration[5.1]
  def up
    add_column :bird_records, :location, :st_point, geographic: true
    execute "UPDATE bird_records SET location = bs.location FROM birding_sessions bs WHERE bs.id = birding_session_id"
  end

  def down
    remove_column :bird_records, :location
  end
end
