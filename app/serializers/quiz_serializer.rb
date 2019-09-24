class QuizSerializer
  include FastJsonapi::ObjectSerializer
  set_key_transform :camel_lower
  set_type :quiz
  attributes :id, :title, :description
end
