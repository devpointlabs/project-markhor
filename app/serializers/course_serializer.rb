class CourseSerializer
  include FastJsonapi::ObjectSerializer
  set_key_transform :camel_lower
  set_type :course
  attributes :id, :name
end
