require 'rails_helper'

RSpec.describe YandexClient, type: :class do
  let(:translator) { YandexClient.new() }

  describe '.translate' do
    context 'for bad request' do
      context 'for bad params' do
        it 'returns hash error with message' do
          response = translator.translate(text: 'Привет', from: 'ru')
  
          expect(response.is_a?(Hash)).to eq true
          expect(response['message']).to eq "Invalid parameter: lang"
        end
      end
  
      context 'for bad request to Yandex' do
        it 'returns hash error with message' do
          response = translator.translate(text: 'Hello', from: 'ru', to: 'ch')
          
          expect(response.is_a?(Hash)).to eq true
          expect(response['message']).to eq 'The specified translation direction is not supported'
        end
      end
    end
  
    context 'for correct request' do
      it 'returns localized text' do
        response = translator.translate(text: 'Привет мир', from: 'ru', to: 'en')
        puts 1111111, response
        expect(response['text']).to eq ["Hello world"]
      end
    end
  end
  
  describe '.detect' do
    let(:translator) { YandexClient.new }
  
    context 'for bad params' do
      it 'returns hash error with message' do
        response = translator.detect
  
        expect(response.is_a?(Hash)).to eq true
        expect(response['message']).to eq "Invalid parameter: text"
      end
    end
  
    context 'for correct request' do
      it 'returns locale for the text' do
        response = translator.detect(text: 'Привет мир!')
  
        expect(response['lang']).to eq "ru"
      end
    end
  end
end