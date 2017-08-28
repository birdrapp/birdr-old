class Trip < ApplicationRecord
  has_many :bird_records
  has_many :birds, through: :bird_records

  validates :location, presence: true
  validates :date, presence: true
end
