class AddRegisterTokenToCourses < ActiveRecord::Migration[6.0]
  def change
    add_column :courses, :register_token, :string
    add_index :courses, :register_token, unique: true
  end
end
