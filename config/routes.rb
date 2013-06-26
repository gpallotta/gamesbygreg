Games::Application.routes.draw do
  scope 'api' do
    resources :words
  end

  root to: 'main#index'
end
