class Club < ApplicationRecord
  has_many :club_memberships
  has_many :users, through: :club_memberships
  validates :name, :presence => true
  validates :description, :presence => true

  def display_name
    has_short_name ? short_name : name
  end

  def has_short_name
    short_name != ""
  end

  def members
    users
  end
end
