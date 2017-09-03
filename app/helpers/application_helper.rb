module ApplicationHelper
  def nav_link_class path
    request.path == path ? 'active nav-link' : 'nav-link'
  end

  def horizontal_rule
    tag(:hr, class: 'my-5')
  end

  def bootstrap_class_for flash_type
    { success: "alert-success", error: "alert-danger", alert: "alert-warning", notice: "alert-info" }[flash_type.to_sym] || flash_type.to_s
  end

  def flash_messages(opts = {})
    flash.each do |msg_type, message|
      concat(content_tag(:div, message, class: "alert #{bootstrap_class_for(msg_type)} alert-dismissible fade show") do
        concat(content_tag(:button, class: "close", data: { dismiss: 'alert' }) do
          content_tag(:span, '&times;'.html_safe)
        end)
        concat message
      end)
    end
    nil
  end
end
