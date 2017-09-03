module Admin::WelcomeHelper
  def admin_menu_link(model, count = nil)
    link_to [:admin, model], class: 'list-group-item d-flex justify-content-between align-items-center' do
      concat model.name.pluralize.titleize
      concat content_tag(:span, number_with_delimiter(count || model.count), class: 'badge badge-dark')
    end
  end
end
