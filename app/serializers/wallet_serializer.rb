class WalletSerializer
  include JSONAPI::Serializer
  attributes :id, :balance
  belongs_to :user
end