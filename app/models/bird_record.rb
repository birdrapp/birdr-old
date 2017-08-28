class BirdRecord < ApplicationRecord
  belongs_to :bird
  belongs_to :trip
end
