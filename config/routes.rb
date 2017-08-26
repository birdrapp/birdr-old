Rails.application.routes.draw do
  resources :clubs
  post '/clubs/:id/join', to: 'clubs#join', as: 'join_club'
  post '/clubs/:id/leave', to: 'clubs#leave', as: 'leave_club'
  get '/clubs/:id/members', to: 'clubs#members', as: 'club_members'
  get '/clubs/:id/membership', to: 'clubs#membership', as: 'club_membership'

  resources :birds
  devise_for :users, controllers: {
    registrations: 'users/registrations',
    sessions: 'users/sessions'
  }

  root to: 'welcome#index'
end
