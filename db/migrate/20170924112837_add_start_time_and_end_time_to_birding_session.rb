class AddStartTimeAndEndTimeToBirdingSession < ActiveRecord::Migration[5.1]
  def change
    add_column :birding_sessions, :start_time, :time
    add_column :birding_sessions, :end_time, :time
  end
end
