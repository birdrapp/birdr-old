Rails.application.routes.draw do
  resources :clubs
  resources :birds
  devise_for :users, controllers: {
    registrations: 'users/registrations',
    sessions: 'users/sessions'
  }

  root to: 'welcome#index'
end
