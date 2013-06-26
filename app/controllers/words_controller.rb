class WordsController < ApplicationController
  respond_to :json

  def index
    respond_with Word.all
  end

  def show
    respond_with Word.find(params[:id])
  end

end
