class AddTimeToBirdRecord < ActiveRecord::Migration[5.1]
  def change
    remove_column :birding_sessions, :end_time
    add_column :bird_records, :time, :time
  end
end
