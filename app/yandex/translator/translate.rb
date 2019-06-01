module Translator
  class YandexClient
    module Translate
      def translate(args = {})
        translate_direction = args[:from].nil? ? args[:to] : "#{args[:from]}-#{args[:to]}"
        response = request('/translate', lang: translate_direction, text: args[:text])
        response.parsed_response
      end
    end
  end
end