class AuthorizeApiRequest
  prepend SimpleCommand

  def initialize(headers = {})
    @headers = headers
  end

  def call
    user
  end

  private
    attr_reader :headers

    # returns the user or throws error
    def user
      # binding.pry
      @user ||= User.find(decoded_auth_token[:user_id]) if decoded_auth_token
      @user ||= errors.add(:token, 'Invalid token') && nil
    end

    # decodes the token and retrieves the user ID
    def decoded_auth_token
      @decoded_token_auth ||= JsonWebToken.decode(http_auth_header)
    end

    # grabs the token from the authorization header recieved in initialize
    def http_auth_header
      if headers['Authorization'].present?
        return headers['Authorization'].split(' ').last
      else
        errors.add(:token, 'Missing token')
      end
      return nil
    end

end
