class RegionalBirdList < ApplicationRecord
  has_many :birds, class_name: LocalizedBird
end
