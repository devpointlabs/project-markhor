class Api::QuizzesController < ApiController
  before_action :set_course
  before_action :set_quiz, only: [:show, :update, :destroy, :publish_quiz]

  def index
    render json: QuizSerializer.new(@course.quizzes.order(created_at: :desc))
  end

  def show
    render json: {
      quiz: QuizSerializer.new(@quiz),
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

  def publish_quiz
    if @quiz.published_at
      @quiz.update(published_at: nil)
    else
      @quiz.update(published_at: DateTime.now)
    end
    render json: QuizSerializer.new(@quiz)
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
      params.require(:quiz).permit(:title, :description, :published_at)
    end
end
