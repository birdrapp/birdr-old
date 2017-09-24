class AddWeatherReportToBirdingSession < ActiveRecord::Migration[5.1]
  def change
    add_reference :birding_sessions, :weather_report, foreign_key: true
  end
end
