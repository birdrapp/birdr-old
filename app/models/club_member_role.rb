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

class ClubMemberRole < ApplicationRecord
  belongs_to :user
  belongs_to :club
  validates :role, presence: true, uniqueness: { scope: [:user, :club] }
end
