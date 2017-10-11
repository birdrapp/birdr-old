class ClubPolicy < ApplicationPolicy
  def index?
    true
  end

  def create?
    signed_in
  end

  def members?
    member
  end

  def membership?
    member
  end

  def update?
    owner
  end

  def join?
    signed_in
  end

  def leave?
    member
  end

  private

  def member
    user.is_member_of? club
  end

  def owner
    club.owner == user
  end

  def club
    record
  end
end
