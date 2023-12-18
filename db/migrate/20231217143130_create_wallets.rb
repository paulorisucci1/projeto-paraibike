class CreateWallets < ActiveRecord::Migration[7.1]
  def change
    create_table :wallets do |t|
      t.references :user, null: false, foreign_key: true
      t.decimal :balance, precision: 8, scale: 2, default: 0

      t.timestamps
    end
  end
end
