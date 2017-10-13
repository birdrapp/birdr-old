source 'https://rubygems.org'

ruby "2.4.1"

git_source(:github) do |repo_name|
  repo_name = "#{repo_name}/#{repo_name}" unless repo_name.include?("/")
  "https://github.com/#{repo_name}.git"
end

# Bundle edge Rails instead: gem 'rails', github: 'rails/rails'
gem 'rails', '~> 5.1.4'
gem 'dotenv-rails', '~> 2.2', groups: [:development, :test], require: 'dotenv/rails-now'
# Use postgresql as the database for Active Record
gem 'pg', '~> 0.18'
gem 'activerecord-postgis-adapter', '~> 5.0'
# Use Puma as the app server
gem 'puma', '~> 3.7'
# Use SCSS for stylesheets
gem 'sass-rails', '~> 5.0'
# Use Uglifier as compressor for JavaScript assets
gem 'uglifier', '>= 1.3.0'

# Build JSON APIs with ease. Read more: https://github.com/rails/jbuilder
gem 'jbuilder', '~> 2.5'

# Authentication with Devise: https://github.com/plataformatec/devise
gem 'devise', '~> 4.3'

gem 'bootstrap', '~> 4.0.0.beta'
gem 'jquery-rails', '~> 4.3'
gem 'simple_form', '~> 3.5'
gem 'kaminari', '~> 1.0'
gem 'gravatar_image_tag', '~> 1.2'
gem 'font-awesome-rails', '~> 4.7'
gem 'carrierwave', '~> 1.0'
gem 'fog-aws', '~> 1.4'
gem 'mini_magick', '~> 4.8'
gem 'webpacker', '~> 3.0'
gem 'country_select', '~> 3.1'
gem 'forecast_io', '~> 2.0'
gem 'resque', '~> 1.27'
gem 'pundit', '~> 1.1.0'
gem 'rgeo', '~> 0.6.0'

group :development, :test do
  # Call 'byebug' anywhere in the code to stop execution and get a debugger console
  gem 'byebug', platforms: [:mri, :mingw, :x64_mingw]
  # Adds support for Capybara system testing and selenium driver
  gem 'capybara', '~> 2.13'
  gem 'selenium-webdriver'
end

group :development do
  # Access an IRB console on exception pages or by using <%= console %> anywhere in the code.
  gem 'web-console', '>= 3.3.0'
  gem 'listen', '>= 3.0.5', '< 3.2'
  # Spring speeds up development by keeping your application running in the background. Read more: https://github.com/rails/spring
  gem 'spring'
  gem 'spring-watcher-listen', '~> 2.0.0'
  gem 'rack-mini-profiler', '~> 0.10'
  gem 'rubocop', '~> 0.49', require: false
  gem 'brakeman', '~> 3.7', require: false
  gem 'annotate', '~> 2.7', require: false
end
