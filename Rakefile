# Add your own tasks in files placed in lib/tasks ending in .rake,
# for example lib/tasks/capistrano.rake, and they will automatically be available to Rake.

require 'resque/tasks'
require_relative 'config/application'

task 'resque:setup' => :environment

Rails.application.load_tasks
