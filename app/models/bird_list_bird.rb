# == Schema Information
#
# Table name: bird_list_birds
#
#  id             :integer          not null, primary key
#  bird_id        :integer
#  bird_list_id   :integer
#  rarity_id      :integer
#  created_at     :datetime         not null
#  updated_at     :datetime         not null
#  resident       :boolean          default(FALSE)
#  migrant        :boolean          default(FALSE)
#  vagrant        :boolean          default(FALSE)
#  summer_visitor :boolean          default(FALSE)
#  winter_visitor :boolean          default(FALSE)
#

class BirdListBird < ApplicationRecord
  belongs_to :bird
  belongs_to :bird_list
  belongs_to :rarity

  validates :bird, presence: true
  validates :bird_list, presence: true
  validates :rarity, presence: true

  scope :ioc_order, -> { joins(:bird).order('birds.sort_position') }

  def to_s
    "#{bird} - #{bird_list}"
  end
end
