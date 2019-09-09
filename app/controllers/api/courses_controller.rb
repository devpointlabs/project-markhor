class Api::CoursesController < ApiController
  before_action :set_course, only: [:show, :update, :destroy]

  def index
    render json: CourseSerializer.new(Course.all)
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

  private
    def set_course
      @course = Course.find(params[:id])
    end

    def course_params
      params.require(:course).permit(:name)
    end
end
