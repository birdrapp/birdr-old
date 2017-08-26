class Club < ApplicationRecord
  has_many :club_memberships
  has_many :users, through: :club_memberships
  validates :name, :presence => true
  validates :description, :presence => true

  def display_name
    short_name ? short_name : name
  end
end
