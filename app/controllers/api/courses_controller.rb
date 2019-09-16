class Api::CoursesController < ApiController
  before_action :set_course, only: [:show, :update, :destroy, :course_users, :generate_register_token, :verify_register_token]
  skip_before_action :authenticate_request, only: :verify_register_token

  def index
    render json: CourseSerializer.new(@current_user.courses)
  end

  def course_users
    render json: UserSerializer.new(User.course_users(@course.id))
  end

  def show
    render json: CourseSerializer.new(@course)
  end

  def create
    course = Course.new(course_params)
    if course.save
      render json: CourseSerializer.new(course)
    else
      # TODO: Render error
      render_error(course)
    end
  end

  def update
    if @course.update(course_params)
      render json: CourseSerializer.new(@course)
    else
      # TODO: Render error
      render_error(@course)
    end
  end

  def destroy
    @course.destroy
    # TODO: Render message
  end

  def generate_register_token
    @course.regenerate_register_token
    render json: CourseSerializer.new(@course)
  end

  def verify_register_token
    if @course.register_token == params[:token]
      render json: CourseSerializer.new(@course)
    else
      render :json => { :errors => "URL not found" }, :status => 404
    end
  end

  private
    def set_course
      @course = Course.find(params[:id])
    end

    def course_params
      params.require(:course).permit(:name)
    end
end
