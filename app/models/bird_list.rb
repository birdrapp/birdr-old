# == Schema Information
#
# Table name: bird_lists
#
#  id           :integer          not null, primary key
#  name         :string           not null
#  country_code :string(2)        not null
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#

class BirdList < ApplicationRecord
  has_many :bird_list_birds
  has_many :birds, through: :bird_list_birds

  def to_s
    name
  end
end
