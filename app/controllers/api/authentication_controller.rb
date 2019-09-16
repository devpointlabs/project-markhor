class Api::AuthenticationController < ApiController
  skip_before_action :authenticate_request, only: [:authenticate, :registration, :course_register_authenticate]

  def authenticate
    command = AuthenticateUser.call(params[:email], params[:password])
    if command.success?
      @current_user = User.find_by(email: params[:email])
      render json: UserSerializer.new(@current_user)
    else
      render json: { errors: command.errors }, status: :unauthorized
    end
  end

  def course_register_authenticate
    command = AuthenticateUser.call(params[:email], params[:password])
    if command.success?
      @current_user = User.find_by(email: params[:email])
      if @current_user.courses.where(:id => params[:id]).exists?
        render json: UserSerializer.new(@current_user)
        # TODO: Send message telling user they are already enrolled in the course
        # render json: { message: "You are already enrolled in #{Course.find(params[:id]).name}" }
      else
        @current_user.enrollments.create(course_id: params[:id], role: "student")
        render json: UserSerializer.new(@current_user)
      end
    else
      render json: { errors: command.errors }, status: :unauthorized
    end
  end

  def validate_token
    render json: UserSerializer.new(@current_user)
  end

  def registration
    @current_user = User.new(user_params)
    if @current_user.password_check(params[:password_confirmation]) && @current_user.save
      render json: UserSerializer.new(@current_user)
    else
      # TODO: Error handling 
      puts "Error"
    end
  end

  private
    def user_params
      params.permit(:email, :password, :first_name, :last_name)
    end
end
