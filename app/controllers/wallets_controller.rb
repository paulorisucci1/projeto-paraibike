require 'bigdecimal'

class WalletsController < ApplicationController

  before_action :authenticate_user!, :create_wallet_if_necessary

  def example
    if current_user.wallet.nil?
      @wallet = Wallet.create(user_id: current_user[:id])
      @wallet.save
      render json: @wallet, status: :created
    else
      render json: current_user.wallet
    end
  end

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

    credit_from_wallet(@value)
    render json: current_user.wallet, status: :created
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
