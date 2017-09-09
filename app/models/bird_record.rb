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

  def to_s
    "#{bird} - #{birding_session}"
  end
end
