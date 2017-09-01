class Bird < ApplicationRecord
  belongs_to :species, class_name: "Bird", optional: true
  has_many :bird_records
  has_many :sub_species, class_name: "Bird", foreign_key: "species_id"

  def to_s
    common_name
  end
end
