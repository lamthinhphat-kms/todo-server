import { DeleteResult } from 'typeorm';

export interface IBaseService<T> {
  save(data: any): Promise<T>;

  update(id: any, data: any): Promise<T>;

  findAll(): Promise<T[]>;

  findById(id: any): Promise<T>;

  deleteById(id: any): Promise<DeleteResult>;

  softDeleteById(id: any): Promise<DeleteResult>;
}
