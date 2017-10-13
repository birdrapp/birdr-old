# == Schema Information
#
# Table name: club_bird_records
#
#  id             :integer          not null, primary key
#  club_id        :integer
#  bird_record_id :integer
#  created_at     :datetime         not null
#  updated_at     :datetime         not null
#

class ClubBirdRecord < ApplicationRecord
  belongs_to :club
  belongs_to :bird_record
end
