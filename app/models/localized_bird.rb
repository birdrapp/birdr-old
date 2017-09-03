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
