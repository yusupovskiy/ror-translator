class ApplicationController < ActionController::Base
  def get_langs
    yt = YandexClient.new()
    langs = yt.langs

    respond_to do |format|
      format.json { render json: langs, status: :ok }
    end
  end

  def get_translate
    yt = YandexClient.new()
    translator = yt.translate(text: params[:text], from: params[:from], to: params[:to])

    respond_to do |format|
      format.json { render json: translator, status: :ok }
    end
  end

  def get_detect
    yt = YandexClient.new()
    detect = yt.detect(text: params[:text], hint: params[:hint])

    respond_to do |format|
      format.json { render json: detect, status: :ok }
    end
  end
end
