class UpdateClubRecordsJob < ApplicationJob
  queue_as :default

  def perform(birding_session)
    user = birding_session.user
    user_clubs = user.clubs

    birding_session.bird_records.each do |record|
      record.clubs = user_clubs.select { |club| club.recording_area.contains? record.location }
    end
  end
end
