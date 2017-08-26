module ApplicationHelper
  def nav_link_class path
    request.path == path ? 'active nav-link' : 'nav-link'
  end
end
