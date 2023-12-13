require 'rails_helper'
RSpec.describe 'User', type: :model do

  describe "user creation" do
    it "should create a valid user with email and password" do
      user = User.new(name: 'john', email: "john@example.com", username: 'testing', password: "password", flag: 'loc')
      expect(user).to be_valid
    end

    it "should not create a user with a blank email" do
      user = User.new(username: 'example', password: "password")
      expect(user).not_to be_valid
      expect(user.errors.full_messages).to include("Email can't be blank")
    end

    it "should not create a user with a blank username" do
      user = User.new(email: "john@example.com", password: "password")
      expect(user).not_to be_valid
      expect(user.errors.full_messages).to include("Username can't be blank")
    end
  end

  describe "user authentication" do
    let(:user) { User.new(email: "john@example.com", username: 'funciona', password: "password", password_confirmation: "password") }

    it "should allow login with valid credentials" do
      expect(user.authenticate("password")).to eq(user)
    end

    it "should not allow login with incorrect password" do
      expect(user.authenticate("incorrect_password")).to be_nil
    end
  end

end