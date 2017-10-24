class ClubPolicy < ApplicationPolicy
  def index?
    true
  end

  def create?
    signed_in?
  end

  def new?
    signed_in?
  end

  def members?
    member? || owner?
  end

  def membership?
    member?
  end

  def update?
    owner?
  end

  def edit?
    owner?
  end

  def join?
    signed_in?
  end

  def leave?
    member?
  end

  def manage_roles?
    owner?
  end

  def update_roles?
    manage_roles?
  end

  private

  def member?
    user && user.is_member_of?(club)
  end

  def owner?
    club.owner == user
  end

  def club
    record
  end
end
