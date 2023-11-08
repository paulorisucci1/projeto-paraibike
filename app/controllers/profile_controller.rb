class ProfileController < ApplicationController
  before_action :authenticate_user!

  # GET /
  def index
    render json: UserSerializer.new(current_user).serializable_hash[:data][:attributes], status: :ok
  end

  # PUT /profile/:id
  def update
    unless current_user.update user_params
      render json: { errors: current_user.errors.full_messages },
             status: :unprocessable_entity
    end

    render json: {
      status: 200,
      message: "User updated successfully",
      data: UserSerializer.new(current_user).serializable_hash[:data][:attributes]
    }, status: :ok
  end

  private

  def user_params
    params.permit(
      :name, :password, :password_confirmation
    )
  end
end
