class Bird < ApplicationRecord
  has_many :sub_species, class_name: "Bird", foreign_key: "species_id"
  belongs_to :species, class_name: "Bird", optional: true

  def to_s
    common_name
  end
end
