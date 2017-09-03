class AddLocationNameToBirdingSession < ActiveRecord::Migration[5.1]
  def change
    add_column :birding_sessions, :location_name, :string, null: false
  end
end
