class PhotoUploader < CarrierWave::Uploader::Base
  include CarrierWave::MiniMagick

    storage :fog

    process resize_to_fit: [1920, 1920]

    version :small do
      process resize_to_fill: [545, 300]
    end

    version :thumb do
      process resize_to_fill: [300, 300]
    end

    def store_dir
      "uploads/#{model.class.to_s.underscore}/#{mounted_as}/#{model.id}"
    end

    def extension_whitelist
      %w(jpg jpeg gif png)
    end

end
