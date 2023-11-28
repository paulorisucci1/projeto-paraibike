require 'grpc'
require 'bicicleta_services_pb'
class ProfileController < ApplicationController
  before_action :authenticate_user!
  before_action :stub

  # GET /
  def index
    render json: {
      user: UserSerializer.new(current_user).serializable_hash[:data][:attributes],
      bikes: stub.list_bicicletas(Paraibike::NoContent.new)
    }, status: :ok
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

  def stub
    @stub = Paraibike::BicicletaService::Stub.new('host.docker.internal:9000', :this_channel_is_insecure)
  end

  def user_params
    params.permit(
      :name, :password, :password_confirmation
    )
  end
end
