class WeatherForecastJob < ApplicationJob
  queue_as :default

  def perform(birding_session)
    forecast = lookup_forecast(birding_session)

    unless forecast.nil?
      report = create_weather_report(forecast)

      birding_session.weather_report = report
      birding_session.save!
    end
  end

  private

  def create_weather_report(forecast)
    current = forecast.currently
    WeatherReport.create!(
      apparent_temperature: current.apparent_temperature,
      cloud_cover: current.cloudCover,
      dew_point: current.dewPoint,
      humidity: current.humidity,
      icon: current.icon,
      precipitation_intensity: current.precipIntensity,
      precipitation_probability: current.precipProbability,
      pressure: current.pressure,
      summary: current.summary,
      temperature: current.temperature,
      time: Time.at(current.time).to_datetime,
      uv_index: current.uvIndex,
      visibility: current.visibility,
      wind_bearing: current.windBearing,
      wind_speed: current.windSpeed,
      location: "POINT(#{forecast.longitude} #{forecast.latitude})"
    )
  end

  def lookup_forecast(birding_session)
    ForecastIO.forecast(
      birding_session.latitude,
      birding_session.longitude,
      time: birding_session.datetime,
      params: {
        units: "uk",
        exclude: "hourly,minutely,daily,flags"
      })
  end
end
