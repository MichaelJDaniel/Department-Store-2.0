class Department < ApplicationRecord
  validates :name, presence: true
  has_many :items, dependent: :destroy

  def self.get_department_items(id)
    Department.find_by_sql(["
      SELECT d.id, d.name, d.description, i.*
      FROM departments AS d
      LEFT JOIN items AS i
      ON d.id = i.department_id
      WHERE i.department_id = ?
    ", id])
  end
end
