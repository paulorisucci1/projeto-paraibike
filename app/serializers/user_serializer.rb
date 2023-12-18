class UserSerializer
  include JSONAPI::Serializer
  attributes :id, :email, :name, :username, :flag
  has_one :wallet
end
