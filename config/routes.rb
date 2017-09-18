Rails.application.routes.draw do
  get '/add_bird_records', to: 'birding_sessions#new'
  resources :birding_sessions, only: [:new, :create]

  resources :clubs
  post '/clubs/:id/join', to: 'clubs#join', as: 'join_club'
  post '/clubs/:id/leave', to: 'clubs#leave', as: 'leave_club'
  get '/clubs/:id/members', to: 'clubs#members', as: 'club_members'
  get '/clubs/:id/membership', to: 'clubs#membership', as: 'club_membership'

  resources :photos, only: [:new, :create, :destroy]

  devise_for :users, controllers: {
    registrations: 'users/registrations',
    sessions: 'users/sessions',
    passwords: 'users/passwords'
  }

  namespace :admin do
    root to: 'welcome#index'

    resources :bird_lists
    resources :bird_records
    resources :birding_sessions
    resources :birds
    resources :clubs
    resources :club_memberships
    resources :rarities
    resources :users
  end

  root to: 'welcome#index'
end
