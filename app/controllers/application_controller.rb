class ApplicationController < ActionController::API
  before_action :configure_permitted_parameters, if: :devise_controller?

  #JSON return for 404 code
  def not_found
    render json: { error: 'not_found' }
  end

  protected
  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up) do |user_params|
      user_params.permit(:username, :email, :password, :password_confirmation, :name, :flag)
    end
    devise_parameter_sanitizer.permit(:account_update, keys: [:name, :username])
  end
end
