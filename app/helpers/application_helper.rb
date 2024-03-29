module ApplicationHelper
  def nav_link_class path
    request.path == path ? 'active nav-link' : 'nav-link'
  end

  def google_maps(init = '')
    javascript_include_tag "https://maps.googleapis.com/maps/api/js?key=AIzaSyCC3Ebzxe2VKuB54kd9baaW-7ztMxyRDA4&libraries=places,drawing&callback=#{init}", defer: 'defer', async: 'async'
  end

  def horizontal_rule
    tag(:hr, class: 'my-5')
  end

  def page_header(text = nil, &block)
    content_tag :div, class: 'page-header' do
      content_tag :div, class: 'container' do
        if text.nil?
          yield
        else
          content_tag :h5, text, class: 'mb-0'
        end
      end
    end
  end

  def bootstrap_class_for flash_type
    { success: "alert-success", error: "alert-danger", alert: "alert-warning", notice: "alert-info" }[flash_type.to_sym] || flash_type.to_s
  end

  def flash_messages(opts = {})
    flash.each do |msg_type, message|
      concat(content_tag(:div, message, class: "alert #{bootstrap_class_for(msg_type)} fade show mb-0") do
        concat message
      end)
    end
    nil
  end
end
