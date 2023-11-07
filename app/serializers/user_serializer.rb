class UserSerializer
  include JSONAPI::Serializer
  attributes :id, :email, :name, :username, :flag
end
