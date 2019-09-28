class ChoiceSerializer
  include FastJsonapi::ObjectSerializer
  set_key_transform :camel_lower
  set_type :choice
  attributes :id, :answer, :correct
end
