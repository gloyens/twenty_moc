class AddStreakToUser < ActiveRecord::Migration[7.0]
  def change
    add_column :users, :streak, :integer
  end
end
