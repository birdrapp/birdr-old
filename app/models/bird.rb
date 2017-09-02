class Bird < ApplicationRecord
  belongs_to :species, class_name: "Bird", optional: true
  has_many :bird_records
  has_many :subspecies, class_name: "Bird", foreign_key: "species_id"

  def subspecies?
    not species_id.nil?
  end

  def to_s
    common_name
  end
end
