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
  has_many :localized_birds
  has_many :subspecies, class_name: "Bird", foreign_key: "species_id"

  scope :localized, -> (locale = I18n.locale) { includes(:localized_birds).where(localized_birds: { locale: locale }) }

  # TODO: this method assumes the birds have been loaded using the localized scope above.
  # This is the default scope of the model so we have to actively override using it.
  # I'm not sure how this will behave once we have multiple locales but it works for now.
  def localized_name
    localized_birds.first.common_name
  end

  def subspecies?
    not species_id.nil?
  end

  def to_s
    "#{common_name} (#{scientific_name})"
  end
end
