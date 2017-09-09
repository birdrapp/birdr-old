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

require 'test_helper'

class BirdTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
