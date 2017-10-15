class ChangeBirdLists < ActiveRecord::Migration[5.1]
  def change
    remove_column :bird_lists, :country_code, :string
    add_column :bird_lists, :bounding_box, :st_polygon, geographic: true
    add_reference :bird_lists, :club, foreign_key: true
    rename_column :bird_list_birds, :migratory, :migrant
    add_column :bird_list_birds, :summer_visitor, :boolean, default: false
    add_column :bird_list_birds, :winter_visitor, :boolean, default: false
  end
end
