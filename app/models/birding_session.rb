# == Schema Information
#
# Table name: birding_sessions
#
#  id                :integer          not null, primary key
#  date              :date
#  location          :geography({:srid point, 4326
#  created_at        :datetime         not null
#  updated_at        :datetime         not null
#  user_id           :integer
#  location_name     :string           not null
#  location_address  :string
#  weather_report_id :integer
#  start_time        :time
#  end_time          :time
#

class BirdingSession < ApplicationRecord
  belongs_to :user
  has_many :bird_records, dependent: :destroy
  has_many :birds, through: :bird_records
  belongs_to :weather_report, optional: true

  accepts_nested_attributes_for :bird_records

  validates :location, presence: true
  validates :date, presence: true
  validates :start_time, presence: true

  def datetime
    @datetime ||= DateTime.new(date.year, date.month, date.day, time.hour, time.min, time.sec, time.zone)
  end

  def time
    @time ||= (
      return start_time if end_time.nil?
      start_time + ((end_time - start_time).to_i / 2)
    )
  end

  def latitude
    location.lat
  end

  def longitude
    location.lon
  end

  def to_s
    "#{date} - #{location_name}"
  end
end
