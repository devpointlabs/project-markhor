class QuestionSerializer
  include FastJsonapi::ObjectSerializer
  set_key_transform :camel_lower
  set_type :question
  attributes :id, :title
end
