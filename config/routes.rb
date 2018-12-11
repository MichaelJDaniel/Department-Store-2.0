Rails.application.routes.draw do
  namespace :api do
    resources :departments do
      resources :item
  end

  get '*other', to: 'static#index'
end

end
