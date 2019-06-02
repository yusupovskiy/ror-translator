Rails.application.routes.draw do
  root 'pages#index'

  get 'langs' => 'application#get_langs'
  get 'translate' => 'application#get_translate'
  get 'detect' => 'application#get_detect'
end
