export class Column {
  constructor(
    public id: string,
    public title: string,
    public taskIds: string[]
  ) {
    this.id = id;
    this.title = title;
    this.taskIds = taskIds;
  }

  public addTask(taskId: string, index: number) {
    this.taskIds.splice(index, 0, taskId);
  }

  public removeTask(taskId: string) {
    this.taskIds = this.taskIds.filter((id) => id !== taskId);
  }
}

export class Columns {
  constructor(public columns: Column[]) {
    this.columns = columns;
  }

  public addColumn(column: Column) {
    this.columns.push(column);
  }

  public removeColumn(columnId: string) {
    this.columns = this.columns.filter((column) => column.id !== columnId);
  }

  public updateColumn(column: Column) {
    const index = this.columns.findIndex((c) => c.id === column.id);
    this.columns[index] = column;
  }

  public moveTasks(
    fromColumnId: string,
    toColumnId: string,
    fromIndex: number,
    toIndex: number
  ) {
    const fromColumn = this.columns.find(
      (column) => column.id === fromColumnId
    );
    const toColumn = this.columns.find((column) => column.id === toColumnId);
    if (!fromColumn || !toColumn) {
      return;
    }
    const task = fromColumn.taskIds[fromIndex];
    fromColumn.removeTask(task);
    toColumn.addTask(task, toIndex);
  }

  public rearrangeColumn(fromIndex: number, toIndex: number) {
    this.columns.splice(toIndex, 0, this.columns.splice(fromIndex, 1)[0]);
  }
}
