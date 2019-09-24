class Api::QuizzesController < ApiController
  before_action :set_course
  before_action :set_quiz, only: [:show, :update, :destroy]

  def index
    render json: QuizSerializer.new(@course.quizzes)
  end

  def show
    render json: {
      quiz: QuestionSerializer.new(@quiz),
      questions: QuestionSerializer.new(@quiz.questions)
    }
  end

  def create
    quiz = @course.quizzes.new(quiz_params)
    if quiz.save
      render json: QuizSerializer.new(quiz)
    else
      # TODO: Better error
      render quiz.errors
    end
  end

  def update
    if @quiz.update(quiz_params)
      render json: QuizSerializer.new(@quiz)
    else
      # TODO: Better error
      render json: @quiz.errors
    end
  end

  def destroy
    @quiz.destroy
  end

  private
    def set_course
      @course = Course.find(params[:course_id])
    end

    def set_quiz
      @quiz = Quiz.find(params[:id])
    end

    def quiz_params
      params.require(:quiz).permit(:title, :description)
    end
end
