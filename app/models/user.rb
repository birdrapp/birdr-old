class User < ApplicationRecord
  has_many :club_memberships
  has_many :clubs, :through => :club_memberships
  has_many :trips
  has_many :bird_records, :through => :trips

  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  def full_name
    "#{first_name} #{last_name}"
  end

  def has_no_clubs?
    clubs.length == 0
  end

  def is_member_of? club
    clubs.exists?(club.id)
  end

  def member_since club
    membership = club_memberships.where(club_id: club.id).first
    membership.updated_at unless membership == nil
  end

  def to_s
    full_name
  end
end
