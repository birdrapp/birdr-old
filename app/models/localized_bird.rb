# == Schema Information
#
# Table name: localized_birds
#
#  id            :integer          not null, primary key
#  common_name   :string           not null
#  locale        :string(2)        not null
#  sort_position :integer          not null
#  bird_id       :integer
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#

class LocalizedBird < ApplicationRecord
  belongs_to :bird

  def international_name
    bird.common_name
  end

  def scientific_name
    bird.scientific_name
  end

  def to_s
    common_name
  end
end
