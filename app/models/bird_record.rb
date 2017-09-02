class BirdRecord < ApplicationRecord
  belongs_to :bird
  belongs_to :birding_session

  def to_s
    "#{bird} - #{birding_session}"
  end
end
