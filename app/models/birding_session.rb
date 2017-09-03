class BirdingSession < ApplicationRecord
  belongs_to :user
  has_many :bird_records, dependent: :destroy
  has_many :birds, through: :bird_records

  validates :location, presence: true
  validates :date, presence: true

  def to_s
    "#{date} - #{location_name}"
  end
end
