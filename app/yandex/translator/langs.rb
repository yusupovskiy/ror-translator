module Translator
  class YandexClient
    module Langs
      def langs(args={})
        response = request('/getLangs', ui: args[:ui])
        response.parsed_response
      end
    end
  end
end