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
#  location_address  :string
#  weather_report_id :integer
#

require 'test_helper'

class BirdingSessionTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
