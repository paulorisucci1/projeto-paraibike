class AddWalletToUsers < ActiveRecord::Migration[7.1]
  def change
    add_reference :users, :wallet, null: true, foreign_key: true
  end
end
