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
  has_many :birding_sessions
end
