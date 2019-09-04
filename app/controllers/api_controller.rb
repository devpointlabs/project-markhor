class ApiController < ActionController::API
  before_action :authenticate_request
  after_action :change_header
  attr_reader :current_user
  
  private
    def authenticate_request
      @current_user = AuthorizeApiRequest.call(request.headers).result
      render json: { error: ['Not Authorized'] }, status: 401 unless @current_user
    end

    def change_header
      if @current_user
        response.set_header('jwt', JsonWebToken.encode(user_id: @current_user.id))
      end
    end
end
