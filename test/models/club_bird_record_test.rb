# == Schema Information
#
# Table name: club_bird_records
#
#  id             :integer          not null, primary key
#  club_id        :integer
#  bird_record_id :integer
#  created_at     :datetime         not null
#  updated_at     :datetime         not null
#

require 'test_helper'

class ClubBirdRecordTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
