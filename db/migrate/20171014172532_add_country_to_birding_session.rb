class AddCountryToBirdingSession < ActiveRecord::Migration[5.1]
  def up
    add_column :birding_sessions, :country_code, :string, limit: 2
    execute("update birding_sessions set country_code = 'GB'")
    change_column :birding_sessions, :country_code, :string, limit: 2, null: false
    remove_column :birding_sessions, :location_address
    rename_column :birding_sessions, :start_time, :time
  end

  def down
    remove_column :birding_sessions, :country_code
    add_column :birding_sessions, :location_address, :string
    rename_column :birding_sessions, :time, :start_time
  end
end
