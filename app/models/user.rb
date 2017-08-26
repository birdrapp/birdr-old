class User < ApplicationRecord
  has_many :club_memberships
  has_many :clubs, :through => :club_memberships
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  def to_s
    "#{first_name} #{last_name}"
  end

  def has_no_clubs
    clubs.length == 0
  end
end
