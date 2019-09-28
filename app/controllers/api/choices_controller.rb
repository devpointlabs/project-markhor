class Api::ChoicesController < ApiController
  before_action :set_question
  before_action :set_choice, only: [:show, :update, :destroy]

  def index
    render json: ChoiceSerializer.new(@question.choices.order(:created_at))
  end

  def show
  end

  def create
    choice = @question.choices.new(correct: false)
    if choice.save
      render json: ChoiceSerializer.new(choice)
    else
      # TODO: Error Handle
      render json: {}
    end
  end

  def update
    if @choice.update(choice_params)
      render json: ChoiceSerializer.new(@choice)
    else
      # TODO: Error Handle
      render json: {}
    end
  end

  def destroy
    @choice.destroy    
  end

  private
    def set_question
      @question = Question.find(params[:question_id])
    end

    def set_choice
      @choice = Choice.find(params[:id])
    end

    def choice_params
      params.require(:choice).permit(:answer, :correct)
    end
end
