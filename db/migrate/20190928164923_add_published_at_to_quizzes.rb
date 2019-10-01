class AddPublishedAtToQuizzes < ActiveRecord::Migration[6.0]
  def change
    add_column :quizzes, :published_at, :datetime
  end
end
