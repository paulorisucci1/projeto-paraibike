require 'bigdecimal'
require 'bunny'

class WalletsController < ApplicationController

  before_action :authenticate_user!, :create_wallet_if_necessary

  @queueConnection
  @channel
  @queue


  def create_wallet_if_necessary
    if current_user.wallet.nil?
      @wallet = Wallet.create(user_id: current_user[:id])
      @wallet.save
      current_user.wallet = @wallet
    end
  end

  def credit
    @value = balance_params[:value].to_d

    if @value < 0
      render json: { error: 'Valor inválido' }
    end

    open_connection
    @channel.default_exchange
            .publish("{ \"user\": { \"email\": \"#{current_user.email}\" }, \"value\": \"#{@value}\" }", routing_key: @queue.name)
    @queueConnection.close

    render json: current_user.wallet, status: :created
  end

  def open_connection
    if @queueConnection.nil?
      @queueConnection = Bunny.new(hostname: 'host.docker.internal')
    end
    @queueConnection.start
    @channel = @queueConnection.create_channel
    @queue = @channel.queue('payments')
  end

  #POST /wallet/debit
  def debit
    @value = balance_params[:value].to_d

    if @value < 0
      render json: { error: 'Valor inválido'}
    elsif @value > current_user.wallet.balance
      render json: { error: 'O valor debitado é maior que o saldo da conta'}
    else
      debit_from_wallet(@value)
      render json: current_user.wallet, status: :created
    end

  end

  def get_wallet
    render json: Wallet.find_by(user: current_user)
  end

  def credit_from_wallet(value)
    @wallet = current_user.wallet
    @wallet.balance += value
    @wallet.save
  end

  def debit_from_wallet(value)
    @wallet = current_user.wallet
    @wallet.balance -= value
    @wallet.save
  end

  def balance_params
    params.permit(
      :value
    )
  end
end
