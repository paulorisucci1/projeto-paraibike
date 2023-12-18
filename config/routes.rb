Rails.application.routes.draw do
  devise_for :users, path: '', path_names: {
    sign_in: 'auth/login',
    sign_out: 'logout',
    registration: 'signup'
  }, controllers: {
    sessions: 'users/sessions',
    registrations: 'users/registrations'
  }

  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  post "/wallet/credit", to: "wallets#credit"
  post "/wallet/debit", to: "wallets#debit"
  get "/wallet", to: "wallets#get_wallet"

  # Defines the root path route ("/")
  # root "posts#index"
  resources :users, param: :_username, except: :create
  resources :profile, only: [:index, :update]
  resources :bicicletas
  get '/*a', to: 'application#not_found'
end
