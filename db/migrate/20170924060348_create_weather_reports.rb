class CreateWeatherReports < ActiveRecord::Migration[5.1]
  def change
    create_table :weather_reports do |t|
      t.decimal :apparent_temperature
      t.decimal :cloud_cover
      t.decimal :dew_point
      t.decimal :humidity
      t.string :icon
      t.decimal :precipitation_intensity
      t.decimal :precipitation_probability
      t.decimal :pressure
      t.string :summary
      t.decimal :temperature
      t.datetime :time
      t.integer :uvIndex
      t.decimal :visibility
      t.integer :wind_bearing
      t.decimal :wind_speed
      t.st_point :location, geographic: true

      t.timestamps
    end
  end
end
