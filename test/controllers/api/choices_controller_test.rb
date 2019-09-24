require 'test_helper'

class Api::ChoicesControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get api_choices_index_url
    assert_response :success
  end

  test "should get show" do
    get api_choices_show_url
    assert_response :success
  end

  test "should get create" do
    get api_choices_create_url
    assert_response :success
  end

  test "should get update" do
    get api_choices_update_url
    assert_response :success
  end

  test "should get destroy" do
    get api_choices_destroy_url
    assert_response :success
  end

end
