# == Schema Information
#
# Table name: club_member_roles
#
#  id         :integer          not null, primary key
#  user_id    :integer
#  club_id    :integer
#  role       :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

require 'test_helper'

class ClubMemberRoleTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
