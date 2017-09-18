class Photo < ApplicationRecord
  belongs_to :photographable, polymorphic: true, optional: true
  mount_uploader :image, PhotoUploader
end
