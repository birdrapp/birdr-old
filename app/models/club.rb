class Club < ApplicationRecord
  has_many :club_memberships
  has_many :users, through: :club_memberships
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
end
