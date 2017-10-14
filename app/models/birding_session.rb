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
#  weather_report_id :integer
#  time              :time
#  country_code      :string(2)        not null
#

class BirdingSession < ApplicationRecord
  belongs_to :user
  belongs_to :weather_report, optional: true

  has_many :birds, through: :bird_records
  has_many :bird_records, dependent: :destroy
  has_many :photos, through: :bird_records

  accepts_nested_attributes_for :bird_records

  validates :bird_records, presence: true
  validates :date, presence: true
  validates :location, presence: true
  validates :time, presence: true

  def country_name
    country.local_name
  end

  def datetime
    return nil if date.nil? or time.nil?
    @datetime ||= DateTime.new(date.year, date.month, date.day, time.hour, time.min, time.sec, time.zone)
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

  def user_name
    user.full_name
  end

  private

  def country
    @country ||= ISO3166::Country.new(country_code)
  end
end
