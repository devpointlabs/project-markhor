class Course < ApplicationRecord
  has_secure_token :register_token

  validates :name, presence: { message: "Course must have a name." }
  validates :name, uniqueness: { message: "Course name already exists." }

  has_many :enrollments
  has_many :users, through: :enrollments
  
end
