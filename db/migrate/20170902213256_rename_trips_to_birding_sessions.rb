class RenameTripsToBirdingSessions < ActiveRecord::Migration[5.1]
  def change
    rename_table :trips, :birding_sessions
    rename_column :bird_records, :trip_id, :birding_session_id
  end
end
