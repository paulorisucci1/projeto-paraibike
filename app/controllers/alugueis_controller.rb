# frozen_string_literal: true
require 'grpc'
require 'bicicleta_services_pb'


class AlugueisController < ApplicationController
  before_action :authenticate_user!
  before_action :stub

  def index
    render json: @stub.list_alugueis(Paraibike::NoContent.new)
  end

  def create
    render json: @stub.create_aluguel(
      Paraibike::Aluguel.new(
        {
          id: 0,
          valor: aluguel_params[:valor],
          status: aluguel_params[:status],
          quantidadeHoras: aluguel_params[:quantidadeHoras],
          usuarioId: current_user.id,
          bicicleta: aluguel_params[:bicicleta]
        }
      ))
  end

  def aluguel_params
    params.permit(
      :id, :valor, :data, :status, :quantidadeHoras, :usuarioId, :bicicleta
    )
  end

  def stub
    @stub = Paraibike::BicicletaService::Stub.new('host.docker.internal:9000', :this_channel_is_insecure)
  end

  #{
  #
  #     "valor": 50,
  #     "data": "2023-11-08T02:57:17",
  #     "status": "Aprovado",
  #     "quantidadeHoras": 2,
  #     "usuarioId": 1,
  #     "bicicleta": {
  #         "id": 11
  #     }
  # }
end
