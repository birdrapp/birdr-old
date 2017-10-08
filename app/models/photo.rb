# == Schema Information
#
# Table name: photos
#
#  id                  :integer          not null, primary key
#  image               :string
#  photographable_type :string
#  photographable_id   :integer
#  created_at          :datetime         not null
#  updated_at          :datetime         not null
#

class Photo < ApplicationRecord
  belongs_to :photographable, polymorphic: true, optional: true

  mount_uploader :image, PhotoUploader

  scope :orphaned, -> { where(photographable_id: nil)}
  scope :older_than, -> (duration) { where('created_at <= ?', duration.ago) }
end
