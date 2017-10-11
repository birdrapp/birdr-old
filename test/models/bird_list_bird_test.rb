# == Schema Information
#
# Table name: bird_list_birds
#
#  id           :integer          not null, primary key
#  bird_id      :integer
#  bird_list_id :integer
#  rarity_id    :integer
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  resident     :boolean          default(FALSE)
#  migratory    :boolean          default(FALSE)
#  vagrant      :boolean          default(FALSE)
#

require 'test_helper'

class BirdListBirdTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
