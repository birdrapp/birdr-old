class ClubMemberRole < ApplicationRecord
  belongs_to :user
  belongs_to :club
  validates :role, presence: true, uniqueness: { scope: [:user, :club] }
end
