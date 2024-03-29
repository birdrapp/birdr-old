class LogoUploader < CarrierWave::Uploader::Base
  include CarrierWave::MiniMagick

  storage :fog
  process resize_to_fill: [400, 400]

  def store_dir
    "uploads/#{model.class.to_s.underscore}/#{mounted_as}/#{model.id}"
  end

  def extension_whitelist
    %w(jpg jpeg gif png)
  end
end
