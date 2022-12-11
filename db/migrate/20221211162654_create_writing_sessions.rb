class CreateWritingSessions < ActiveRecord::Migration[7.0]
  def change
    create_table :writing_sessions do |t|
      t.references :user, null: false, foreign_key: true
      t.string :title
      t.text :content
      t.integer :words
      t.float :wpm
      t.time :start_time
      t.time :end_time
      t.integer :break_count
      t.time :break_time
      t.float :score

      t.timestamps
    end
  end
end
