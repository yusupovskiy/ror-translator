describe Translator::YandexClient do
  let(:translator) { Translator::YandexClient.new(api_key: '') }
  
  describe '.initialize' do
    it 'assigns api_key to @api_key' do
      expect(translator.api_key).to eq ''
    end
  end
  
  describe 'methods' do
    context '.request' do
      it 'returns response from Yandex' do
        skip
        stub_request(:post, 'https://translate.yandex.net/api/v1.5/tr.json/getLangs?key=')
          .to_return(status: 200, body: '{"dirs":["en-da", "en-de"]}', headers: {})
        response = translator.send(:request, '/getLangs', {})

        expect(response.code).to eq 200
        expect(response.body).to eq '{"dirs":["en-da", "en-de"]}'
      end
    end
  end
end