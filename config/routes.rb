Rails.application.routes.draw do
  namespace :api do
    post "/authenticate", to: "authentication#authenticate"
    post "/course_register_authenticate", to: "authentication#course_register_authenticate"
    post '/validate_token', to: 'authentication#validate_token'
    post '/registration', to: 'authentication#registration'

    resources :courses do
      resources :quizzes
    end

    resources :quizzes do
      resources :questions
    end

    get "/courses/:id/course_users", to: "courses#course_users"
    get "/courses/:id/generate_register_token", to: "courses#generate_register_token"
    get "/courses/:id/verify_register_token", to: "courses#verify_register_token"
  end
end
