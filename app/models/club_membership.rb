class ClubMembership < ApplicationRecord
  belongs_to :user
  belongs_to :club

  def to_s
    "#{user} in #{club}"
  end
end
