class ClubPolicy < ApplicationPolicy
  def index?
    true
  end

  def create?
    signed_in
  end

  def members?
    signed_in
  end

  def membership?
    signed_in
  end

  def update?
    record.owner == @user
  end

  def join?
    signed_in
  end

  def leave?
    signed_in
  end
end
