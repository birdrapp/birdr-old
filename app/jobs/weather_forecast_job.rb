class WeatherForecastJob < ApplicationJob
  queue_as :default

  def perform(birding_session)
    weather_report = lookup_forecast_from_database(birding_session) ||
                     lookup_forecast_from_dark_sky(birding_session)

    unless weather_report.nil?
      birding_session.weather_report = weather_report
      birding_session.save!
    end
  end

  private

  def create_weather_report(forecast)
    current = forecast.currently
    WeatherReport.create!(
      apparent_temperature: current.apparentTemperature,
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

  def lookup_forecast_from_database(birding_session)
    WeatherReport.kilometres_from(5, birding_session.location)
      .around_time(birding_session.datetime)
      .first
  end

  def lookup_forecast_from_dark_sky(birding_session)
    forecast = ForecastIO.forecast(
      birding_session.latitude,
      birding_session.longitude,
      time: birding_session.datetime,
      params: {
        units: "uk",
        exclude: "hourly,minutely,daily,flags"
      })

    create_weather_report(forecast)
  end
end
