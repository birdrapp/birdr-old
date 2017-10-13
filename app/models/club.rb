# == Schema Information
#
# Table name: clubs
#
#  id             :integer          not null, primary key
#  name           :string
#  short_name     :string
#  description    :text
#  created_at     :datetime         not null
#  updated_at     :datetime         not null
#  cover_image    :string
#  logo           :string
#  recording_area :geometry({:srid= polygon, 0
#  owner_id       :integer
#

class Club < ApplicationRecord
  has_many :club_bird_records, dependent: :destroy
  has_many :bird_records, through: :club_bird_records
  has_many :club_memberships
  has_many :users, through: :club_memberships
  belongs_to :owner, class_name: "User"
  validates :name, :presence => true
  validates :description, :presence => true
  mount_uploader :cover_image, CoverImageUploader
  mount_uploader :logo, LogoUploader

  def display_name
    has_short_name? ? short_name : name
  end

  def has_short_name?
    short_name != ""
  end

  def has_cover_image?
    !cover_image.blank?
  end

  def has_logo?
    !logo.blank?
  end

  def members
    users
  end

  def to_s
    display_name
  end
end
