module ApplicationHelper
  def nav_link_class path
    request.path == path ? 'active nav-link' : 'nav-link'
  end

  def horizontal_rule
    tag(:hr, class: 'my-5')
  end
end
