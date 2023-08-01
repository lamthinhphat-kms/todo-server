import { DeleteResult, Repository } from 'typeorm';
import { BaseEntity } from './base.entity';
import { plainToInstance } from 'class-transformer';
import { BaseDto } from './base.dto';
import { IBaseService } from './i.base.service';

export class BaseService<Entity extends BaseEntity>
  implements IBaseService<Entity>
{
  constructor(protected repository: Repository<Entity>) {}

  async save(data: any): Promise<Entity> {
    return await this.repository.save(data);
  }

  async update(id: number, data: any): Promise<Entity> {
    await this.repository.update(id, data);
    return this.findById(id);
  }
  async findAll(): Promise<Entity[]> {
    return await this.repository.find();
  }

  async findById(id: any): Promise<Entity> {
    return await this.repository.findOne({
      where: {
        id: id,
      },
    });
  }

  async deleteById(id: any): Promise<DeleteResult> {
    return await this.repository.delete(id);
  }

  async softDeleteById(id: any): Promise<DeleteResult> {
    return await this.repository.softDelete(id);
  }
}
