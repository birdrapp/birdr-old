# == Schema Information
#
# Table name: clubs
#
#  id          :integer          not null, primary key
#  name        :string
#  short_name  :string
#  description :text
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  cover_image :string
#  logo        :string
#

require 'test_helper'

class ClubTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
