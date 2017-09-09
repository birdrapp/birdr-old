# == Schema Information
#
# Table name: club_memberships
#
#  id         :integer          not null, primary key
#  user_id    :integer
#  club_id    :integer
#  status     :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class ClubMembership < ApplicationRecord
  belongs_to :user
  belongs_to :club

  def to_s
    "#{user} in #{club}"
  end
end
