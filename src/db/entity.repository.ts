import { Document, FilterQuery, Model, UpdateQuery } from 'mongoose';

export abstract class EntityRepository<T extends Document> {
  constructor(protected readonly entityModel: Model<T>) {}

  async create(createEntityData: unknown): Promise<T> {
    const entity = await this.entityModel.create(createEntityData);
    return await this.findOne(
      { _id: entity._id },
      { createdAt: 0, updatedAt: 0 },
    );
  }

  async findOneAndUpdate(
    entityFilterQuery: FilterQuery<T>,
    updateEntityData: UpdateQuery<unknown>,
  ): Promise<T | null> {
    return await this.entityModel.findByIdAndUpdate(
      entityFilterQuery,
      updateEntityData,
      { new: true },
    );
  }

  async findOneAndDelete(entityFilterQuery: FilterQuery<T>): Promise<T | null> {
    return await this.entityModel.findByIdAndDelete(entityFilterQuery, {
      new: true,
    });
  }

  async findOne(
    entityFilterQuery: FilterQuery<T>,
    projections?: Record<string, unknown>,
  ): Promise<T | null> {
    return await this.entityModel
      .findOne(entityFilterQuery, {
        _id: 0,
        __v: 0,
        ...projections,
      })
      .exec();
  }

  async find(entityFilterQuery: FilterQuery<T>): Promise<T[] | null> {
    return this.entityModel.find(entityFilterQuery);
  }
}
