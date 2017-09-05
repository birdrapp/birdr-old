class AddLocationAddressToBirdingSession < ActiveRecord::Migration[5.1]
  def change
    add_column :birding_sessions, :location_address, :string
  end
end
