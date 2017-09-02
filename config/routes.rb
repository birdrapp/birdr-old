Rails.application.routes.draw do
  resources :birding_sessions

  resources :clubs
  post '/clubs/:id/join', to: 'clubs#join', as: 'join_club'
  post '/clubs/:id/leave', to: 'clubs#leave', as: 'leave_club'
  get '/clubs/:id/members', to: 'clubs#members', as: 'club_members'
  get '/clubs/:id/membership', to: 'clubs#membership', as: 'club_membership'

  devise_for :users, controllers: {
    registrations: 'users/registrations',
    sessions: 'users/sessions',
    passwords: 'users/passwords'
  }

  namespace :admin do
    root to: 'welcome#index'

    resources :bird_records
    resources :birds
    resources :club_memberships
    resources :clubs
    resources :birding_sessions
    resources :users
  end

  root to: 'welcome#index'
end
