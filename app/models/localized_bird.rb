class LocalizedBird < ApplicationRecord
  belongs_to :rarity
  belongs_to :bird
  belongs_to :regional_bird_list

  has_many :bird_records, through: :bird

  def common_family_name
    bird.common_family_name
  end

  def global_name
    bird.name
  end

  def order
    bird.order
  end

  def scientific_family_name
    bird.scientific_family_name
  end

  def scientific_name
    bird.scientific_name
  end

  def subspecies?
    not bird.species_id.nil?
  end
end
