# == Schema Information
#
# Table name: weather_reports
#
#  id                        :integer          not null, primary key
#  apparent_temperature      :decimal(, )
#  cloud_cover               :decimal(, )
#  dew_point                 :decimal(, )
#  humidity                  :decimal(, )
#  icon                      :string
#  precipitation_intensity   :decimal(, )
#  precipitation_probability :decimal(, )
#  pressure                  :decimal(, )
#  summary                   :string
#  temperature               :decimal(, )
#  time                      :datetime
#  uv_index                  :integer
#  visibility                :decimal(, )
#  wind_bearing              :integer
#  wind_speed                :decimal(, )
#  location                  :geography({:srid point, 4326
#  created_at                :datetime         not null
#  updated_at                :datetime         not null
#

class WeatherReport < ApplicationRecord
  has_many :birding_sessions, dependent: :nullify

  scope :kilometres_from, -> (kilometres, location) { where('ST_DWithin(location, Geography(ST_MakePoint(?, ?)), ?)', location.lon, location.lat, kilometres * 1000) }
  scope :around_time, -> (datetime) { where('time BETWEEN ? AND ?', datetime - 30.minutes, datetime + 30.minutes) }
end
