class WritingSession < ApplicationRecord
  belongs_to :user

  validates :user, :content, :start_time, :end_time, :break_count, :break_time, presence: true
end
