# frozen_string_literal: true
require 'grpc'
require 'bicicleta_services_pb'


class AlugueisController < ApplicationController
  before_action :authenticate_user!
  before_action :stub

  def index
    render json: @stub.list_alugueis_for_user(Paraibike::Usuario.new({id: current_user.id}))

  end

  def show
    render json: @stub.find_aluguel(Paraibike::Aluguel.new({
                                                             id: aluguel_params[:id].to_i,
                                                             data: aluguel_params[:data],
                                                             quantidadeHoras: aluguel_params[:quantidadeHoras],
                                                             status: aluguel_params[:status],
                                                             valor: aluguel_params[:valor],
                                                             usuarioId: current_user.id,
                                                             bicicleta: aluguel_params[:bicicleta]
                                                           }))
  end

  def create
    render json: @stub.create_aluguel(
      Paraibike::Aluguel.new(
        {
          id: 0,
          valor: aluguel_params[:valor],
          data: aluguel_params[:data],
          status: aluguel_params[:status],
          quantidadeHoras: aluguel_params[:quantidadeHoras],
          usuarioId: current_user.id,
          bicicleta: Paraibike::Bicicleta.new(
            id: aluguel_params[:bicicleta][:id]
          )
        }
      ))
  end

  def update
    render json: @stub.update_aluguel(
      Paraibike::Aluguel.new(
        {
          id: aluguel_params[:id].to_i,
          data: aluguel_params[:data],
          status: aluguel_params[:status],
          quantidadeHoras: aluguel_params[:quantidadeHoras]
        }
      )
    )
  end

  def destroy
    render json: @stub.cancel_aluguel(
      Paraibike::Aluguel.new({
                               id: aluguel_params[:id].to_i
                             })
    )
  end

  private

  def aluguel_params
    params.permit(
      :id, :valor, :data, :status, :quantidadeHoras, :usuarioId, :bicicleta => [:id]
    )
  end

  def bicicleta_params
    params.permit(
      :id, :codigo, :marca, :estado, :valorPorHora, :usuarioId
    )
  end

  def stub
    @stub = Paraibike::AluguelService::Stub.new('host.docker.internal:9000', :this_channel_is_insecure)
  end
end
