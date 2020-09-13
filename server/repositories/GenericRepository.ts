import {
  Model,
} from "https://deno.land/x/denodb@v1.0.9/lib/model.ts";

export class GenericRepository<T extends Model> {
  protected dbSet: typeof Model;

  constructor(private classRef: typeof Model) {
    this.dbSet = classRef;
  }

  create = async (entity: T): Promise<T> => await entity.save();

  edit = async (entity: T): Promise<T> => await entity.update();

  delete = async (entity: T): Promise<void> => await entity.delete();

  find = async (key: any): Promise<T> => {
    return await this.classRef.find(key);
  };

  getAll = async (): Promise<Array<T>> => await this.classRef.all();
}
