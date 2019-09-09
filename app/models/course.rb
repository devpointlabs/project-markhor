class Course < ApplicationRecord
  validates :name, presence: { message: "Course must have a name." }
  validates :name, uniqueness: { message: "Course name already exists." }
end
