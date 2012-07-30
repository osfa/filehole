class ApplicationController < ActionController::Base
  protect_from_forgery
  def home
    redirect_to matters_path
  end
end
