class User < ApplicationRecord
  has_secure_password

  def password_check(password_confirmation)
    self.password == password_confirmation ? true : false
  end

end
