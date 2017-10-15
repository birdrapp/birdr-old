class UpdateClubRecordsJob < ApplicationJob
  queue_as :default

  def perform(birding_session)
    user = birding_session.user
    # Find the clubs I've been a member since before this birding session
    # i.e. we dont want to add club records to a club I joined after this
    # session.
    user_clubs = user.clubs.joined_before(birding_session.datetime)

    birding_session.bird_records.each do |record|
      record.clubs = user_clubs.covering(record.location.lon, record.location.lat)
    end
  end
end
