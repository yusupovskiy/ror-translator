Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  get 'langs' => 'application#get_langs'
  get 'translate' => 'application#get_translate'
  get 'detect' => 'application#get_detect'
end
