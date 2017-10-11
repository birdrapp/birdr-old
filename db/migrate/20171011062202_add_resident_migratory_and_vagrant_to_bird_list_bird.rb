class AddResidentMigratoryAndVagrantToBirdListBird < ActiveRecord::Migration[5.1]
  def change
    add_column :bird_list_birds, :resident, :boolean, default: false
    add_column :bird_list_birds, :migratory, :boolean, default: false
    add_column :bird_list_birds, :vagrant, :boolean, default: false
  end
end
