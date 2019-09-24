class Api::QuestionsController < ApiController
  before_action :set_quiz
  before_action :set_question, only: [:show, :update, :destroy]

  def index
    render json: QuestionSerializer.new(@quiz.questions)
  end

  def show
  end

  def create
    question = @quiz.questions.new()
    if question.save
      render json: QuestionSerializer.new(question)
    else
      # TODO: Error Handle
    end
  end

  def update
    if @question.update(question_params)
      render json: QuestionSerializer.new(@question)
    else
      # TODO: Error handle
    end
  end

  def destroy
    @question.destroy
  end

  private
    def set_quiz
      @quiz = Quiz.find(params[:quiz_id])
    end

    def set_question
      @question = Question.find(params[:id])
    end

    def question_params
      params.require(:question).permit(:title)
    end
end
