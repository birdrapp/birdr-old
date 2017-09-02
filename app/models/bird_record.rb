class BirdRecord < ApplicationRecord
  belongs_to :bird
  belongs_to :trip

  def to_s
    "#{bird} - #{trip}"
  end
end
