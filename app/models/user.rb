class User < ApplicationRecord
  has_secure_password

  validates :email, presence: { message: "Account must have an email." }
  validates :email, uniqueness: { message: "Account with that email already exists" }

  has_many :enrollments
  has_many :courses, through: :enrollments

  def password_check(password_confirmation)
    self.password == password_confirmation ? true : false
  end

end
