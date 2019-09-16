class UserSerializer
  include FastJsonapi::ObjectSerializer
  set_key_transform :camel_lower
  set_type :user
  attributes :id, :first_name, :last_name, :email, :avatar, :admin

  attribute :role, if: Proc.new { |record, params|
    record[:role] != nil
  }
end
