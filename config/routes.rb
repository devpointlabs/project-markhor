Rails.application.routes.draw do
  namespace :api do
    post "/authenticate", to: "authentication#authenticate"
    post '/validate_token', to: 'authentication#validate_token'
    post '/registration', to: 'authentication#registration'
  end
end
