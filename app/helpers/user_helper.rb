module UserHelper
  def user_avatar(size=:small, opts={})
    width = case size
    when :small then 30
    when :medium then 48
    else 80
    end

    # opts[:class] << ' rounded-circle'
    opts[:class] ||= ''
    opts[:class] << ' rounded-circle'
    user = opts[:user] || current_user

    gravatar_image_tag user.email, gravatar: { size: width }, alt: user.to_s, class: opts[:class].strip
  end
end
