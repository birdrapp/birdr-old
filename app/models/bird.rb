class Bird < ApplicationRecord
  belongs_to :species, class_name: "Bird", optional: true
  has_many :sub_species, class_name: "Bird", foreign_key: "species_id"

  has_many :localized_birds
  has_many :bird_records

  def subspecies?
    not species_id.nil?
  end

  def to_s
    common_name
  end
end
