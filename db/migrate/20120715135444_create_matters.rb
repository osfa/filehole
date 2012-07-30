class CreateMatters < ActiveRecord::Migration
  def change
    create_table :matters do |t|

      t.timestamps
    end
  end
end
