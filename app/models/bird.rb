# == Schema Information
#
# Table name: birds
#
#  id                     :integer          not null, primary key
#  common_name            :string
#  scientific_name        :string
#  order                  :string
#  scientific_family_name :string
#  common_family_name     :string
#  sort_position          :integer
#  species_id             :integer
#  created_at             :datetime         not null
#  updated_at             :datetime         not null
#

class Bird < ApplicationRecord
  belongs_to :species, class_name: "Bird", optional: true
  has_many :bird_records
  has_many :bird_list_birds
  has_many :bird_lists, through: :bird_list_birds
  has_many :subspecies, class_name: "Bird", foreign_key: "species_id"

  def subspecies?
    not species_id.nil?
  end

  def to_s
    "#{common_name} (#{scientific_name})"
  end
end
