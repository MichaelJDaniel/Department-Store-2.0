Rails.application.routes.draw do
  namespace :api do
    resources :departments do
      resources :product
  end

  get '*other', to: 'static#index'
end

end
