class AddRecordsToClubs < ApplicationJob
  queue_as :default

  def perform(birding_session)
    user = birding_session.user
    clubs = user.clubs

    clubs.each do |club|
      records_in_area = birding_session.bird_records.within_area(club.recording_area)
      records_in_area.each { |r| r.clubs << club }
    end
  end
end
