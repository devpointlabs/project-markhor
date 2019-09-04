require 'test_helper'

class Api::AuthenticationControllerTest < ActionDispatch::IntegrationTest
  test "should get authenticate" do
    get api_authentication_authenticate_url
    assert_response :success
  end

end
