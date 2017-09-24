# == Schema Information
#
# Table name: bird_records
#
#  id                 :integer          not null, primary key
#  bird_id            :integer
#  birding_session_id :integer
#  created_at         :datetime         not null
#  updated_at         :datetime         not null
#  count              :integer
#  notes              :string
#

class BirdRecord < ApplicationRecord
  belongs_to :bird
  belongs_to :birding_session
  has_one :weather_report, through: :birding_session

  has_many :photos, as: :photographable

  scope :kilometres_from, -> (kilometres, location) { kilometres_from_session(kilometres, location).or(kilometres_from_record(kilometres, location)) }
  scope :kilometres_from_session, -> (kilometres, location) { joins(:birding_session).where('ST_DWithin(birding_sessions.location, Geography(ST_MakePoint(?, ?)), ?)', location.lon, location.lat, kilometres * 1000) }
  scope :kilometres_from_record, -> (kilometres, location) { joins(:birding_session).where('ST_DWithin(bird_records.location, Geography(ST_MakePoint(?, ?)), ?)', location.lon, location.lat, kilometres * 1000) }

  def location
    self[:location] || birding_session.location
  end

  def to_s
    "#{bird} - #{birding_session}"
  end
end
