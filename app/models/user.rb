# == Schema Information
#
# Table name: users
#
#  id                     :integer          not null, primary key
#  email                  :string           default(""), not null
#  encrypted_password     :string           default(""), not null
#  reset_password_token   :string
#  reset_password_sent_at :datetime
#  remember_created_at    :datetime
#  sign_in_count          :integer          default(0), not null
#  current_sign_in_at     :datetime
#  last_sign_in_at        :datetime
#  current_sign_in_ip     :inet
#  last_sign_in_ip        :inet
#  created_at             :datetime         not null
#  updated_at             :datetime         not null
#  first_name             :string           not null
#  last_name              :string           not null
#  admin                  :boolean          default(FALSE)
#

class User < ApplicationRecord
  has_many :club_memberships
  has_many :clubs, :through => :club_memberships do
    def joined_before(date)
      where('club_memberships.created_at <= ?', date)
    end
  end
  has_many :birding_sessions
  has_many :bird_records, :through => :birding_sessions
  has_many :club_member_roles

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

  def roles club
    club_member_roles.where(club: club)
  end

  def has_role?(club, role)
    club_member_roles.exists?(club: club, role: role)
  end
end
