require 'httparty' 
require_relative 'translator/translate'
require_relative 'translator/langs'
require_relative 'translator/detect'

require 'dotenv'
Dotenv.load

class YandexClient
  include HTTParty
  include Translator::YandexClient::Translate
  include Translator::YandexClient::Langs
  include Translator::YandexClient::Detect

  base_uri('https://translate.yandex.net/api/v1.5/tr.json')
  format(:json)

  def initialize(args={})
    @api_key = ENV['YANDEX_TRAN_API']
  end	
  
  private
    def request(uri, args = {})
      self.class.get(uri, query: args.merge(key: @api_key))
    end
end