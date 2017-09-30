require 'test_helper'

class BirdListsControllerTest < ActionDispatch::IntegrationTest
  test "should get birds" do
    get bird_lists_birds_url
    assert_response :success
  end

end
