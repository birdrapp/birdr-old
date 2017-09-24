# == Schema Information
#
# Table name: birding_sessions
#
#  id               :integer          not null, primary key
#  date             :date
#  location         :geography({:srid point, 4326
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#  user_id          :integer
#  location_name    :string           not null
#  location_address :string
#

class BirdingSession < ApplicationRecord
  belongs_to :user
  has_many :bird_records, dependent: :destroy
  has_many :birds, through: :bird_records
  has_one :weather_report

  accepts_nested_attributes_for :bird_records

  validates :location, presence: true
  validates :date, presence: true

  def to_s
    "#{date} - #{location_name}"
  end
end
