class Club < ApplicationRecord
  has_many :club_memberships
  has_many :users, through: :club_memberships
end
