class CreateChoices < ActiveRecord::Migration[6.0]
  def change
    create_table :choices do |t|
      t.text :answer
      t.boolean :correct, :default => false
      t.belongs_to :question, null: false, foreign_key: true

      t.timestamps
    end
  end
end
