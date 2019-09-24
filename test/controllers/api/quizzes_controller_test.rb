require 'test_helper'

class Api::QuizzesControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get api_quizzes_index_url
    assert_response :success
  end

  test "should get show" do
    get api_quizzes_show_url
    assert_response :success
  end

  test "should get create" do
    get api_quizzes_create_url
    assert_response :success
  end

  test "should get update" do
    get api_quizzes_update_url
    assert_response :success
  end

  test "should get destroy" do
    get api_quizzes_destroy_url
    assert_response :success
  end

end
