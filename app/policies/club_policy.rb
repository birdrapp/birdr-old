class ClubPolicy < ApplicationPolicy
  def index?
    true
  end

  def create?
    true
  end

  def new?
    create?
  end

  def members?
    @user
  end

  def membership?
    @user
  end

  def edit?
    false
  end

  def join?
    @user
  end

  def leave?
    @user
  end
end
