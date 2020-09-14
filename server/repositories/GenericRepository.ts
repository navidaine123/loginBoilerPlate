import {
  Model,
} from "https://deno.land/x/denodb@v1.0.9/lib/model.ts";

export class GenericRepository<T extends Model> {
  protected dbSet: typeof Model;

  constructor(private dataSet: typeof Model) {
    this.dbSet = dataSet;
  }

  create = async (entity: T): Promise<T> => await entity.save();

  update = async (entity: T): Promise<T> => await entity.update();

  delete = async (entity: T): Promise<void> => await entity.delete();

  find = async (key: any): Promise<T> => await this.dataSet.find(key);

  getAll = async (): Promise<Array<T>> => await this.dataSet.all();
}
