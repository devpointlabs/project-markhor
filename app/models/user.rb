class User < ApplicationRecord
  has_secure_password

  validates :email, presence: { message: "Account must have an email." }
  validates :email, uniqueness: { message: "Account with that email already exists" }

  has_many :enrollments
  has_many :courses, through: :enrollments

  def password_check(password_confirmation)
    self.password == password_confirmation ? true : false
  end

  def self.course_users(course_id)
    User.find_by_sql(["
      SELECT u.id, email, first_name, last_name, avatar, admin, e.role
      FROM users u
      LEFT JOIN enrollments e
      ON u.id = e.user_id
      WHERE e.course_id = ?
      ORDER BY last_name
    ", course_id])
  end

end
