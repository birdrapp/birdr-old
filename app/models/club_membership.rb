class ClubMembership < ApplicationRecord
  belongs_to :user
  belongs_to :club

  def created_at
    @created_at
  end
end
