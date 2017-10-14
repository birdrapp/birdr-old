# == Schema Information
#
# Table name: birding_sessions
#
#  id                :integer          not null, primary key
#  date              :date
#  location          :geography({:srid point, 4326
#  created_at        :datetime         not null
#  updated_at        :datetime         not null
#  user_id           :integer
#  location_name     :string           not null
#  weather_report_id :integer
#  time              :time
#  country_code      :string(2)        not null
#

require 'test_helper'

class BirdingSessionTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
