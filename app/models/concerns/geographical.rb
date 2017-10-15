module Geographical
  extend ActiveSupport::Concern

  module ClassMethods
    def create_point(lng, lat)
      @factory ||= RGeo::Geographic.spherical_factory(srid: 4326)
      @factory.point(lng, lat)
    end
  end
end
