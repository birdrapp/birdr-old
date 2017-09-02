require 'test_helper'

class BirdingSessionsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @birding_session = birding_sessions(:one)
  end

  test "should get index" do
    get birding_sessions_url
    assert_response :success
  end

  test "should get new" do
    get new_birding_session_url
    assert_response :success
  end

  test "should create birding_session" do
    assert_difference('BirdingSession.count') do
      post birding_sessions_url, params: { birding_session: { date: @birding_session.date, description: @birding_session.description, draft: @birding_session.draft, end_time: @birding_session.end_time, location: @birding_session.location, start_time: @birding_session.start_time, title: @birding_session.title } }
    end

    assert_redirected_to birding_session_url(BirdingSession.last)
  end

  test "should show birding_session" do
    get birding_session_url(@birding_session)
    assert_response :success
  end

  test "should get edit" do
    get edit_birding_session_url(@birding_session)
    assert_response :success
  end

  test "should update birding_session" do
    patch birding_session_url(@birding_session), params: { birding_session: { date: @birding_session.date, description: @birding_session.description, draft: @birding_session.draft, end_time: @birding_session.end_time, location: @birding_session.location, start_time: @birding_session.start_time, title: @birding_session.title } }
    assert_redirected_to birding_session_url(@birding_session)
  end

  test "should destroy birding_session" do
    assert_difference('BirdingSession.count', -1) do
      delete birding_session_url(@birding_session)
    end

    assert_redirected_to birding_sessions_url
  end
end
