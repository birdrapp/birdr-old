# == Schema Information
#
# Table name: bird_lists
#
#  id           :integer          not null, primary key
#  name         :string           not null
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  bounding_box :geography({:srid polygon, 4326
#  club_id      :integer
#

class BirdList < ApplicationRecord
  include Geographical

  has_many :bird_list_birds
  has_many :birds, through: :bird_list_birds

  scope :covering, -> (lng, lat) { where('ST_Intersects(bounding_box, ?)', create_point(lng, lat)) }
  scope :order_by_area, -> { order('ST_Area(bounding_box)') }

  def to_s
    name
  end
end
