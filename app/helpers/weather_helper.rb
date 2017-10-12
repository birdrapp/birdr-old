module WeatherHelper
  def weather_icon(icon)
    tag.i(class: "wi #{weather_icon_class(icon)}")
  end

  private

  def weather_icon_class(icon)
    case icon
    when 'clear-day' then 'wi-day-sunny'
    when 'clear-night' then 'wi-night-clear'
    when 'rain' then 'wi-rain'
    when 'snow' then 'wi-snow'
    when 'sleet' then 'wi-sleet'
    when 'wind' then 'wi-cloudy-gusts'
    when 'fog' then 'wi-fog'
    when 'cloudy' then 'wi-cloudy'
    when 'partly-cloudy-day' then 'wi-day-cloudy'
    when 'partly-cloudy-night' then 'wi-night-alt-cloudy'
    when 'hail' then 'wi-hail'
    when 'thunderstorm' then 'wi-thunderstorm'
    when 'tornado' then 'wi-tornado'
    else 'wi-cloud'
    end
  end
end
