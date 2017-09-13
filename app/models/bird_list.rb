class BirdList < ApplicationRecord
  has_many :bird_list_birds
  has_many :birds, through: :bird_list_birds
end
