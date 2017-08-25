require 'test_helper'

class BirdsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @bird = birds(:one)
  end

  test "should get index" do
    get birds_url
    assert_response :success
  end

  test "should get new" do
    get new_bird_url
    assert_response :success
  end

  test "should create bird" do
    assert_difference('Bird.count') do
      post birds_url, params: { bird: { common_family_name: @bird.common_family_name, common_name: @bird.common_name, order: @bird.order, scientific_family_name: @bird.scientific_family_name, scientific_name: @bird.scientific_name, sort_position: @bird.sort_position, species_id_id: @bird.species_id_id } }
    end

    assert_redirected_to bird_url(Bird.last)
  end

  test "should show bird" do
    get bird_url(@bird)
    assert_response :success
  end

  test "should get edit" do
    get edit_bird_url(@bird)
    assert_response :success
  end

  test "should update bird" do
    patch bird_url(@bird), params: { bird: { common_family_name: @bird.common_family_name, common_name: @bird.common_name, order: @bird.order, scientific_family_name: @bird.scientific_family_name, scientific_name: @bird.scientific_name, sort_position: @bird.sort_position, species_id_id: @bird.species_id_id } }
    assert_redirected_to bird_url(@bird)
  end

  test "should destroy bird" do
    assert_difference('Bird.count', -1) do
      delete bird_url(@bird)
    end

    assert_redirected_to birds_url
  end
end
