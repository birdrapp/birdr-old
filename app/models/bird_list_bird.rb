class BirdListBird < ApplicationRecord
  belongs_to :bird
  belongs_to :bird_list
  belongs_to :rarity
end
