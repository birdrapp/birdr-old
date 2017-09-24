# == Schema Information
#
# Table name: rarities
#
#  id         :integer          not null, primary key
#  name       :string           not null
#  level      :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Rarity < ApplicationRecord
  def to_s
    name
  end
end
