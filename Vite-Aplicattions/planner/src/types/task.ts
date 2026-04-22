type Task = {
  id: number;
  title: string;
  description?: string;
  status: 'todo' | 'in_progress' | 'done';
  priority: 'low' | 'medium' | 'high';
  tags: string[];
  dueDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const arrumarCama: Task = {
    id: 1,
    title: "Arrumar a Cama",
    description: "",
    status: 'done',
    priority: "low",
    tags: [],
    dueDate: new Date(""),
    createdAt: new Date(""),
    updatedAt: new Date("")

}
console.log(arrumarCama)