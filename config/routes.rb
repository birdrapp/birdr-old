Rails.application.routes.draw do
  resources :clubs
  post '/clubs/:id/join', to: 'clubs#join', as: 'join_club'

  resources :birds
  devise_for :users, controllers: {
    registrations: 'users/registrations',
    sessions: 'users/sessions'
  }

  root to: 'welcome#index'
end
