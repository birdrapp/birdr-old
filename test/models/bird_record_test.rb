# == Schema Information
#
# Table name: bird_records
#
#  id                 :integer          not null, primary key
#  bird_id            :integer
#  birding_session_id :integer
#  created_at         :datetime         not null
#  updated_at         :datetime         not null
#  count              :integer
#  notes              :string
#

require 'test_helper'

class BirdRecordTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
