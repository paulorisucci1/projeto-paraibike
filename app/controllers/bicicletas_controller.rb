# frozen_string_literal: true
require 'grpc'
require 'bicicleta_services_pb'

class BicicletasController < ApplicationController
  before_action :authenticate_user!
  before_action :stub

  def index
    render json: @stub.list_bicicletas(Paraibike::NoContent.new)
  end

  def show
    render json: @stub.find_bicicleta(Paraibike::Bicicleta.new({
                                                                 id: bicicleta_params[:id].to_i,
                                                                 codigo: bicicleta_params[:codigo],
                                                                 marca: bicicleta_params[:marca],
                                                                 estado: bicicleta_params[:estado],
                                                                 valorPorHora: bicicleta_params[:valorPorHora],
                                                                 usuarioId: bicicleta_params[:usuarioId]
                                                               }))
  end

  def create
    render json: @stub.create_bicicleta(
      Paraibike::Bicicleta.new(
        {
          id: 0,
          codigo: bicicleta_params[:codigo],
          marca: bicicleta_params[:marca],
          estado: bicicleta_params[:estado],
          valorPorHora: bicicleta_params[:valorPorHora],
          usuarioId: bicicleta_params[:usuarioId]
        }
      ))
  end

  def update
    render json: @stub.update_bicicleta(
      Paraibike::Bicicleta.new(
        {
          id: bicicleta_params[:id].to_i,
          codigo: bicicleta_params[:codigo],
          marca: bicicleta_params[:marca],
          estado: bicicleta_params[:estado],
          valorPorHora: bicicleta_params[:valorPorHora],
          usuarioId: bicicleta_params[:usuarioId]
        }
      ))
  end

  def destroy
    render json: @stub.delete_bicicleta(
      Paraibike::Bicicleta.new(
        {
          id: bicicleta_params[:id].to_i,
        }
      ))
  end

  private

  def bicicleta_params
    params.permit(
      :id, :bicicleta_id, :codigo, :marca, :estado, :valorPorHora, :usuarioId
    )
  end
  def stub
    @stub = Paraibike::BicicletaService::Stub.new('host.docker.internal:9000', :this_channel_is_insecure)
  end
end
