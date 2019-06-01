module Translator
  class YandexClient
    module Detect
      def detect(args = {})
        response = request('/detect', hint: args[:hint], text: args[:text])
        response.parsed_response
      end
    end
  end  
end