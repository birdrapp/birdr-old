namespace :photos do
  desc "Removes orphaned photos that have been uploaded but not associated with a bird record"
  task prune: :environment do
    photos = Photo.orphaned.older_than(1.day).all
    photos.each do |p|
      puts "Removing image for #{p.id}"
      p.remove_image!
      p.destroy!
    end
  end

end
